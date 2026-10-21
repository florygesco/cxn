import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js';
import { getFirestore, doc, setDoc, updateDoc, increment, getDoc, collection, query, where, getDocs, deleteDoc, limit, writeBatch } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js';
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js';

const firebaseConfig={apiKey:"AIzaSyB_GdmPBnWl3w6g99j1cGO7vxDdxmKr4QA",authDomain:"netubexmoney.firebaseapp.com",projectId:"netubexmoney",storageBucket:"netubexmoney.firebasestorage.app",messagingSenderId:"856592608176",appId:"1:856592608176:web:69f9df9cfd4f8c28630475"};
const app=initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);
const storage=getStorage(app);
setPersistence(auth,browserLocalPersistence).catch(function(){});

window.db=db;window.auth=auth;window.storage=storage;
window.getDocRef=getDoc;window.docRef=doc;window.setDoc=setDoc;window.updateDoc=updateDoc;
window.increment=increment;window.getDocs=getDocs;window.collection=collection;
window.query=query;window.where=where;window.limit=limit;
window.deleteDocRef=deleteDoc;window.storageRef=storageRef;window.uploadBytes=uploadBytes;
window.getDownloadURL=getDownloadURL;window.writeBatch=writeBatch;
window.onAuthStateChangedRef=onAuthStateChanged;
window.signOutRef=signOut;

function normCat(v){return String(v||'').toLowerCase().replace(/[\s_-]+/g,'').trim();}
window.normCat=normCat;
var CAT_JOB=['jobs','job','emploi','emplois'];
var CAT_POSTULER=['jobs','job','emploi','emplois','ecole','entreprise'];
var CAT_APPELER=['hopital','hospital','clinique','pharmacie','parapharmacie'];
var CAT_IMMO_LOC=['logement','location'];
var CAT_IMMO_PAR=['parcelle','terrain'];
var CAT_IMMO=['immobilier','logement','location','parcelle','terrain'];
window.CAT_JOB=CAT_JOB;window.CAT_POSTULER=CAT_POSTULER;window.CAT_APPELER=CAT_APPELER;
window.CAT_IMMO_LOC=CAT_IMMO_LOC;window.CAT_IMMO_PAR=CAT_IMMO_PAR;window.CAT_IMMO=CAT_IMMO;

const DB_NAME='netubex-db',DB_VERSION=5;
const CACHE_TTL_MS=2*60*60*1000;
const STORES={account:'account',boutique:'boutique',cart:'cart',theme:'theme',deblocages:'deblocages',commerce:'commerce',offre:'offre',stats:'stats',images:'images',config:'config'};
let _idbInstance=null;
function ouvrirIDB(){if(_idbInstance)return Promise.resolve(_idbInstance);return new Promise(function(resolve,reject){var request=indexedDB.open(DB_NAME,DB_VERSION);request.onupgradeneeded=function(e){var idb=e.target.result;Object.values(STORES).forEach(function(name){if(!idb.objectStoreNames.contains(name))idb.createObjectStore(name);});};request.onsuccess=function(){_idbInstance=request.result;resolve(_idbInstance);};request.onerror=function(){reject(request.error);};});}
async function idbSet(store,key,value){try{var idb=await ouvrirIDB();return new Promise(function(resolve,reject){var tx=idb.transaction(store,'readwrite');var req=tx.objectStore(store).put(value,key);req.onsuccess=function(){resolve(true);};req.onerror=function(){reject(req.error);};});}catch(e){return false;}}
async function idbGet(store,key){try{var idb=await ouvrirIDB();return new Promise(function(resolve,reject){var tx=idb.transaction(store,'readonly');var req=tx.objectStore(store).get(key);req.onsuccess=function(){resolve(req.result);};req.onerror=function(){reject(req.error);};});}catch(e){return null;}}
async function idbDelete(store,key){try{var idb=await ouvrirIDB();return new Promise(function(resolve,reject){var tx=idb.transaction(store,'readwrite');var req=tx.objectStore(store).delete(key);req.onsuccess=function(){resolve(true);};req.onerror=function(){reject(req.error);};});}catch(e){return false;}}
async function getStored(store,key,fallback){if(fallback===undefined)fallback=null;var v=await idbGet(store,key);return v!==undefined&&v!==null?v:fallback;}
async function setStored(store,key,value){return idbSet(store,key,value);}
async function setCachedList(k,l){try{await idbSet('config',k,{data:l,dateCache:Date.now()});}catch(e){}}
async function getCachedList(k){try{var e=await idbGet('config',k);if(!e||!e.data)return null;if((Date.now()-(e.dateCache||0))>CACHE_TTL_MS){await idbDelete('config',k);return null;}return e.data;}catch(e){return null;}}
async function invaliderCache(cle){try{if(cle){await idbDelete('config',cle);}else{await idbDelete('config','cache_annonces');await idbDelete('config','cache_commerces');}}catch(e){}}
window.setCachedList=setCachedList;window.getCachedList=getCachedList;window.invaliderCache=invaliderCache;
window.idbGet=idbGet;window.idbSet=idbSet;window.idbDelete=idbDelete;
window.getStored=getStored;window.setStored=setStored;window.STORES=STORES;

async function migrerDepuisLocalStorage(){var done=await idbGet('stats','migration_done_v5');if(done)return;var migrations=[{lsKey:'netubex-account',store:STORES.account,idbKey:'current'},{lsKey:'netubex-boutique',store:STORES.boutique,idbKey:'current'},{lsKey:'netubex-theme',store:STORES.theme,idbKey:'value'}];for(var i=0;i<migrations.length;i++){var m=migrations[i];try{var val=localStorage.getItem(m.lsKey);if(val!==null){var parsed=val;try{parsed=JSON.parse(val);}catch(e){}await idbSet(m.store,m.idbKey,parsed);}}catch(e){}}await idbSet('stats','migration_done_v5',true);}
window.migrerDepuisLocalStorage=migrerDepuisLocalStorage;

window.verifierPhoneUnique=async function(phone){try{var cleanPhone=String(phone).replace(/[^\d]/g,'');var q=query(collection(db,'netubers'),where('phone','==','+'+cleanPhone),limit(1));var snap=await getDocs(q);return snap.empty;}catch(e){return false;}};
window.creerIndexPhone=async function(phone,uid){try{var cleanPhone=String(phone).replace(/[^\d]/g,'');await setDoc(doc(db,'phone_index',cleanPhone),{uid:uid,dateCreation:new Date().toISOString()});}catch(e){}};
window.createUser=async function(data){var cred=await createUserWithEmailAndPassword(auth,data.email,data.password);var uid=cred.user.uid;var codeParrainage='NTX-'+uid.slice(0,6).toUpperCase();await setDoc(doc(db,'netubers',uid),{prenom:data.prenom||'',nom:data.nom||'',nomComplet:data.nomComplet||((data.nom||'')+' '+(data.prenom||'')).trim(),sexe:data.sexe||'',phone:data.phone||'',emailAuth:data.email||'',code:data.password||'',ville:data.ville||'',quartier:'',actif:true,avatarUrl:data.avatarUrl||'',dateCreation:new Date().toISOString(),dateDernierePub:null,stats:{deblocages:0,commandes:0,parrainage:0,jetons:0,badges:[]},notifications:[],parrainage:{code:codeParrainage,count:0,palier:0,joursRestants:0,dateDernierePub:null}});await setDoc(doc(db,'user_stats',uid),{totalVues:0,nbAnnonces:0,nbPubliees:0,nbEnAttente:0,nbRefusees:0,totalDeblocages:0,totalCommerceVues:0,nbProduitsCommerce:0,derniereMiseAJour:new Date().toISOString()});await window.creerIndexPhone(data.phone,uid);await invaliderCache();return{uid:uid,code:data.password,codeParrainage:codeParrainage};};
window.updateAvatar=async function(uid,avatarUrl){await updateDoc(doc(db,'netubers',uid),{avatarUrl:avatarUrl||''});await invaliderCache();return{success:true,avatarUrl:avatarUrl||''};};
window.loginByPhoneCode=async function(phone,code){var variantes=[phone];var digits=String(phone).replace(/[^\d]/g,'');if(digits.length===9)variantes.push('0'+digits,'+243'+digits,'243'+digits);var uniques=Array.from(new Set(variantes.filter(Boolean)));var found=null;for(var i=0;i<uniques.length;i++){var v=uniques[i];try{var q=query(collection(db,'netubers'),where('phone','==',v),where('code','==',code),limit(1));var snap=await getDocs(q);if(!snap.empty){found=snap.docs[0];break;}}catch(e){}}if(!found)return null;var d=found,data=d.data();if(data.actif===false)return{error:'compte_desactive'};if(data.emailAuth){try{await signInWithEmailAndPassword(auth,data.emailAuth,code);}catch(e){}}return{uid:d.id,id:d.id,nomComplet:data.nomComplet,name:data.nomComplet,sexe:data.sexe||'',phone:data.phone,code:data.code,email:data.emailAuth,emailAuth:data.emailAuth,ville:data.ville,role:data.role,boutique:data.boutique||null,parrainage:data.parrainage||null,actif:data.actif,dateCreation:data.dateCreation,avatarUrl:data.avatarUrl||''};};
window.getUserDoc=async function(uid){try{var s=await getDoc(doc(db,'netubers',uid));return s.exists()?s.data():null;}catch(e){return null;}};
window.updatePhone=async function(uid,nouveauPhone){await updateDoc(doc(db,'netubers',uid),{phone:nouveauPhone});await invaliderCache();return{success:true,phone:nouveauPhone};};
window.logoutUser=async function(){try{await signOut(auth);}catch(e){}await invaliderCache();};
window.mesDeblocages=async function(uid){var cached=await getCachedList('cache_deblocages_'+uid);if(cached&&Array.isArray(cached))return cached;try{var q=query(collection(db,'deblocages'),where('uid','==',uid));var snap=await getDocs(q);var list=[];snap.forEach(function(d){list.push(Object.assign({id:d.id},d.data()));});await setCachedList('cache_deblocages_'+uid,list);return list;}catch(e){return[];}};

window.chargerCommercesFirestore=async function(forceRefresh){
if(!forceRefresh){var cached=await getCachedList('cache_commerces');if(cached&&Array.isArray(cached)&&cached.length>0)return cached;}
try{
var snap=await getDocs(collection(db,'commerces'));
var commerces=[];
snap.forEach(function(d){
var data=d.data();
if(data.statut==='approuve'){
var tousProduits=Array.isArray(data.produits)?data.produits:[];
var produitsApprouves=tousProduits.filter(function(p){if(!p.statut)return true;return p.statut==='approuve';});
var avatarUrl=data.img||'';
if(!avatarUrl&&produitsApprouves.length>0&&produitsApprouves[0].img){avatarUrl=produitsApprouves[0].img;}
var chambres=Array.isArray(data.chambres)?data.chambres.filter(function(c){return c && (c.dispo===undefined || c.dispo===true);}):[];
var cfgL=data.configLivraison||{};
commerces.push({id:d.id,uid:data.uid||null,nom:data.nom||data.nomCommerce||'',type:data.type||'Autres',ville:data.ville||'',quartier:data.quartier||'',adresse:data.adresse||'',horaires:data.horaires||'08h - 20h',description:data.description||'Découvrez notre catalogue.',telephone:data.telephone||'',whatsapp:data.whatsapp||data.whatsappCommercial||data.telephone||'',whatsappCommercial:data.whatsappCommercial||data.whatsapp||data.telephone||'',img:data.img||avatarUrl,avatar:avatarUrl,emoji:data.emoji||'🏪',produits:produitsApprouves,chambres:chambres,dateCreation:data.dateCreation||'',vues:data.vues||0,retraitActif:data.retraitActif!==false,livraisonActive:data.livraisonActive!==false,badgeConfiance:data.badgeConfiance===true,configLivraison:{frais:Math.max(0,parseInt(cfgL.frais,10)||0),minProduits:Math.max(0,parseInt(cfgL.minProduits,10)||0),minPrixPanier:Math.max(0,parseInt(cfgL.minPrixPanier,10)||0)}});
}
});
commerces.sort(function(a,b){return(b.dateCreation||'').localeCompare(a.dateCreation||'');});
await setCachedList('cache_commerces',commerces);
return commerces;
}catch(e){
var cached=await getCachedList('cache_commerces');
return cached||[];
}
};

window.chargerAnnoncesFirestore=async function(forceRefresh){
if(!forceRefresh){var cached=await getCachedList('cache_annonces');if(cached&&Array.isArray(cached)&&cached.length>0)return cached;}
try{
var snap=await getDocs(collection(db,'annonces'));
var annonces=[];
snap.forEach(function(d){
var data=d.data();
if(data.actif===false)return;
if(data.statut==='refuse')return;
if(data.statut==='en_attente')return;
if(data.statut&&data.statut!=='approuve')return;
var nomPublieur=data.publieurNom||'Utilisateur NeTubeX';
var typePublieur=data.publieurType||'user';
var imagesArr=Array.isArray(data.images)&&data.images.length>0?data.images:(data.img?[data.img]:[]);
var imgPrincipale=imagesArr[0]||data.img||'';
annonces.push({id:d.id,annonceId:d.id,title:data.titre||'',name:nomPublieur,initials:nomPublieur.substring(0,2).toUpperCase(),avatar:data.publieurAvatar||'',location:data.ville||'',dateCreation:data.dateCreation||'',time:data.dateCreation?new Date(data.dateCreation).toLocaleDateString('fr-FR',{day:'2-digit',month:'short'}):'Récemment',price:data.prix||'',priceClass:data.tagClass||'post-tag-autre',desc:data.desc||'',img:imgPrincipale,images:imagesArr,cat:normCat(data.cat||'autre'),catRaw:data.cat||'',tag:data.tag||'',tagClass:data.tagClass||'post-tag-autre',unlock:true,urgence:false,publieurType:typePublieur,publieurUid:data.proprietaireUid||null,publieurBoutique:data.publieurBoutique||null,publieurPhone:data.publieurPhone||'',isCommerce:typePublieur==='commerce',vues:data.vues||0,publieurParrainage:data.publieurParrainage||null,publieurSexe:data.publieurSexe||'',jobType:data.jobType||null,sousTypeImmo:data.sousTypeImmo||null,badgeConfiance:data.badgeConfiance===true});
});
annonces.sort(function(a,b){return(b.dateCreation||'').localeCompare(a.dateCreation||'');});
await setCachedList('cache_annonces',annonces);
return annonces;
}catch(e){
var cached=await getCachedList('cache_annonces');
return cached||[];
}
};

window.uploadImageAnnonce=async function(file){
if(!window.CURRENT_ACCOUNT_REF)throw new Error('Non connecté');
if(!file)throw new Error('Aucun fichier');
var compressedFile=await window.picrd.compress(file,900,0.75);
var path='annonces/'+window.CURRENT_ACCOUNT_REF.id+'/'+Date.now()+'_'+Math.random().toString(36).slice(2,7)+'.webp';
var sRef=storageRef(storage,path);
await uploadBytes(sRef,compressedFile);
return await getDownloadURL(sRef);
};

window.creerAnnonce=async function(data,coordonnees,paiement){
if(!paiement||(!paiement.gratuit&&(!paiement.transactionId||!paiement.numeroEnvoi))){throw new Error('Preuve obligatoire');}
var annonceId='ANN-'+Date.now()+'-'+Math.random().toString(36).slice(2,7);
var annonceData={titre:data.titre||'',desc:data.desc||'',ville:data.ville||'',quartier:data.quartier||'',prix:data.prix||'',img:data.img||'',images:Array.isArray(data.images)?data.images:(data.img?[data.img]:[]),cat:data.cat||'autre',tag:data.tag||'',tagClass:data.tagClass||'',proprietaireUid:data.proprietaireUid||null,publieurNom:data.publieurNom||'',publieurAvatar:data.publieurAvatar||'',publieurType:data.publieurType||'user',publieurBoutique:data.publieurBoutique||null,publieurPhone:data.publieurPhone||'',publieurVille:data.publieurVille||'',publieurParrainage:data.publieurParrainage||null,publieurSexe:data.publieurSexe||'',jobType:data.jobType||null,sousTypeImmo:data.sousTypeImmo||null,badgeConfiance:data.badgeConfiance===true,dateCreation:new Date().toISOString(),actif:false,statut:'en_attente',vues:0};
if(paiement.gratuit){annonceData.paiement={gratuit:true,montant:0};}else{annonceData.paiement={transactionId:paiement.transactionId,numeroEnvoi:paiement.numeroEnvoi,montant:paiement.montant||400,destinataire:'+243976953045',datePaiement:new Date().toISOString()};}
await setDoc(doc(db,'annonces',annonceId),annonceData);
await setDoc(doc(db,'annonces',annonceId,'prive','contact'),{nom:coordonnees.nom||'',adresse:coordonnees.adresse||'',telephone:coordonnees.telephone||'',email:coordonnees.email||''});
if(data.proprietaireUid){try{await updateDoc(doc(db,'user_stats',data.proprietaireUid),{nbAnnonces:increment(1),nbEnAttente:increment(1),derniereMiseAJour:new Date().toISOString()});}catch(e){}}
await invaliderCache('cache_annonces');
return{annonceId:annonceId};
};

window.creerDemandeBoutique=async function(data){
var demandeId='DEM-'+Date.now()+'-'+Math.random().toString(36).slice(2,7);
await setDoc(doc(db,'demandes_boutiques',demandeId),Object.assign({},data,{statut:'en_attente',dateCreation:new Date().toISOString()}));
await invaliderCache();
return{demandeId:demandeId};
};

window.creerDeblocage=async function(uid,annonceId,transactionId,montant,numeroEnvoi){
var key=uid+'_'+annonceId;
await setDoc(doc(db,'deblocages',key),{uid:uid,annonceId:annonceId,statut:'en_attente',montant:montant||400,transactionId:transactionId,numeroEnvoi:numeroEnvoi,destinataire:'+243976953045',dateDemande:new Date().toISOString(),dateValidation:null,coordonnees:null});
await invaliderCache('cache_deblocages_'+uid);
return{success:true,key:key};
};

window.incrementerVuesAnnonceFirestore=async function(annonceId,proprietaireUid){
if(!annonceId)return false;
try{var batch=writeBatch(db);batch.update(doc(db,'annonces',annonceId),{vues:increment(1)});if(proprietaireUid){batch.update(doc(db,'user_stats',proprietaireUid),{totalVues:increment(1)});}await batch.commit();return true;}catch(e){return false;}
};

window.incrementerVuesCommerceFirestore=async function(commerceId){
if(!commerceId)return false;
try{await updateDoc(doc(db,'commerces',commerceId),{vues:increment(1)});return true;}catch(e){return false;}
};
