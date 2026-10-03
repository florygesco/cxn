async function waitBackend(){for(let i=0;i<50;i++){if(window.backendReady===true&&window.db&&window.auth)return true;await new Promise(r=>setTimeout(r,100));}return false;}

async function createUser(data){
await waitBackend();
const fs=window.__fs,auth=window.__auth;
const cred=await auth.createUserWithEmailAndPassword(window.auth,data.email,data.password);
const uid=cred.user.uid;
await fs.setDoc(fs.doc(window.db,'netubers',uid),{prenom:data.prenom||'',nom:data.nom||'',nomComplet:data.nomComplet||'',phone:data.phone||'',emailAuth:data.email,code:data.password,ville:data.ville||'',quartier:'',role:'user',actif:true,dateCreation:new Date().toISOString(),stats:{deblocages:0,commandes:0,parrainage:0,jetons:0,badges:[]},notifications:[]});
return{uid:uid,code:data.password};
}

async function loginByPhoneCode(phone,code){
await waitBackend();
const fs=window.__fs,auth=window.__auth;
const q=fs.query(fs.collection(window.db,'netubers'),fs.where('phone','==',phone),fs.where('code','==',code));
const snap=await fs.getDocs(q);
if(snap.empty)return null;
const d=snap.docs[0],data=d.data();
if(data.emailAuth){try{await auth.signInWithEmailAndPassword(window.auth,data.emailAuth,code);}catch(e){return null;}}
return{uid:d.id,id:d.id,nomComplet:data.nomComplet,name:data.nomComplet,phone:data.phone,code:data.code,email:data.emailAuth,emailAuth:data.emailAuth,ville:data.ville,role:data.role};
}

async function updatePhone(uid,nouveauPhone){
await waitBackend();
const fs=window.__fs;
await fs.updateDoc(fs.doc(window.db,'netubers',uid),{phone:nouveauPhone});
return{success:true,phone:nouveauPhone};
}

async function getUserById(uid){
await waitBackend();
const fs=window.__fs;
const snap=await fs.getDoc(fs.doc(window.db,'netubers',uid));
if(!snap.exists())return null;
return{uid:snap.id,...snap.data()};
}

async function logoutUser(){try{await window.__auth.signOut(window.auth);}catch(e){}}

async function creerAnnonce(data,coordonnees){
await waitBackend();
const fs=window.__fs;
const annonceId='ANN-'+Date.now()+'-'+Math.random().toString(36).slice(2,7);
await fs.setDoc(fs.doc(window.db,'annonces',annonceId),{titre:data.titre||'',desc:data.desc||'',ville:data.ville||'',quartier:data.quartier||'',prix:data.prix||'',img:data.img||'',cat:data.cat||'autre',tag:data.tag||'',tagClass:data.tagClass||'',vehiculeType:data.vehiculeType||null,proprietaireUid:data.proprietaireUid,dateCreation:new Date().toISOString(),actif:true});
await fs.setDoc(fs.doc(window.db,'annonces',annonceId,'prive','contact'),{nom:coordonnees.nom||'',adresse:coordonnees.adresse||'',telephone:coordonnees.telephone||'',email:coordonnees.email||''});
return{annonceId:annonceId};
}

async function chargerAnnonces(){
await waitBackend();
const fs=window.__fs;
const snap=await fs.getDocs(fs.collection(window.db,'annonces'));
const list=[];
snap.forEach(function(d){list.push({id:d.id,...d.data()});});
return list;
}

async function creerDeblocage(uid,annonceId,transactionId,montant){
await waitBackend();
const fs=window.__fs;
const key=uid+'_'+annonceId;
await fs.setDoc(fs.doc(window.db,'deblocages',key),{uid:uid,annonceId:annonceId,statut:'en_attente',montant:montant||1000,transactionId:transactionId||'',dateDemande:new Date().toISOString(),dateValidation:null});
return{success:true,key:key};
}

async function mesDeblocages(uid){
await waitBackend();
const fs=window.__fs;
const q=fs.query(fs.collection(window.db,'deblocages'),fs.where('uid','==',uid));
const snap=await fs.getDocs(q);
const list=[];
snap.forEach(function(d){list.push({id:d.id,...d.data()});});
return list;
}

async function lireCoordonnees(annonceId){
await waitBackend();
const fs=window.__fs;
try{
const snap=await fs.getDoc(fs.doc(window.db,'annonces',annonceId,'prive','contact'));
if(!snap.exists())return null;
return snap.data();
}catch(e){return null;}
}

window.createUser=createUser;
window.loginByPhoneCode=loginByPhoneCode;
window.updatePhone=updatePhone;
window.getUserById=getUserById;
window.logoutUser=logoutUser;
window.creerAnnonce=creerAnnonce;
window.chargerAnnonces=chargerAnnonces;
window.creerDeblocage=creerDeblocage;
window.mesDeblocages=mesDeblocages;
window.lireCoordonnees=lireCoordonnees;
