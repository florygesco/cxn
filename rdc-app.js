```javascript
window.CURRENT_ACCOUNT = window.CURRENT_ACCOUNT || null;
window.CURRENT_ACCOUNT_REF = window.CURRENT_ACCOUNT_REF || null;
function setCurrentAccount(acc){window.CURRENT_ACCOUNT=acc;window.CURRENT_ACCOUNT_REF=acc;}
window.setCurrentAccount=setCurrentAccount;
var _navFromPopstate=false;
var cart=[];
var CURRENT_COMMERCE=null;
var CURRENT_OFFRE=null;
var CURRENT_CATEGORY=null;
var CURRENT_COMMERCANT=null;
var COMMERCES_DATA=[];
var ANNONCES_DATA=[];
var DEBLOCAGES_MEMORY=[];
var DEBLOCAGES_LAST_FETCH=0;
var DEBLOCAGES_DIRTY=true;
var DEBLOCAGES_FETCH_COOLDOWN=30000;
var DEBLOCAGES_POLL_TIMER=null;
var DEBLOCAGE_DUREE_MS=12*60*60*1000;
var _debloques_timer=null;
var currentTab='index';
var _pollingTimer=null;
var _appEstActive=!document.hidden;
var CATALOGUE_PRODUITS=[];
var CATALOGUE_TRI='default';
var _popupProductName=null;
var _popupProductPrice=0;
var ORDER_TYPE='retrait';
var CURRENT_ORDER_CODE=null;
var CART_PAGE=1;
var SUPPRESSIONS_JOUR=0;
var SUPPRESSIONS_DATE='';
var SUPPRESSIONS_MAX=5;
var _produitImageData=null;
var _editProduitIndex=-1;
var _editProduitNom='';
var _editProduitCommerceId=null;
var _nextFeedOrder=null;
var _feedObserver=null;
var feedPage=0;
var FEED_PER_PAGE=3;
var _feedLoading=false;
var _feedRenderedCount=0;
var _feedDebounceTimer=null;
var _feedLoopCount=0;
var _feedSeenIds=new Set();
var _feedCycleItems=[];
var _feedCycleIndex=0;
var MAX_POSTS_DOM=60;
var detailFsActive=false;
var searchEnCours=false;
var lastScrollY=0;
var headerTimer=null;
var SCROLL_DELAY=1200;
var publishCat=null;
var publishImages=[];
var jobContract=null;
var SOUS_TYPE_IMMO=null;
var MAX_PUBLISH_IMAGES=3;
var MAX_IMAGE_SIZE_MB=5;
var _sessionEnCours=true;
var _dernierQuery={q:'',ville:''};
var _derniersResultats=[];
var _searchTabActive='all';
var _resaCommerceId=null;
var _resaChambreSelectionnee=null;
var _accAvatarUrl='';
var _changeAvatarUrl='';
var CATALOGUE_FULL=[];
var CATALOGUE_COMMERCE_ID=null;
function demarrerBarreProgression(){var c=document.getElementById('feedProgressContainer');var b=document.getElementById('feedProgressBar');if(!c||!b)return;c.style.display='block';b.style.width='30%';setTimeout(function(){b.style.width='70%';},200);}
function terminerBarreProgression(){var c=document.getElementById('feedProgressContainer');var b=document.getElementById('feedProgressBar');if(!c||!b)return;b.style.width='100%';setTimeout(function(){c.style.display='none';b.style.width='0%';},300);}
var toastTimer=null;
function showToast(msg){var t=document.getElementById('toast');var txt=document.getElementById('toast-text');if(!t||!txt)return;if(msg&&msg.length>30){msg=msg.substring(0,27)+'...';}txt.textContent=msg;t.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(function(){t.classList.remove('show');},2200);}
function esc(s){if(!s)return'';return String(s).replace(/[&<>"']/g,function(m){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m];});}
function tempsRelatif(ds){if(!ds)return'Récemment';try{var d=new Date(ds);var diff=Date.now()-d.getTime();if(diff<0)return'À l\'instant';var m=Math.floor(diff/60000),h=Math.floor(m/60),j=Math.floor(h/24);if(m<1)return'À l\'instant';if(m<60)return'Il y a '+m+' min';if(h<24)return'Il y a '+h+'h';if(j<7)return'Il y a '+j+'j';return d.toLocaleDateString('fr-FR',{day:'2-digit',month:'short'});}catch(e){return'Récemment';}}
function getTodayKey(){var d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function getUserId(){return window.CURRENT_ACCOUNT?window.CURRENT_ACCOUNT.id:'guest';}
function nettoyerTextePourSaisie(t){if(!t)return'';return String(t).replace(/\r\n/g,'\n').replace(/\r/g,'\n').replace(/[\u200B\u200C\u200D\uFEFF]/g,'').replace(/\u00A0/g,' ').replace(/\u202F/g,' ').replace(/\u2009/g,' ').replace(/[\u2013\u2014]/g,'-').replace(/[\u201C\u201D]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/\t/g,' ').replace(/ {2,}/g,' ').split('\n').map(function(l){return l.trim();}).join('\n').replace(/\n{3,}/g,'\n\n').trim();}
function nettoyerTexte(t){if(!t)return'';return String(t).replace(/\r\n/g,'\n').replace(/\r/g,'\n').replace(/[\u200B\u200C\u200D\uFEFF]/g,'').replace(/\u00A0/g,' ').replace(/\u202F/g,' ').replace(/\u2009/g,' ').replace(/[\u2013\u2014]/g,'-').replace(/[\u201C\u201D]/g,'"').replace(/[\u2018\u2019]/g,"'").replace(/\t/g,' ').replace(/ {2,}/g,' ').replace(/\n{3,}/g,'\n\n').trim();}
function attacherNettoyageDescription(){var ta=document.getElementById('publishDescription');if(ta&&ta.dataset.cleanAttached!=='1'){ta.dataset.cleanAttached='1';ta.addEventListener('paste',function(){setTimeout(function(){ta.value=nettoyerTextePourSaisie(ta.value);ta.selectionStart=ta.selectionEnd=ta.value.length;},0);});ta.addEventListener('blur',function(){ta.value=nettoyerTextePourSaisie(ta.value);});}var ta2=document.getElementById('inscDescription');if(ta2&&ta2.dataset.cleanAttached!=='1'){ta2.dataset.cleanAttached='1';ta2.addEventListener('paste',function(){setTimeout(function(){ta2.value=nettoyerTextePourSaisie(ta2.value);},0);});ta2.addEventListener('blur',function(){ta2.value=nettoyerTextePourSaisie(ta2.value);});}}
function nettoyerPhone243(v){var d=String(v||'').replace(/[^\d]/g,'');if(d.length>9&&d.startsWith('243')){d=d.substring(3);}while(d.length>0&&d.charAt(0)==='0'){d=d.substring(1);}return d.slice(0,9);}
function formatPhone243(local9){var d=nettoyerPhone243(local9);return d?'+243'+d:'';}
function isValidePhone243(local9){return nettoyerPhone243(local9).length===9;}
function attacherNettoyagePhone(inputId){var inp=document.getElementById(inputId);if(!inp)return;if(inp.dataset.phoneCleanAttached==='1')return;inp.dataset.phoneCleanAttached='1';function nettoyerLive(){var brut=inp.value||'';var chiffresBruts=brut.replace(/[^\d]/g,'');var nettoye=nettoyerPhone243(brut);if(nettoye!==chiffresBruts){inp.value=nettoye;}}inp.addEventListener('input',nettoyerLive);inp.addEventListener('blur',nettoyerLive);inp.addEventListener('paste',function(){setTimeout(nettoyerLive,0);});}
function attacherTousPhones(){['accPhone','accLoginPhone','newPhoneInput','confirmPhoneInput','inscTelephone','inscWhatsappCommercial','client-tel','unlockNumEnvoi','publishNumEnvoi','resaPhone'].forEach(attacherNettoyagePhone);}
function normaliser(t){if(!t)return'';var s=String(t).toLowerCase();try{s=s.normalize('NFD').replace(/[\u0300-\u036f]/g,'');}catch(e){}s=s.replace(/[^\w\s]/g,' ').replace(/\s+/g,' ').trim();return s;}
function normaliserStem(t){var s=normaliser(t);return s.split(' ').map(function(m){if(m.length<=4)return m;if(m.endsWith('ies'))return m.slice(0,-3)+'y';if(m.endsWith('es')&&m.length>5)return m.slice(0,-2);if(m.endsWith('s')&&m.length>4)return m.slice(0,-1);return m;}).join(' ');}
function extraireMotsCles(texte){if(!texte)return[];var stopwords=['le','la','les','un','une','des','de','du','et','ou','a','en','dans','pour','par','sur','avec','sans','au','aux','ce','cet','cette','ces','mon','ton','son','ma','ta','sa','mes','tes','ses','notre','votre','leur','est','sont','etre','avoir','fait','faire','plus','moins','tres','tout','tous','toute','toutes','je','tu','il','elle','nous','vous','ils','elles','que','qui','quoi','dont','si','ne','pas','y','d','l','s','t','n','m','c','j','qu','ai','as','avons','avez','ont','veux','veut','voulons','voulez','veulent','cherche','cherches','cherchons','cherchez','cherchent','besoin','aimerais','aimerait','peux','peut','pouvons','pouvez','peuvent','svp','stp','merci'];var mots=normaliser(texte).split(/\s+/).filter(function(m){return m.length>=2&&stopwords.indexOf(m)===-1;});var stems=mots.map(function(m){if(m.length<=4)return m;if(m.endsWith('ies'))return m.slice(0,-3)+'y';if(m.endsWith('es')&&m.length>5)return m.slice(0,-2);if(m.endsWith('s')&&m.length>4)return m.slice(0,-1);return m;});return Array.from(new Set(stems));}
function calculerScore(texteStem,motsCles){var total=0;var matches=0;if(!motsCles||motsCles.length===0)return{total:0,matches:0,pondere:0};var motsTexte=texteStem.split(/\s+/);motsCles.forEach(function(mot){var trouve=false;var scoreMot=0;for(var i=0;i<motsTexte.length;i++){var mt=motsTexte[i];if(mt===mot){trouve=true;scoreMot+=30;break;}if(mt.indexOf(mot)===0&&mot.length>=3){trouve=true;scoreMot+=20;break;}if(mt.indexOf(mot)!==-1&&mot.length>=4){trouve=true;scoreMot+=10;break;}}if(!trouve&&mot.length>=5){for(var j=0;j<motsTexte.length;j++){if(motsTexte[j].indexOf(mot.substring(0,Math.max(4,mot.length-2)))!==-1){trouve=true;scoreMot+=5;break;}}}if(trouve){matches++;total+=scoreMot;}});var pondere=total;if(matches===motsCles.length&&motsCles.length>1)pondere+=25;else if(matches>1)pondere+=(matches-1)*8;return{total:total,matches:matches,pondere:pondere};}
function rechercherTout(query,ville){var motsCles=extraireMotsCles(query);var villeNorm=normaliser(ville);var resultats=[];var dejaVus={};function ajouter(r){var key=r.source+'_'+((r.data&&r.data.id)||(r.data&&r.data.commerceId)||(r.data&&r.data.nom)||Math.random());if(dejaVus[key])return;dejaVus[key]=true;resultats.push(r);}if(motsCles.length===0&&!villeNorm)return[];ANNONCES_DATA.forEach(function(a){if(villeNorm){var loc=normaliser((a.location||'')+' '+(a.quartier||''));if(loc.indexOf(villeNorm)===-1)return;}var texte=(a.title||'')+' '+(a.desc||'')+' '+(a.location||'')+' '+(a.name||'')+' '+(a.tag||'')+' '+(a.price||'')+' '+(a.quartier||'')+' '+(a.cat||'')+' '+(a.tagClass||'')+' '+(a.jobType||'')+' '+(a.sousTypeImmo||'');var score=calculerScore(normaliserStem(texte),motsCles);if(score.total===0&&motsCles.length>0)return;var cat='annonce';if(CAT_JOB.indexOf(normCat(a.cat))!==-1)cat='job';else if(CAT_IMMO.indexOf(normCat(a.cat))!==-1)cat='immobilier';ajouter({type:cat,source:'annonce',data:a,score:score.pondere+5});});COMMERCES_DATA.forEach(function(c){var locC=normaliser((c.ville||'')+' '+(c.quartier||'')+' '+(c.adresse||''));if(villeNorm&&locC.indexOf(villeNorm)===-1)return;var texteC=(c.nom||'')+' '+(c.type||'')+' '+(c.ville||'')+' '+(c.quartier||'')+' '+(c.description||'')+' '+(c.adresse||'')+' '+(c.horaires||'')+' '+(c.telephone||'')+' '+(c.emoji||'');var scoreC=calculerScore(normaliserStem(texteC),motsCles);if(scoreC.total>0)ajouter({type:'commerce',source:'commerce',data:c,score:scoreC.pondere+3});(c.produits||[]).forEach(function(p){var texteP=(p.nom||'')+' '+(p.categorie||'')+' '+(p.prixLabel||'')+' '+(c.nom||'')+' '+(c.type||'')+' '+(c.ville||'')+' '+(c.quartier||'')+' '+(c.adresse||'');var scoreP=calculerScore(normaliserStem(texteP),motsCles);if(scoreP.total===0)return;ajouter({type:'produit',source:'produit',data:{nom:p.nom||'',prix:p.prix||0,prixLabel:p.prixLabel||'',img:p.img||'',categorie:p.categorie||'',commerceId:c.id,commerceNom:c.nom||'',commerceType:c.type||'',ville:c.ville||'',quartier:c.quartier||'',adresse:c.adresse||''},score:scoreP.pondere+5});});});resultats.sort(function(a,b){return b.score-a.score;});return resultats;}
function rechercherAvecDernierQuery(){if(!_dernierQuery.q&&!_dernierQuery.ville)return;executeSearch();}
function closeSearchModal(){var m=document.getElementById('searchModal');var o=document.getElementById('searchModalOverlay');if(m)m.style.transform='translateY(-100%)';if(o)o.style.opacity='0';setTimeout(function(){if(o)o.style.pointerEvents='none';},300);}
function openSearchModal(){var m=document.getElementById('searchModal');var o=document.getElementById('searchModalOverlay');if(o){o.style.pointerEvents='auto';o.style.opacity='1';}if(m)m.style.transform='translateY(0)';}
function switchSearchTab(tab,el){_searchTabActive=tab;document.querySelectorAll('.search-tab').forEach(function(b){b.classList.remove('active');});if(el)el.classList.add('active');renderSearchResults(_derniersResultats,_dernierQuery);}
function executeSearch(){requireLogin('rechercher',function(){if(searchEnCours)return;var q=(document.getElementById('searchQuery')||{}).value?document.getElementById('searchQuery').value.trim():'';var ville=(document.getElementById('searchCity')||{}).value?document.getElementById('searchCity').value.trim():'';if(!q&&!ville){showToast('Saisissez un critère');return;}_dernierQuery={q:q,ville:ville};_searchTabActive='all';document.querySelectorAll('.search-tab').forEach(function(b){b.classList.remove('active');});var firstTab=document.querySelector('.search-tab[data-tab="all"]');if(firstTab)firstTab.classList.add('active');searchEnCours=true;var body=document.getElementById('searchModalBody');var title=document.getElementById('searchModalTitle');var sub=document.getElementById('searchModalSub');if(title)title.textContent='Recherche en cours…';if(sub)sub.textContent=(q?'"'+q+'"':'')+(ville?' à '+ville:'');if(body)body.innerHTML='<div class="search-loading-inline"><div style="width:44px;height:44px;border:4px solid rgba(0,85,255,.2);border-top-color:#0055ff;border-radius:50%;margin:0 auto 16px;animation:spinSearch .8s linear infinite"></div><div style="font-size:14px;font-weight:800;color:var(--text-secondary)">Recherche en cours…</div></div>';openSearchModal();setTimeout(function(){var resultats=rechercherTout(q,ville);_derniersResultats=resultats;renderSearchResults(resultats,_dernierQuery);searchEnCours=false;},600);});}
function renderSearchResults(resultats,query){var body=document.getElementById('searchModalBody');var title=document.getElementById('searchModalTitle');var sub=document.getElementById('searchModalSub');if(!body)return;var counts={all:resultats.length,annonce:0,job:0,immobilier:0,produit:0};resultats.forEach(function(r){if(r.source==='annonce')counts.annonce++;if(r.source==='job'||(r.source==='annonce'&&CAT_JOB.indexOf(normCat(r.data.cat))!==-1))counts.job++;if(r.source==='immobilier'||(r.source==='annonce'&&CAT_IMMO.indexOf(normCat(r.data.cat))!==-1))counts.immobilier++;if(r.source==='produit'||r.source==='commerce')counts.produit++;});document.querySelectorAll('.search-tab').forEach(function(b){var tab=b.getAttribute('data-tab');var base={all:'Tout',annonce:'Annonces',job:'Jobs',immobilier:'Immobilier',produit:'Produits'}[tab]||tab;var n=counts[tab]||0;b.textContent=base+(n>0?' ('+n+')':'');});var q=query.q,v=query.ville;if(title)title.textContent=resultats.length>0?(resultats.length+' résultat'+(resultats.length>1?'s':'')):'Aucun résultat';if(sub)sub.textContent=(q?'"'+q+'"':'')+(v?' à '+v:'');var filtres;if(_searchTabActive==='all')filtres=resultats;else if(_searchTabActive==='annonce')filtres=resultats.filter(function(r){return r.source==='annonce';});else if(_searchTabActive==='job')filtres=resultats.filter(function(r){return r.source==='job'||(r.source==='annonce'&&CAT_JOB.indexOf(normCat(r.data.cat))!==-1);});else if(_searchTabActive==='immobilier')filtres=resultats.filter(function(r){return r.source==='immobilier'||(r.source==='annonce'&&CAT_IMMO.indexOf(normCat(r.data.cat))!==-1);});else if(_searchTabActive==='produit')filtres=resultats.filter(function(r){return r.source==='produit'||r.source==='commerce';});else filtres=resultats;if(filtres.length===0){body.innerHTML='<div class="search-empty"><div class="search-empty-icon">🔍</div><div class="search-empty-title">Aucun résultat</div><div class="search-empty-desc">Essayez avec d\'autres mots-clés<br>ou modifiez la ville.</div></div>';return;}var html='';filtres.forEach(function(r,idx){if(r.source==='produit'){var p=r.data;var thumb=p.img?'<div class="search-result-thumb"><img src="'+esc(p.img)+'" alt="" loading="lazy" onerror="this.parentElement.innerHTML=\'📦\'"></div>':'<div class="search-result-thumb">📦</div>';html+='<div class="search-result-card" onclick="closeSearchModal();openCatalogue(\''+esc(r.data.commerceId)+'\')">'+thumb+'<div class="search-result-info"><div class="search-result-title">'+esc(p.nom)+'</div><div class="search-result-desc">'+esc(p.categorie||p.commerceType||'Produit')+'</div><div class="search-result-meta"><span class="search-result-price">'+Number(p.prix||0).toLocaleString('fr-FR')+' FC '+esc(p.prixLabel||'')+'</span><span><i class="fa-solid fa-store"></i> '+esc(p.commerceNom)+'</span>'+(p.ville?'<span><i class="fa-solid fa-location-dot"></i> '+esc(p.ville)+(p.quartier?' · '+esc(p.quartier):'')+'</span>':'')+'</div></div></div>';}else if(r.source==='commerce'){var c=r.data;var thumb=c.img?'<div class="search-result-thumb"><img src="'+esc(c.img)+'" alt="" loading="lazy" onerror="this.parentElement.innerHTML=\'🏪\'"></div>':'<div class="search-result-thumb">🏪</div>';html+='<div class="search-result-card" onclick="closeSearchModal();openCatalogue(\''+esc(c.id)+'\')">'+thumb+'<div class="search-result-info"><div class="search-result-title">'+esc(c.nom)+'</div><div class="search-result-desc">'+esc(c.type||'Commerce')+(c.description?' · '+esc(c.description):'')+'</div><div class="search-result-meta">'+(c.ville?'<span><i class="fa-solid fa-location-dot"></i> '+esc(c.ville)+(c.quartier?' · '+esc(c.quartier):'')+'</span>':'')+(c.horaires?'<span><i class="fa-solid fa-clock"></i> '+esc(c.horaires)+'</span>':'')+'</div></div></div>';}else{var a=r.data;var badge='';var nc=normCat(a.cat);if(CAT_JOB.indexOf(nc)!==-1)badge='<span class="feed-badge post-tag-job" style="font-size:10px">💼 Job</span>';else if(CAT_IMMO_LOC.indexOf(nc)!==-1)badge='<span class="feed-badge post-tag-property" style="font-size:10px">🏠 Logement</span>';else if(CAT_IMMO_PAR.indexOf(nc)!==-1)badge='<span class="feed-badge post-tag-land" style="font-size:10px">📐 Parcelle</span>';else badge='<span class="feed-badge post-tag-autre" style="font-size:10px">🏷️ '+esc(a.tag||'Annonce')+'</span>';var thumb=a.img?'<div class="search-result-thumb"><img src="'+esc(a.img)+'" alt="" loading="lazy" onerror="this.parentElement.innerHTML=\'📄\'"></div>':'<div class="search-result-thumb">📄</div>';html+='<div class="search-result-card" onclick="closeSearchModal();openDetailBySearchIdx('+idx+',\''+_searchTabActive+'\')">'+thumb+'<div class="search-result-info"><div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap"><span class="search-result-title" style="flex:1;min-width:0">'+esc(a.title)+'</span>'+badge+'</div><div class="search-result-desc">'+esc(a.desc||'')+'</div><div class="search-result-meta">'+(a.price?'<span class="search-result-price">'+esc(a.price)+'</span>':'')+(a.location?'<span><i class="fa-solid fa-location-dot"></i> '+esc(a.location)+'</span>':'')+'</div></div></div>';}});body.innerHTML=html;}
function openDetailBySearchIdx(idx,tab){var filtres;if(tab==='all')filtres=_derniersResultats;else if(tab==='annonce')filtres=_derniersResultats.filter(function(r){return r.source==='annonce';});else if(tab==='job')filtres=_derniersResultats.filter(function(r){return r.source==='job'||(r.source==='annonce'&&CAT_JOB.indexOf(normCat(r.data.cat))!==-1);});else if(tab==='immobilier')filtres=_derniersResultats.filter(function(r){return r.source==='immobilier'||(r.source==='annonce'&&CAT_IMMO.indexOf(normCat(r.data.cat))!==-1);});else if(tab==='produit')filtres=_derniersResultats.filter(function(r){return r.source==='produit'||r.source==='commerce';});else filtres=_derniersResultats;var r=filtres[idx];if(!r)return;if(r.source==='produit'){openCatalogue(r.data.commerceId);}else if(r.source==='commerce'){openCatalogue(r.data.id);}else{openDetail(r.data);}}
function getVerifiedBadgeHTML(o){if(!o)return'';var e=o.isCommerce||o.commerce||o.publieurType==='commerce'||o.publieurBoutique;if(e){return' <span class="verified-badge"><i class="fa-solid fa-check"></i></span>';}return'';}
function getJobBadgeHTML(o){if(!o)return'';if(CAT_JOB.indexOf(normCat(o.cat))===-1)return'';var t=o.jobType||'cdi';var labels={cdi:{t:'CDI',c:'post-tag-job'},cdd:{t:'CDD',c:'post-tag-job'}};var l=labels[t]||labels.cdi;return' <span class="feed-badge '+l.c+'">'+l.t+'</span>';}
function getAvatarHTML(o,size){size=size||52;var src=o.avatar||o.img;if(src){return'<div style="width:'+size+'px;height:'+size+'px;position:relative;flex-shrink:0;"><img src="'+src+'" alt="" class="fb-post-avatar-img" style="width:'+size+'px;height:'+size+'px" loading="lazy" decoding="async" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\';"><div class="fb-post-avatar" style="width:'+size+'px;height:'+size+'px;font-size:'+(size*0.32)+'px;display:none;position:absolute;top:0;left:0;">'+(o.initials||'??')+'</div></div>';}return'<div class="fb-post-avatar" style="width:'+size+'px;height:'+size+'px;font-size:'+(size*0.32)+'px">'+(o.initials||'??')+'</div>';}
function trouverDeblocagePourAnnonce(aId){if(!aId||!DEBLOCAGES_MEMORY||DEBLOCAGES_MEMORY.length===0)return null;return DEBLOCAGES_MEMORY.find(function(d){if(d.annonceId!==aId)return false;if(d.statut!=='debloque')return false;if(!d.dateValidation||!d.coordonnees||!d.coordonnees.telephone)return false;var v=new Date(d.dateValidation).getTime();if(isNaN(v))return false;if((Date.now()-v)>=DEBLOCAGE_DUREE_MS)return false;return true;})||null;}
function estDeblocageExpire(i){if(!i||!i.dateValidation)return false;var v=new Date(i.dateValidation).getTime();if(isNaN(v))return false;return(Date.now()-v)>=DEBLOCAGE_DUREE_MS;}
function tempsRestantDeblocage12h(i){if(!i||!i.dateValidation)return 0;var v=new Date(i.dateValidation).getTime();if(isNaN(v))return 0;var e=v+DEBLOCAGE_DUREE_MS;var d=e-Date.now();return d>0?d:0;}
function formatCompteARebours(ms){if(ms<=0)return'00h 00m';var t=Math.floor(ms/1000),h=Math.floor(t/3600),m=Math.floor((t%3600)/60);return String(h).padStart(2,'0')+'h '+String(m).padStart(2,'0')+'m';}
function isLoggedIn(){return window.CURRENT_ACCOUNT!==null&&window.CURRENT_ACCOUNT.id!==undefined;}
function copyText(t){if(!t)return;if(navigator.clipboard&&navigator.clipboard.writeText&&window.isSecureContext){navigator.clipboard.writeText(t).then(function(){showToast('✅ Copié');}).catch(function(){fallbackCopy(t);});}else{fallbackCopy(t);}}
function fallbackCopy(t){try{var ta=document.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.left='-9999px';document.body.appendChild(ta);ta.select();document.execCommand('copy');document.body.removeChild(ta);showToast('✅ Copié');}catch(e){showToast('Erreur');}}

function requireLogin(a,cb){
  if(_sessionEnCours){
    var essais=0;
    var attente=setInterval(function(){
      essais++;
      if(!_sessionEnCours||essais>30){
        clearInterval(attente);
        if(isLoggedIn()){if(cb)cb();}
        else{showAccountModal('Connectez-vous pour continuer.',cb);}
      }
    },100);
    return false;
  }
  if(isLoggedIn()){if(cb)cb();return true;}
  var boutons = document.querySelectorAll('.fb-action-primary, .detail-primary-btn');
  boutons.forEach(function(b){
    if(b.textContent.includes('Débloquer') || b.textContent.includes('Pub')){
      b.classList.add('btn-shake');
      setTimeout(function(){b.classList.remove('btn-shake');},400);
    }
  });
  var modal=document.getElementById('account-modal');
  if(!modal){createAccountModal();modal=document.getElementById('account-modal');}
  window._pendingCallback=cb||null;
  var msgEl=document.getElementById('account-modal-msg');
  if(msgEl)msgEl.textContent='Connectez-vous pour continuer.';
  modal.style.display='flex';
  setTimeout(function(){modal.classList.add('active');},10);
  setTimeout(attacherTousPhones,100);
  return false;
}
function createAccountModal(){
  var html='<div id="account-modal" class="modal" style="position:fixed;inset:0;background:rgba(15,23,42,.6);z-index:500;display:none;align-items:flex-end;justify-content:center"><div class="modal-slide-in" style="background:var(--bg-card);border-radius:24px 24px 0 0;max-width:520px;width:100%;padding:24px;position:relative;padding-bottom:max(24px,env(safe-area-inset-bottom));max-height:90vh;overflow-y:auto"><button onclick="closeAccountModal()" style="position:absolute;top:14px;right:14px;width:46px;height:46px;border-radius:50%;background:#ef4444;border:3px solid #fff;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;z-index:20;box-shadow:0 4px 12px rgba(220,38,38,.4)"><i class="fa-solid fa-xmark"></i></button><div style="text-align:center;margin-bottom:18px;padding-top:8px"><div class="modal-icon-entry" style="width:68px;height:68px;border-radius:20px;background:#0055ff;display:flex;align-items:center;justify-content:center;font-size:30px;color:#fff;margin:0 auto 14px"><i class="fa-solid fa-user-plus"></i></div><h3 style="font-size:20px;font-weight:900;color:var(--text-primary);margin:0">Créer votre compte</h3><p id="account-modal-msg" style="font-size:14px;color:var(--text-muted);margin-top:6px;line-height:1.5">Vous devez créer un compte pour continuer.</p></div><div style="display:flex;gap:6px;margin-bottom:14px;background:var(--bg-card-soft);padding:5px;border-radius:12px"><button type="button" onclick="basculerModalAccueil(\'inscription\')" id="tabInscription" style="flex:1;padding:12px;border-radius:8px;font-size:14px;font-weight:800;border:none;cursor:pointer;font-family:inherit;background:#0055ff;color:#fff">Créer</button><button type="button" onclick="basculerModalAccueil(\'connexion\')" id="tabConnexion" style="flex:1;padding:12px;border-radius:8px;font-size:14px;font-weight:800;border:none;cursor:pointer;font-family:inherit;background:transparent;color:var(--text-secondary)">Se connecter</button></div><div id="accountModalInscription"><div id="networkErrorMsg" style="display:none;padding:12px;background:#fef2f2;border:1.5px solid #fca5a5;border-radius:10px;color:#991b1b;font-size:13px;font-weight:700;text-align:center;margin-bottom:12px"><i class="fa-solid fa-wifi" style="margin-right:6px"></i> Mauvaise connexion. Vérifiez votre réseau.</div><form onsubmit="event.preventDefault();submitAccountModal();" style="display:flex;flex-direction:column;gap:14px"><input type="text" id="accNom" required placeholder="Nom *" class="form-input-3d"><input type="text" id="accPrenom" required placeholder="Prénom *" class="form-input-3d"><div style="display:flex;gap:6px;background:var(--bg-card-soft);padding:5px;border-radius:12px"><button type="button" id="sexeHomme" onclick="choisirSexe(\'homme\')" style="flex:1;padding:12px;border-radius:8px;font-size:14px;font-weight:800;border:none;cursor:pointer;font-family:inherit;background:transparent;color:var(--text-secondary);text-transform:uppercase">Homme</button><button type="button" id="sexeFemme" onclick="choisirSexe(\'femme\')" style="flex:1;padding:12px;border-radius:8px;font-size:14px;font-weight:800;border:none;cursor:pointer;font-family:inherit;background:transparent;color:var(--text-secondary);text-transform:uppercase">Femme</button></div><input type="hidden" id="accSexe" value=""><div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:14px;background:var(--bg-card-soft);border:1.5px dashed var(--border-primary);border-radius:12px"><div style="font-size:12.5px;font-weight:800;color:var(--text-secondary);text-transform:uppercase;letter-spacing:.4px">Photo de profil <span style="color:var(--text-muted);font-weight:600;text-transform:none">(optionnel)</span></div><div id="accAvatarPreview" style="width:72px;height:72px;border-radius:50%;background:rgba(0,85,255,.1);display:flex;align-items:center;justify-content:center;font-size:26px;color:var(--accent-blue);overflow:hidden"><i class="fa-solid fa-user"></i></div><div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><button type="button" onclick="document.getElementById(\'accAvatarInput\').click()" style="padding:9px 14px;border-radius:9px;background:var(--accent-blue);color:#fff;border:none;cursor:pointer;font-family:inherit;font-weight:800;font-size:12.5px;display:inline-flex;align-items:center;gap:6px"><i class="fa-solid fa-camera"></i> Ajouter</button><button type="button" id="accAvatarRemoveBtn" onclick="retirerAvatarInscription()" style="padding:9px 14px;border-radius:9px;background:transparent;color:var(--text-secondary);border:1.5px solid var(--border-primary);cursor:pointer;font-family:inherit;font-weight:800;font-size:12.5px;display:none">Retirer</button></div><input type="file" id="accAvatarInput" accept="image/*" style="display:none" onchange="handleAvatarInscription(event)"></div><div class="phone-field" style="display:flex;align-items:center;background:var(--bg-input);border:2px solid var(--border-input);border-radius:12px;overflow:hidden"><span style="padding:0 12px;font-weight:900;color:var(--text-muted);font-size:15px">+243</span><input type="tel" id="accPhone" required placeholder="Numéro WhatsApp *" maxlength="9" inputmode="numeric" pattern="[0-9]{9}" style="flex:1;border:none;background:transparent;padding:14px 12px 14px 0;outline:none;font-family:inherit;font-size:16px;color:var(--text-primary)"></div><div style="position:relative"><input type="password" id="accPassword" required placeholder="Mot de passe (6 à 15 caractères) *" maxlength="15" minlength="6" autocomplete="new-password" class="form-input-3d" style="padding-right:48px"><button type="button" onclick="togglePasswordVisibility(\'accPassword\',this)" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:18px;padding:8px"><i class="fa-regular fa-eye"></i></button></div><div style="font-size:12.5px;color:var(--text-muted);margin-top:-8px;line-height:1.5">De 6 à 15 caractères.</div><button type="submit" class="btn-3d blue" style="width:100%;padding:16px"><i class="fa-solid fa-check"></i> Créer mon compte</button></form></div><div id="accountModalConnexion" style="display:none"><form onsubmit="event.preventDefault();submitAccountLogin();" style="display:flex;flex-direction:column;gap:14px"><div class="phone-field" style="display:flex;align-items:center;background:var(--bg-input);border:2px solid var(--border-input);border-radius:12px;overflow:hidden"><span style="padding:0 12px;font-weight:900;color:var(--text-muted);font-size:15px">+243</span><input type="tel" id="accLoginPhone" required placeholder="Numéro WhatsApp" maxlength="9" inputmode="numeric" pattern="[0-9]{9}" style="flex:1;border:none;background:transparent;padding:14px 12px 14px 0;outline:none;font-family:inherit;font-size:16px;color:var(--text-primary)"></div><div style="position:relative"><input type="password" id="accLoginCode" required placeholder="Mot de passe" maxlength="15" autocomplete="current-password" class="form-input-3d" style="padding-right:48px"><button type="button" onclick="togglePasswordVisibility(\'accLoginCode\',this)" style="position:absolute;right:10px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:18px;padding:8px"><i class="fa-regular fa-eye"></i></button></div><button type="submit" class="btn-3d green" style="width:100%;padding:16px"><i class="fa-solid fa-arrow-right-to-bracket"></i> Se connecter</button><button type="button" onclick="ouvrirMdpOublie()" style="background:none;border:none;color:#0055ff;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;text-decoration:underline;padding:6px">Mot de passe oublié ?</button></form></div></div></div>';document.body.insertAdjacentHTML('beforeend',html);
}
function togglePasswordVisibility(inputId,btn){var inp=document.getElementById(inputId);if(!inp)return;if(inp.type==='password'){inp.type='text';btn.innerHTML='<i class="fa-regular fa-eye-slash"></i>';}else{inp.type='password';btn.innerHTML='<i class="fa-regular fa-eye"></i>';}}
function choisirSexe(s){var h=document.getElementById('accSexe');var bh=document.getElementById('sexeHomme');var bf=document.getElementById('sexeFemme');if(h)h.value=s;if(s==='homme'){if(bh){bh.style.background='#0055ff';bh.style.color='#fff';}if(bf){bf.style.background='transparent';bf.style.color='var(--text-secondary)';}}else if(s==='femme'){if(bf){bf.style.background='#0055ff';bf.style.color='#fff';}if(bh){bh.style.background='transparent';bh.style.color='var(--text-secondary)';}}}
function showAccountModal(m,cb,mode){
  try {
    var modal=document.getElementById('account-modal');
    if(!modal){createAccountModal();modal=document.getElementById('account-modal');}
    if(!document.getElementById('accNom')){
      var box=document.querySelector('#account-modal > div');
      if(box) box.innerHTML='<div style="padding:20px;text-align:center;color:#ef4444;font-weight:800">Erreur de chargement du formulaire. Veuillez rafraîchir la page.</div>';
    }
    window._pendingCallback=cb||null;
    if(mode==='login'){basculerModalAccueil('connexion');}
    else{basculerModalAccueil('inscription');}
    var msgEl=document.getElementById('account-modal-msg');
    if(msgEl&&m)msgEl.textContent=m;
    modal.style.display='flex';
    setTimeout(function(){modal.classList.add('active');},10);
    setTimeout(attacherTousPhones,100);
  } catch(e) { console.error(e); }
}
function basculerModalAccueil(o){var ti=document.getElementById('tabInscription');var tc=document.getElementById('tabConnexion');var bi=document.getElementById('accountModalInscription');var bc=document.getElementById('accountModalConnexion');var modal=document.getElementById('account-modal');var titre=modal?modal.querySelector('h3'):null;if(o==='inscription'){if(ti){ti.style.background='#0055ff';ti.style.color='#fff';}if(tc){tc.style.background='transparent';tc.style.color='var(--text-secondary)';}if(bi)bi.style.display='block';if(bc)bc.style.display='none';if(titre)titre.textContent='Créer votre compte';}else{if(tc){tc.style.background='#10b981';tc.style.color='#fff';}if(ti){ti.style.background='transparent';ti.style.color='var(--text-secondary)';}if(bc)bc.style.display='block';if(bi)bi.style.display='none';if(titre)titre.textContent='Se connecter';}}
function closeAccountModal(){var modal=document.getElementById('account-modal');if(!modal)return;modal.classList.remove('active');setTimeout(function(){modal.style.display='none';},250);window._pendingCallback=null;}

async function handleAvatarInscription(e){
  var f=e.target.files&&e.target.files[0];
  if(!f)return;
  if(f.size>5*1024*1024){showToast('Image trop lourde (max 5 Mo)');e.target.value='';return;}
  if(!f.type||f.type.indexOf('image/')!==0){showToast('Format invalide');e.target.value='';return;}
  try{
    var preview=document.getElementById('accAvatarPreview');
    if(preview)preview.innerHTML='<i class="fa-solid fa-spinner fa-spin" style="color:var(--accent-blue)"></i>';
    showToast('⏳ Upload en cours…');
    var result=await window.picrd.compressAndUpload(f);
    _accAvatarUrl=result.image_url||'';
    if(preview)preview.innerHTML='<img src="'+_accAvatarUrl+'" alt="" style="width:100%;height:100%;object-fit:cover">';
    var rb=document.getElementById('accAvatarRemoveBtn');
    if(rb)rb.style.display='inline-flex';
    showToast('✅ Photo ajoutée');
  }catch(err){
    showToast('Erreur upload: '+err.message);
    var preview=document.getElementById('accAvatarPreview');
    if(preview)preview.innerHTML='<i class="fa-solid fa-user"></i>';
  }finally{
    e.target.value='';
  }
}
function retirerAvatarInscription(){
  _accAvatarUrl='';
  var preview=document.getElementById('accAvatarPreview');
  if(preview)preview.innerHTML='<i class="fa-solid fa-user"></i>';
  var rb=document.getElementById('accAvatarRemoveBtn');
  if(rb)rb.style.display='none';
}

async function submitAccountModal(){
var nom=(document.getElementById('accNom')||{}).value?document.getElementById('accNom').value.trim():'';
var prenom=(document.getElementById('accPrenom')||{}).value?document.getElementById('accPrenom').value.trim():'';
var sexe=(document.getElementById('accSexe')||{}).value||'';
var phoneRaw=(document.getElementById('accPhone')||{}).value?document.getElementById('accPhone').value.trim():'';
var password=(document.getElementById('accPassword')||{}).value?document.getElementById('accPassword').value.trim():'';
if(!nom||!prenom||!phoneRaw||!password){showToast('Remplissez tous les champs');return;}
if(!sexe){showToast('Choisissez votre sexe');return;}
if(password.length<6){showToast('Mot de passe : min. 6 caractères');return;}
if(password.length>15){showToast('Mot de passe : max. 15 caractères');return;}
var phone=formatPhone243(phoneRaw);
if(!isValidePhone243(phoneRaw)){showToast('Numéro invalide');return;}
var btn=document.querySelector('#accountModalInscription button[type="submit"]');
if(btn){btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Vérification…';}
try{var phoneDisponible=await window.verifierPhoneUnique(phone);if(!phoneDisponible){showToast('Numéro déjà inscrit');if(btn){btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-check"></i> Créer mon compte';}return;}}catch(e){if(btn){btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-check"></i> Créer mon compte';}showToast('Erreur');return;}
try{await window.idbDelete(window.STORES.boutique,'current');await window.idbDelete(window.STORES.commerce,'current');}catch(e){}
var nc=nom+' '+prenom;
var nse=(nc||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-zA-Z0-9]/g,'').toLowerCase();
var pc=phone.replace(/[^\d]/g,'');
var ef=nse+pc+'@gmail.com';
if(btn){btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Création…';}
try{
var result=await window.createUser({nom:nom,prenom:prenom,nomComplet:nc,sexe:sexe,phone:phone,email:ef,password:password,ville:'',avatarUrl:_accAvatarUrl});
setCurrentAccount({id:result.uid,nom:nom,prenom:prenom,nomComplet:nc,name:nc,sexe:sexe,phone:phone,code:password,emailAuth:ef,avatarUrl:_accAvatarUrl,dateCreation:new Date().toISOString(),boutique:null});
try{await window.setStored(window.STORES.account,'current',window.CURRENT_ACCOUNT);}catch(e){}
try{localStorage.setItem('ntx_account_backup',JSON.stringify(window.CURRENT_ACCOUNT));}catch(e){}
var box=document.querySelector('#account-modal > div');
if(box){
box.innerHTML='<button onclick="closeAccountModal()" style="position:absolute;top:14px;right:14px;width:46px;height:46px;border-radius:50%;background:#ef4444;border:3px solid #fff;color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:20px;z-index:20;box-shadow:0 4px 12px rgba(220,38,38,.4)"><i class="fa-solid fa-xmark"></i></button><div style="text-align:center;padding:20px 4px"><div style="width:72px;height:72px;border-radius:50%;background:#d1fae5;color:#047857;display:flex;align-items:center;justify-content:center;font-size:34px;margin:0 auto 16px"><i class="fa-solid fa-check"></i></div><h3 style="font-size:20px;font-weight:900;color:var(--text-primary);margin-bottom:6px">Compte créé !</h3><p style="font-size:14px;color:var(--text-muted);margin-bottom:18px">Conservez votre mot de passe :</p><div style="font-family:ui-monospace,Menlo,monospace;font-size:22px;font-weight:900;color:#0055ff;letter-spacing:2px;padding:18px;background:rgba(0,85,255,.08);border-radius:14px;border:2px dashed #0055ff;margin-bottom:18px;word-break:break-all">'+password+'</div><button onclick="copyText(\''+password+'\')" class="btn-3d gray" style="width:100%;padding:14px;margin-bottom:10px;justify-content:center"><i class="fa-solid fa-copy"></i> Copier</button><button onclick="closeAccountModal();var cb=window._pendingCallback;window._pendingCallback=null;if(cb)cb();" class="btn-3d green" style="width:100%;padding:14px;justify-content:center"><i class="fa-solid fa-check"></i> Continuer</button></div>';
}
}catch(err){
if(btn){btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-check"></i> Créer mon compte';}
if(err.code==='auth/email-already-in-use'){showToast('Déjà inscrit');}else{showToast('Erreur');}
}
}

async function submitAccountLogin(){
var phoneRaw=(document.getElementById('accLoginPhone')||{}).value||'';
var code=(document.getElementById('accLoginCode')||{}).value||'';
phoneRaw=phoneRaw.trim();code=code.trim();
if(!phoneRaw||!code){showToast('Remplissez tous les champs');return;}
if(code.length<6||code.length>15){showToast('Mot de passe invalide');return;}
if(!isValidePhone243(phoneRaw)){showToast('Numéro invalide');return;}
var phone=formatPhone243(phoneRaw);
var btn=document.querySelector('#accountModalConnexion button[type="submit"]');
if(btn){btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Connexion…';}
try{
var user=await window.loginByPhoneCode(phone,code);
if(user&&user.error==='compte_desactive'){showToast('Compte désactivé');if(btn){btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-arrow-right-to-bracket"></i> Se connecter';}return;}
if(user){
try{await window.idbDelete(window.STORES.boutique,'current');await window.idbDelete(window.STORES.commerce,'current');}catch(e){}
setCurrentAccount(user);
CURRENT_COMMERCANT=user.boutique;
try{await window.setStored(window.STORES.account,'current',window.CURRENT_ACCOUNT);}catch(e){}
try{localStorage.setItem('ntx_account_backup',JSON.stringify(window.CURRENT_ACCOUNT));}catch(e){}
try{await window.setStored(window.STORES.boutique,'current',CURRENT_COMMERCANT);}catch(e){}
DEBLOCAGES_MEMORY=[];DEBLOCAGES_DIRTY=true;DEBLOCAGES_LAST_FETCH=0;
var box=document.querySelector('#account-modal > div');
if(box){box.innerHTML='<div class="success-check" style="width:80px;height:80px;border-radius:50%;background:#10b981;color:#fff;display:flex;align-items:center;justify-content:center;font-size:40px;margin:20px auto"><i class="fa-solid fa-check"></i></div><h3 style="font-size:22px;font-weight:900;color:#0f172a;text-align:center;margin:16px 0 8px">Bienvenue !</h3><p style="font-size:15px;color:#64748b;text-align:center;line-height:1.5">Vous êtes connecté à NeTubeX RDC.</p>';}
setTimeout(function(){showToast('Connecté');var cb=window._pendingCallback;window._pendingCallback=null;closeAccountModal();if(cb)setTimeout(cb,200);},1200);
}else{
showToast('Numéro ou code incorrect');
if(btn){btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-arrow-right-to-bracket"></i> Se connecter';}
}
}catch(err){
showToast('Erreur');
if(btn){btn.disabled=false;btn.innerHTML='<i class="fa-solid fa-arrow-right-to-bracket"></i> Se connecter';}
}
}

function openAccountOrProfile(){if(window.CURRENT_ACCOUNT){go('dashboard-utilisateur');}else{showAccountModal('Connectez-vous pour accéder à votre profil.',function(){go('dashboard-utilisateur');});}}
function ouvrirConnexion(){if(window.CURRENT_ACCOUNT){go('dashboard-utilisateur');return;}showAccountModal('Connectez-vous pour continuer.',function(){go('dashboard-utilisateur');},'login');}

async function doLogout(){
if(window.logoutUser)try{await window.logoutUser();}catch(e){}
arreterPolling();
if(_debloques_timer){clearInterval(_debloques_timer);_debloques_timer=null;}
setCurrentAccount(null);
CURRENT_COMMERCANT=null;CURRENT_COMMERCE=null;cart=[];
DEBLOCAGES_MEMORY=[];DEBLOCAGES_DIRTY=true;DEBLOCAGES_LAST_FETCH=0;
try{await window.idbDelete(window.STORES.account,'current');await window.idbDelete(window.STORES.boutique,'current');await window.idbDelete(window.STORES.commerce,'current');await window.idbDelete('config','cache_annonces');await window.idbDelete('config','cache_commerces');}catch(e){}
try{localStorage.clear();sessionStorage.clear();}catch(e){}
showToast('Déconnecté');go('index');
}
function demanderDeconnexion(){document.getElementById('deconnexionModalOverlay').classList.add('active');document.getElementById('deconnexionModal').classList.add('active');}
function fermerDeconnexionModal(){document.getElementById('deconnexionModalOverlay').classList.remove('active');document.getElementById('deconnexionModal').classList.remove('active');}
async function confirmerDeconnexion(){fermerDeconnexionModal();await doLogout();}

function appliquerThemeProfilUI(){var iD=document.body.classList.contains('dark-mode');var icon=document.getElementById('fabThemeIcon');if(icon)icon.className=iD?'fa-solid fa-sun':'fa-solid fa-moon';}
function toggleThemeProfil(){var iD=document.body.classList.contains('dark-mode');if(iD){document.body.classList.remove('dark-mode');document.documentElement.classList.remove('dark-mode');try{localStorage.setItem('ntx_theme','light');}catch(e){}}else{document.body.classList.add('dark-mode');document.documentElement.classList.add('dark-mode');try{localStorage.setItem('ntx_theme','dark');}catch(e){}}appliquerThemeProfilUI();}
(function chargerTheme(){try{var t=localStorage.getItem('ntx_theme')||'light';if(t==='dark'){document.documentElement.classList.add('dark-mode');document.body.classList.add('dark-mode');}appliquerThemeProfilUI();}catch(e){}})();

function ouvrirChangerNumero(){if(!window.CURRENT_ACCOUNT){showToast('Connectez-vous');return;}var m=document.getElementById('changePhoneModal');if(!m)return;document.getElementById('newPhoneInput').value='';document.getElementById('confirmPhoneInput').value='';m.classList.add('active');attacherTousPhones();}
function fermerChangerNumero(){var m=document.getElementById('changePhoneModal');if(m)m.classList.remove('active');}
async function validerChangerNumero(){var npRaw=(document.getElementById('newPhoneInput')||{}).value||'';var cpRaw=(document.getElementById('confirmPhoneInput')||{}).value||'';if(!npRaw||!cpRaw){showToast('Remplissez les 2 champs');return;}var np=formatPhone243(npRaw),cp=formatPhone243(cpRaw);if(np!==cp){showToast('Numéros différents');return;}if(!isValidePhone243(npRaw)){showToast('Numéro invalide');return;}if(!window.CURRENT_ACCOUNT){showToast('Session expirée');return;}try{await window.updatePhone(window.CURRENT_ACCOUNT.id,np);window.CURRENT_ACCOUNT.phone=np;setCurrentAccount(window.CURRENT_ACCOUNT);await window.setStored(window.STORES.account,'current',window.CURRENT_ACCOUNT);try{localStorage.setItem('ntx_account_backup',JSON.stringify(window.CURRENT_ACCOUNT));}catch(e){}var pe=document.getElementById('profilPhone');var pd=document.getElementById('profilPhoneDisplay');if(pe)pe.textContent=np;if(pd)pd.textContent=np;fermerChangerNumero();showToast('Numéro modifié');}catch(err){showToast('Erreur');}}

function ouvrirChangerAvatar(){
if(!window.CURRENT_ACCOUNT){showToast('Connectez-vous');return;}
_changeAvatarUrl=window.CURRENT_ACCOUNT.avatarUrl||'';
var m=document.getElementById('changeAvatarModal');
var o=document.getElementById('changeAvatarOverlay');
var p=document.getElementById('changeAvatarPreview');
var rb=document.getElementById('changeAvatarRemoveBtn');
if(p){if(_changeAvatarUrl){p.innerHTML='<img src="'+_changeAvatarUrl+'" alt="" style="width:100%;height:100%;object-fit:cover">';}else{p.innerHTML='<i class="fa-solid fa-user"></i>';}}
if(rb)rb.style.display=_changeAvatarUrl?'inline-flex':'none';
if(o)o.classList.add('active');
if(m)m.classList.add('active');
}
function fermerChangerAvatar(){
var m=document.getElementById('changeAvatarModal');
var o=document.getElementById('changeAvatarOverlay');
if(o)o.classList.remove('active');
if(m)m.classList.remove('active');
}
async function handleAvatarProfil(e){
var f=e.target.files&&e.target.files[0];
if(!f)return;
if(f.size>5*1024*1024){showToast('Image trop lourde (max 5 Mo)');e.target.value='';return;}
if(!f.type||f.type.indexOf('image/')!==0){showToast('Format invalide');e.target.value='';return;}
if(!window.CURRENT_ACCOUNT){showToast('Connectez-vous');return;}
try{
var p=document.getElementById('changeAvatarPreview');
if(p)p.innerHTML='<i class="fa-solid fa-spinner fa-spin" style="color:var(--accent-blue)"></i>';
showToast('⏳ Upload en cours…');
var result=await window.picrd.compressAndUpload(f);
var url=result.image_url||'';
await window.updateAvatar(window.CURRENT_ACCOUNT.id,url);
window.CURRENT_ACCOUNT.avatarUrl=url;
setCurrentAccount(window.CURRENT_ACCOUNT);
try{await window.setStored(window.STORES.account,'current',window.CURRENT_ACCOUNT);}catch(e){}
try{localStorage.setItem('ntx_account_backup',JSON.stringify(window.CURRENT_ACCOUNT));}catch(e){}
_changeAvatarUrl=url;
if(p)p.innerHTML='<img src="'+url+'" alt="" style="width:100%;height:100%;object-fit:cover">';
var rb=document.getElementById('changeAvatarRemoveBtn');
if(rb)rb.style.display='inline-flex';
mettreAJourAvatarProfilUI();
showToast('✅ Photo mise à jour');
setTimeout(fermerChangerAvatar,700);
}catch(err){
showToast('Erreur: '+err.message);
var p=document.getElementById('changeAvatarPreview');
if(p){if(_changeAvatarUrl)p.innerHTML='<img src="'+_changeAvatarUrl+'" alt="" style="width:100%;height:100%;object-fit:cover">';else p.innerHTML='<i class="fa-solid fa-user"></i>';}
}finally{
e.target.value='';
}
}
async function retirerAvatarProfil(){
if(!window.CURRENT_ACCOUNT){showToast('Connectez-vous');return;}
try{
await window.updateAvatar(window.CURRENT_ACCOUNT.id,'');
window.CURRENT_ACCOUNT.avatarUrl='';
setCurrentAccount(window.CURRENT_ACCOUNT);
try{await window.setStored(window.STORES.account,'current',window.CURRENT_ACCOUNT);}catch(e){}
try{localStorage.setItem('ntx_account_backup',JSON.stringify(window.CURRENT_ACCOUNT));}catch(e){}
_changeAvatarUrl='';
var p=document.getElementById('changeAvatarPreview');
if(p)p.innerHTML='<i class="fa-solid fa-user"></i>';
var rb=document.getElementById('changeAvatarRemoveBtn');
if(rb)rb.style.display='none';
mettreAJourAvatarProfilUI();
showToast('Photo retirée');
}catch(err){showToast('Erreur: '+err.message);}
}
function mettreAJourAvatarProfilUI(){
var el=document.getElementById('profilAvatar');
if(!el)return;
if(window.CURRENT_ACCOUNT&&window.CURRENT_ACCOUNT.avatarUrl){
el.innerHTML='<img src="'+window.CURRENT_ACCOUNT.avatarUrl+'" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:inherit">';
}else{
el.innerHTML='👤';
}
}

async function chargerDeblocages(fr){if(!window.CURRENT_ACCOUNT||!window.CURRENT_ACCOUNT.id)return[];var now=Date.now();var cv=!DEBLOCAGES_DIRTY&&(now-DEBLOCAGES_LAST_FETCH)<DEBLOCAGES_FETCH_COOLDOWN;if(!fr&&cv){return DEBLOCAGES_MEMORY;}try{var list=await window.mesDeblocages(window.CURRENT_ACCOUNT.id);DEBLOCAGES_MEMORY=list;DEBLOCAGES_LAST_FETCH=now;DEBLOCAGES_DIRTY=false;return list;}catch(e){return DEBLOCAGES_MEMORY;}}
function demarrerPollingDeblocages(){if(DEBLOCAGES_POLL_TIMER)clearInterval(DEBLOCAGES_POLL_TIMER);if(!window.CURRENT_ACCOUNT||!window.CURRENT_ACCOUNT.id)return;DEBLOCAGES_POLL_TIMER=setInterval(async function(){if(document.hidden)return;if(currentTab!=='dashboard-utilisateur'&&currentTab!=='detail')return;try{await chargerDeblocages(true);}catch(e){}},180000);}
function arreterPollingDeblocages(){if(DEBLOCAGES_POLL_TIMER){clearInterval(DEBLOCAGES_POLL_TIMER);DEBLOCAGES_POLL_TIMER=null;}}
async function rafraichirTousDeblocages(){DEBLOCAGES_DIRTY=true;await chargerDeblocages(true);}
async function renderDeblocagesEnAttente(){var c=document.getElementById('deblocagesEnAttenteList');var b=document.getElementById('dbtBadgeAttente');if(!c)return;var liste=await chargerDeblocages();var ea=liste.filter(function(d){return d.statut==='en_attente';});if(b)b.textContent=ea.length;if(ea.length===0){c.innerHTML='<div class="deblocage-empty"><div style="font-size:36px;opacity:.35;margin-bottom:10px">⏱️</div><h3 style="font-size:15px;font-weight:800;color:var(--text-primary)">Aucun déblocage</h3></div>';return;}c.innerHTML=ea.map(function(item){return'<div class="deblocage-item"><div class="deblocage-thumb">🏠</div><div style="flex:1;min-width:0"><div class="deblocage-titre">'+(item.titre||'Annonce')+'</div><div style="font-size:13px;color:#92400e;background:#fef3c7;padding:6px 8px;border-radius:8px;font-weight:800">⏳ En attente</div></div></div>';}).join('');}
async function renderDeblocagesDebloques(){var c=document.getElementById('deblocagesDebloquesList');var b=document.getElementById('dbtBadgeDebloques');if(!c)return;if(_debloques_timer){clearInterval(_debloques_timer);_debloques_timer=null;}var liste=await chargerDeblocages();var de=liste.filter(function(d){return d.statut==='debloque'&&!estDeblocageExpire(d);});if(b)b.textContent=de.length;if(de.length===0){c.innerHTML='<div class="deblocage-empty"><div style="font-size:36px;opacity:.35;margin-bottom:10px">🔓</div><h3 style="font-size:15px;font-weight:800;color:var(--text-primary)">Aucun déblocage</h3></div>';return;}c.innerHTML=de.map(function(item){var reste=tempsRestantDeblocage12h(item);var exp=new Date(item.dateValidation).getTime()+DEBLOCAGE_DUREE_MS;return'<div class="deblocage-item"><div class="deblocage-thumb">🔓</div><div style="flex:1;min-width:0"><div class="deblocage-titre">'+(item.titre||'Annonce')+'</div><div style="font-size:13px;color:#065f46;background:#d1fae5;padding:6px 8px;border-radius:8px;font-weight:800">⏱ Expire dans <span class="chrono-deblocage" data-expire="'+exp+'">'+formatCompteARebours(reste)+'</span></div></div></div>';}).join('');demarrerChronoDeblocages();}
function demarrerChronoDeblocages(){if(_debloques_timer)clearInterval(_debloques_timer);_debloques_timer=setInterval(function(){var cs=document.querySelectorAll('.chrono-deblocage');if(cs.length===0)return;var exp=false;cs.forEach(function(el){var e=parseInt(el.getAttribute('data-expire'),10);if(isNaN(e))return;var r=e-Date.now();if(r<=0){el.textContent='00h 00m';exp=true;}else{el.textContent=formatCompteARebours(r);}});if(exp){clearInterval(_debloques_timer);_debloques_timer=null;setTimeout(function(){renderDeblocagesDebloques();},1200);}},5000);}
function switchDeblocageSubTab(el,t){document.querySelectorAll('.deblocage-subtab').forEach(function(x){x.classList.remove('active');});el.classList.add('active');document.querySelectorAll('#deblocageSubPanelAttente, #deblocageSubPanelDebloques').forEach(function(p){p.style.display='none';});var tg=(t==='attente')?document.getElementById('deblocageSubPanelAttente'):document.getElementById('deblocageSubPanelDebloques');if(tg)tg.style.display='block';if(t==='attente')renderDeblocagesEnAttente();else if(t==='debloques')renderDeblocagesDebloques();}

function afficherPopupWhatsApp(message, telephone) {
    var overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(15,23,42,.75);z-index:950;display:flex;align-items:center;justify-content:center;padding:20px;opacity:0;transition:opacity .25s ease;';
    overlay.className = 'wa-popup-overlay';

    var modal = document.createElement('div');
    modal.style.cssText = 'background:var(--bg-card);border-radius:24px;padding:30px 24px;max-width:380px;width:100%;text-align:center;position:relative;transform:scale(.9);transition:transform .25s ease;box-shadow:0 10px 30px rgba(0,0,0,.2);';
    modal.className = 'wa-popup-modal';

    var safePhone = telephone ? telephone.replace(/[^\d]/g, '') : '';
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    var appUrl = safePhone ? 'whatsapp://send?phone=' + safePhone + '&text=' + message : 'whatsapp://send?text=' + message;
    var webUrl = safePhone ? 'https://wa.me/' + safePhone + '?text=' + message : 'https://wa.me/?text=' + message;
    var finalUrl = isMobile ? appUrl : webUrl;

    modal.innerHTML = `
        <button onclick="fermerPopupWhatsApp(this)" style="position:absolute;top:14px;right:14px;width:40px;height:40px;border-radius:50%;background:var(--bg-card-soft);color:var(--text-secondary);border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:18px;"><i class="fa-solid fa-xmark"></i></button>
        
        <div style="width:80px;height:80px;border-radius:50%;background:#25D366;color:#fff;display:flex;align-items:center;justify-content:center;font-size:40px;margin:0 auto 20px;box-shadow:0 8px 20px rgba(37,211,102,.3);">
            <i class="fa-brands fa-whatsapp"></i>
        </div>
        
        <h3 style="font-size:20px;font-weight:900;color:var(--text-primary);margin:0 0 8px;">Ouvrir WhatsApp ?</h3>
        <p style="font-size:14px;color:var(--text-muted);line-height:1.5;margin-bottom:24px;">Message pré-rempli. Il vous suffit d'envoyer.</p>
        
        <a href="${finalUrl}" target="_blank" onclick="setTimeout(()=>fermerPopupWhatsApp(document.querySelector('.wa-popup-overlay')), 500);" style="display:flex;align-items:center;justify-content:center;gap:10px;width:100%;padding:16px;border-radius:14px;background:#25D366;color:#fff;text-decoration:none;font-size:16px;font-weight:900;box-shadow:0 4px 14px rgba(37,211,102,.3);">
            <i class="fa-brands fa-whatsapp" style="font-size:20px;"></i> Ouvrir WhatsApp
        </a>
        
        <button onclick="fermerPopupWhatsApp(this)" style="width:100%;padding:14px;margin-top:12px;border-radius:14px;background:transparent;color:var(--text-muted);border:none;font-size:14px;font-weight:800;cursor:pointer;">Annuler</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    setTimeout(function() {
        overlay.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);

    overlay.onclick = function(e) {
        if (e.target === overlay) fermerPopupWhatsApp(overlay);
    };
}

function fermerPopupWhatsApp(el) {
    var overlay = el.closest ? el.closest('.wa-popup-overlay') : document.querySelector('.wa-popup-overlay');
    if (!overlay) return;
    var modal = overlay.querySelector('.wa-popup-modal');
    overlay.style.opacity = '0';
    if(modal) modal.style.transform = 'scale(.9)';
    setTimeout(function() {
        if(overlay && overlay.parentNode) overlay.parentNode.removeChild(overlay);
    }, 250);
}
window.afficherPopupWhatsApp = afficherPopupWhatsApp;
window.fermerPopupWhatsApp = fermerPopupWhatsApp;

function estHotelOuHebergement(type){var t=String(type||'').toLowerCase();return t.indexOf('hôtel')!==-1||t.indexOf('hotel')!==-1||t.indexOf('hébergement')!==-1||t.indexOf('hebergement')!==-1;}

function afficherSkeletonsFeed(nb){var feed=document.getElementById('mainFeed');if(!feed)return;var html='';for(var i=0;i<(nb||4);i++){html+='<div class="fb-post-skeleton"><div class="sk-row"><div class="sk-avatar"></div><div class="sk-col"><div class="sk-line w60"></div><div class="sk-line w40"></div></div></div><div class="sk-line sk-title w95"></div><div class="sk-line w85"></div><div class="sk-line w60"></div><div class="sk-price"></div><div class="sk-img"></div><div class="sk-actions"><div class="sk-action"></div><div class="sk-action"></div></div></div>';}feed.innerHTML=html;}
function masquerSkeletonsFeed(){var feed=document.getElementById('mainFeed');if(!feed)return;var sk=feed.querySelectorAll('.fb-post-skeleton');sk.forEach(function(el){el.remove();});}

function _construireFeedItems(){var items=[];var seed=String(Date.now())+Math.random();function sr(s){var x=Math.sin(s)*10000;return x-Math.floor(x);}ANNONCES_DATA.forEach(function(o,idx){items.push({type:'offre',data:o,_shuffleKey:sr(parseFloat(seed)+idx*31)});});COMMERCES_DATA.forEach(function(c,idx){var nb=(c.produits&&c.produits.length)?c.produits.length:0;var pp=(c.produits&&c.produits[0])?c.produits[0]:null;var img=c.img||(pp?pp.img:'');var desc=c.description||'';if(desc.length<60){desc='Découvrez notre catalogue : '+(c.type||'produits')+' à '+(c.ville||'RDC')+'.';}items.push({type:'commerce',data:{cat:'commerce',commerce:true,commerceId:c.id,commerceType:c.type,title:c.nom,name:c.nom,initials:(c.nom||'??').substring(0,2).toUpperCase(),avatar:img,location:(c.ville||'RDC')+(c.quartier?' · '+c.quartier:''),time:c.horaires||'Ouvert',price:nb?(nb+' produit'+(nb>1?'s':'')):'Catalogue',priceClass:'post-tag-land',desc:desc,img:img,tag:(c.emoji||'🏪')+' '+(c.type||'Commerce'),tagClass:'post-tag-commerce',unlock:false,isCommerce:true,vues:c.vues||0},_shuffleKey:sr(parseFloat(seed)+5000+idx*37)});});items.sort(function(a,b){return a._shuffleKey-b._shuffleKey;});return items;}
function getFeedItems(){if(!_nextFeedOrder){_nextFeedOrder=_construireFeedItems();}return _nextFeedOrder;}
function toggleDesc(id,btn){var el=document.getElementById(id);if(!el)return;if(btn.getAttribute('data-state')==='collapsed'){el.style.maxHeight=el.scrollHeight+'px';el.classList.add('expanded');btn.setAttribute('data-state','expanded');btn.textContent='Voir moins';setTimeout(function(){el.style.maxHeight='';},320);}else{el.style.maxHeight=el.scrollHeight+'px';requestAnimationFrame(function(){el.classList.remove('expanded');el.style.maxHeight='';});btn.setAttribute('data-state','collapsed');btn.textContent='Voir plus';}}
function verifierDescriptions(){var descs=document.querySelectorAll('.fb-post-desc');descs.forEach(function(el){var btn=document.getElementById(el.id+'-btn');if(!btn)return;el.style.webkitLineClamp='unset';el.style.display='block';var hr=el.scrollHeight;el.style.webkitLineClamp='';el.style.display='';var ht=el.clientHeight;if(hr>ht+4){btn.style.display='inline-block';}else{btn.style.display='none';}});}
function limiterTailleDOM(feed){var posts=feed.querySelectorAll('.fb-post');if(posts.length<=MAX_POSTS_DOM)return;var aSupprimer=posts.length-MAX_POSTS_DOM;for(var i=0;i<aSupprimer;i++){if(posts[i]&&posts[i].parentNode){posts[i].parentNode.removeChild(posts[i]);}}}
function construireNouveauCycle(exclureIds){var tous=_construireFeedItems();var nouveaux=[];var dejaVus=[];tous.forEach(function(item){var id=item.data.annonceId||item.data.commerceId||item.data.id;if(exclureIds&&exclureIds.has(id)){dejaVus.push(item);}else{nouveaux.push(item);}});function melanger(arr){for(var i=arr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var tmp=arr[i];arr[i]=arr[j];arr[j]=tmp;}return arr;}melanger(nouveaux);melanger(dejaVus);return nouveaux.concat(dejaVus);}

function renderOffreCard(p,contexte){
if(p.commerce){
var media=p.img?'<div class="fb-post-media"><img src="'+p.img+'" alt="" width="800" height="500" loading="lazy" decoding="async"></div>':'';
var dId='desc-'+Math.random().toString(36).slice(2,9);
var descPropre=nettoyerTexte(p.desc);
var dH='<p class="fb-post-desc" id="'+dId+'">'+esc(descPropre)+'</p>';
dH+='<button class="fb-post-desc-toggle" id="'+dId+'-btn" onclick="event.stopPropagation();toggleDesc(\''+dId+'\',this)" data-state="collapsed" style="display:none">Voir plus</button>';
var headHtml = '<div class="fb-post-head">'+getAvatarHTML(p,52)+'<div style="min-width:0;overflow:hidden;width:100%"><div style="display:flex;justify-content:space-between;align-items:center;gap:8px;width:100%"><div class="fb-post-name" style="flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+p.name+getVerifiedBadgeHTML(p)+'</div><span style="display:inline-flex;align-items:center;gap:5px;font-size:12px;font-weight:900;color:#059669;white-space:nowrap"><i class="fa-solid fa-bag-shopping"></i> '+(p.price||'Catalogue')+'</span></div><div class="fb-post-sub">'+p.location+' · '+p.time+'</div></div></div>';
var bandeau='<div style="background:rgba(0,85,255,.06);border-top:1px solid rgba(0,85,255,.2);border-bottom:1px solid rgba(0,85,255,.2);padding:6px 12px;margin:0 0 8px;display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">'+'<span class="feed-badge '+(p.tagClass||'post-tag-commerce')+'" style="font-size:10.5px;padding:3px 8px;letter-spacing:.4px">'+(p.tag||'🏪 Commerce')+'</span>'+'<span class="fb-post-views" style="margin:0;flex-shrink:0;background:rgba(0,85,255,.1);color:#0055ff;padding:3px 8px;border-radius:6px"><i class="fa-solid fa-eye"></i> '+(p.vues||0)+' Vue'+((p.vues||0)===1?'':'s')+'</span>'+'</div>';
var actionsHtml='<div class="fb-post-actions">'+'<button class="fb-action-btn" onclick="event.stopPropagation();sharePostFromFeed('+JSON.stringify(p).replace(/"/g,'&quot;')+')"><i class="fa-solid fa-share-nodes"></i> Partager</button>'+'<button class="fb-action-btn fb-action-primary" onclick="event.stopPropagation();openCatalogue(\''+p.commerceId+'\')"><i class="fa-solid fa-bag-shopping"></i> Voir catalogue</button>'+(estHotelOuHebergement(p.commerceType)?'<button class="fb-action-btn" style="background:#f59e0b;color:#fff;font-weight:900;margin-left:auto;border:none;padding:9px 15px" onclick="event.stopPropagation();ouvrirReservation(\''+p.commerceId+'\')"><i class="fa-solid fa-bed"></i> Réserver</button>':'')+'</div>';
return '<article class="fb-post" onclick=\'openCatalogue("'+p.commerceId+'")\'>'+headHtml+bandeau+'<div class="fb-post-body"><h3 class="fb-post-title">'+p.title+'</h3>'+dH+'</div>'+media+actionsHtml+'</article>';
}
var nc=normCat(p.cat);
var typePostuler=(CAT_POSTULER.indexOf(nc)!==-1);
var typeAppeler=(CAT_APPELER.indexOf(nc)!==-1);
var actionBtn;
if(typePostuler){
var telJob=(p.publieurPhone||'').replace(/[^\d]/g,'');
var aId=p.annonceId||p.id||'';
var pUid=p.publieurUid||'';
var jobSafe=JSON.stringify({title:p.title||'',name:p.name||'',phone:p.publieurPhone||''}).replace(/"/g,'&quot;');
actionBtn='<button class="fb-action-btn" onclick="event.stopPropagation();partagerJob(\''+aId+'\',\''+pUid+'\','+jobSafe+')"><i class="fa-solid fa-share-nodes"></i> Partager</button>'
+'<button class="fb-action-btn fb-action-primary" onclick="event.stopPropagation();postulerJob({title:\''+String(p.title||'').replace(/'/g,"\\'")+'\',phone:\''+telJob+'\',annonceId:\''+aId+'\',proprietaireUid:\''+pUid+'\'})"><i class="fa-solid fa-paper-plane"></i> Postuler</button>';
}else if(typeAppeler){
var telHop=(p.publieurPhone||'').replace(/[^\d]/g,'');
var shareBtnH='<button class="fb-action-btn" onclick="event.stopPropagation();sharePostFromFeed('+JSON.stringify(p).replace(/"/g,'&quot;')+')"><i class="fa-solid fa-share-nodes"></i> Partager</button>';
if(telHop){
actionBtn=shareBtnH+'<a href="tel:+'+telHop+'" class="fb-action-btn" style="background:#10b981;color:#fff;font-weight:900;margin-left:auto;border:none;text-decoration:none" onclick="event.stopPropagation()"><i class="fa-solid fa-phone"></i> Appeler</a>';
}else{
actionBtn=shareBtnH+'<button class="fb-action-btn fb-action-primary" onclick="event.stopPropagation();openDetail('+JSON.stringify(p).replace(/'/g,"&#39;")+')"><i class="fa-solid fa-eye"></i> Voir</button>';
}
}else{
if(p.unlock){
var dv=p.annonceId&&trouverDeblocagePourAnnonce(p.annonceId);
var de=p.annonceId&&DEBLOCAGES_MEMORY.find(function(d){return d.annonceId===p.annonceId&&d.statut==='en_attente';});
var shareBtn='<button class="fb-action-btn" onclick="event.stopPropagation();sharePostFromFeed('+JSON.stringify(p).replace(/"/g,'&quot;')+')"><i class="fa-solid fa-share-nodes"></i> Partager</button>';
if(dv){actionBtn=shareBtn+'<button class="fb-action-btn" style="background:#ecfdf5;color:#059669;font-weight:900;margin-left:auto;border:1.5px solid #a7f3d0"><i class="fa-solid fa-circle-check"></i> Débloqué</button>';}
else if(de){actionBtn=shareBtn+'<button class="fb-action-btn" style="background:#fef3c7;color:#92400e;font-weight:900;margin-left:auto;border:1.5px solid #fcd34d"><i class="fa-solid fa-hourglass-half"></i> En cours</button>';}
else{actionBtn=shareBtn+'<button class="fb-action-btn fb-action-primary" onclick="event.stopPropagation();openDetail('+JSON.stringify(p).replace(/'/g,"&#39;")+')"><i class="fa-solid fa-lock"></i> Débloquer</button>';}
}else{
actionBtn='<button class="fb-action-btn" onclick="event.stopPropagation();sharePostFromFeed('+JSON.stringify(p).replace(/"/g,'&quot;')+')"><i class="fa-solid fa-share-nodes"></i> Partager</button>'
+'<button class="fb-action-btn fb-action-primary" onclick="event.stopPropagation();openDetail('+JSON.stringify(p).replace(/'/g,"&#39;")+')"><i class="fa-solid fa-lock"></i> Débloquer</button>';
}
}
var media=p.img?'<div class="fb-post-media"><img src="'+p.img+'" alt="" width="800" height="500" loading="lazy" decoding="async" onerror="this.parentElement.style.display=\'none\'"></div>':'';
var ta=p.dateCreation?tempsRelatif(p.dateCreation):(p.time||'Récemment');
var cB='<div class="fb-post-views"><i class="fa-solid fa-eye"></i> '+(p.vues||0)+' Vue'+((p.vues||0)===1?'':'s')+'</div>';
var dId='desc-'+Math.random().toString(36).slice(2,9);
var descPropre=nettoyerTexte(p.desc);
var dH='<p class="fb-post-desc" id="'+dId+'">'+esc(descPropre)+'</p>';
dH+='<button class="fb-post-desc-toggle" id="'+dId+'-btn" onclick="event.stopPropagation();toggleDesc(\''+dId+'\',this)" data-state="collapsed" style="display:none">Voir plus</button>';
var articleOnclick='';
if(!typePostuler){articleOnclick=' onclick=\'openDetail('+JSON.stringify(p).replace(/'/g,"&#39;")+')\'';}
return '<article class="fb-post" data-annonce-id="'+(p.annonceId||p.id||'')+'" data-cat="'+(p.cat||'autre')+'"'+articleOnclick+'><div class="fb-post-head">'+getAvatarHTML(p,52)+'<div style="min-width:0;overflow:hidden"><div class="fb-post-name">'+p.name+getVerifiedBadgeHTML(p)+getJobBadgeHTML(p)+'</div><div class="fb-post-sub">'+p.location+' · '+ta+'</div></div><span class="feed-badge '+(p.tagClass||'post-tag-autre')+'">'+(p.tag||'AUTRE')+'</span></div><div class="fb-post-body"><h3 class="fb-post-title">'+p.title+'</h3>'+dH+'</div>'+(p.price?'<div class="fb-post-body fb-post-price-row"><div class="fb-post-price '+p.priceClass+'" style="margin-top:0">'+p.price+'</div>'+cB+'</div>':'')+media+'<div class="fb-post-actions">'+actionBtn+'</div></article>';
}

function postulerJob(ref){
if(ref.annonceId){incrementerVuesAnnonce(ref.annonceId,ref.proprietaireUid);}
requireLogin('postuler',function(){
var telPublieur=String(ref.phone||'').replace(/[^\d]/g,'');
if(!telPublieur){showToast('Numéro du publieur indisponible');return;}
var titre=ref.title||'Offre d\'emploi';
var nomPostulant=window.CURRENT_ACCOUNT.name||window.CURRENT_ACCOUNT.nomComplet||'Utilisateur';
var telPostulant=window.CURRENT_ACCOUNT.phone||'';
var msg='*NeTubeX RDC*%0A%0A👋 *CANDIDATURE*%0A%0A💼 *Offre :* '+encodeURIComponent(titre)+'%0A%0A*Mes coordonnées :*%0A• Nom : '+encodeURIComponent(nomPostulant)+'%0A• WhatsApp : '+encodeURIComponent(telPostulant)+'%0A%0A✅ _Via NeTubeX RDC_';
afficherPopupWhatsApp(msg, telPublieur);
});
}
function partagerJob(aId,pUid,ref){if(aId){incrementerVuesAnnonce(aId,pUid);}requireLogin('partager',function(){var titre=(ref&&ref.title)?String(ref.title):'Offre d\'emploi';var publieur=(ref&&ref.name)?String(ref.name):'';var msg='💼 *'+titre+'*\n\n';if(publieur){msg+='🏢 Publié par : '+publieur+'\n';}msg+='\n📱 Voir l\'offre sur *NeTubeX RDC* :\nhttps://www.netubex.com/rdc\n\n✅ _Partagé via NeTubeX RDC_';if(navigator.share){navigator.share({title:titre,text:msg,url:'https://www.netubex.com/rdc'}).catch(function(err){if(err&&err.name!=='AbortError'){}});}else{window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');}});}

function renderFeedBatch(page){var feed=document.getElementById('mainFeed');if(!feed)return;if(_feedLoading)return;_feedLoading=true;if(_feedDebounceTimer){clearTimeout(_feedDebounceTimer);_feedDebounceTimer=null;}if(_feedCycleItems.length===0){_feedCycleItems=construireNouveauCycle(_feedSeenIds);_feedCycleIndex=0;}if(_feedCycleIndex>=_feedCycleItems.length){_feedLoopCount++;_feedSeenIds.clear();_feedCycleItems=construireNouveauCycle(null);_feedCycleIndex=0;}var start=_feedCycleIndex;var end=Math.min(start+FEED_PER_PAGE,_feedCycleItems.length);var lot=_feedCycleItems.slice(start,end);if(lot.length===0){_feedLoading=false;return;}if(page===0&&feed.children.length===0){feed.innerHTML='';_feedRenderedCount=0;}masquerSkeletonsFeed();var html='';lot.forEach(function(item){html+=renderOffreCard(item.data);var id=item.data.annonceId||item.data.commerceId||item.data.id;if(id)_feedSeenIds.add(id);});var temp=document.createElement('div');temp.innerHTML=html;var frag=document.createDocumentFragment();while(temp.firstChild){frag.appendChild(temp.firstChild);}feed.appendChild(frag);_feedCycleIndex=end;_feedRenderedCount+=lot.length;limiterTailleDOM(feed);requestAnimationFrame(function(){_feedLoading=false;setTimeout(verifierDescriptions,60);});}
function initFeed(){var oldAds=document.querySelectorAll('.fb-post-ad');oldAds.forEach(function(el){el.remove();});_feedLoading=false;_feedRenderedCount=0;feedPage=0;_nextFeedOrder=null;_feedCycleItems=[];_feedCycleIndex=0;_feedSeenIds.clear();_feedLoopCount=0;afficherSkeletonsFeed(4);setTimeout(function(){masquerSkeletonsFeed();renderFeedBatch(0);feedPage=1;},100);var s=document.getElementById('feedSentinel');if(s&&'IntersectionObserver' in window){if(_feedObserver)_feedObserver.disconnect();_feedObserver=new IntersectionObserver(function(entries){entries.forEach(function(e){if(!e.isIntersecting)return;if(_feedLoading)return;if(_feedDebounceTimer)clearTimeout(_feedDebounceTimer);_feedDebounceTimer=setTimeout(function(){renderFeedBatch(feedPage);feedPage++;},300);});},{root:null,rootMargin:'800px 0px',threshold:0});_feedObserver.observe(s);}if(!window._feedScrollFallbackAttached){window._feedScrollFallbackAttached=true;window.addEventListener('scroll',function(){if(_feedLoading)return;if(currentTab!=='index')return;var doc=document.documentElement;var scrollBottom=doc.scrollHeight-(window.scrollY+window.innerHeight);if(scrollBottom<800){if(_feedDebounceTimer)clearTimeout(_feedDebounceTimer);_feedDebounceTimer=setTimeout(function(){renderFeedBatch(feedPage);feedPage++;},300);}},{passive:true});}}

function updateHeaderBtn(page){var b=document.getElementById('headerBackBtn');if(!b)return;if(page==='index'){b.classList.remove('is-back');}else{b.classList.add('is-back');}}
function headerBackAction(){go('index');}
async function explorerCommerces(){requireLogin('explorer',function(){go('commerces');});}
function lancerOffreImmobilier(){requireLogin('publier',function(){go('publish','immobilier');});}
function go(page,param){var pp=['index','commerces','jobs','immobilier','comment'];if(pp.indexOf(page)===-1&&!window.CURRENT_ACCOUNT){requireLogin('accéder',function(){go(page,param);});return;}if(currentTab==='index'&&page!=='index'){_nextFeedOrder=_construireFeedItems();rafraichirDonneesSilencieusement();}currentTab=page;document.querySelectorAll('.page').forEach(function(p){p.classList.remove('active');});var el=document.getElementById('page-'+page);if(el)el.classList.add('active');window.scrollTo(0,0);document.body.style.overflow='';updateHeaderBtn(page);document.body.classList.remove('hide-header');arreterPolling();if(page!=='index'&&page!=='catalogue'){demarrerPolling();}if(page!=='dashboard-utilisateur'){arreterPollingDeblocages();}var ft=document.getElementById('fabThemeBtn');var fl=document.getElementById('fabLogoutBtn');if(page==='dashboard-utilisateur'){if(ft)ft.style.display='flex';if(fl)fl.style.display='flex';}else{if(ft)ft.style.display='none';if(fl)fl.style.display='none';}if(page==='index'){feedPage=0;initFeed();}if(page==='jobs'){renderJobsFeed();}if(page==='immobilier'){var sub=document.querySelector('.immobilier-subtab.active');renderImmobilierFeed(sub?sub.getAttribute('data-sub')||'all':'all');}if(page==='category'){CURRENT_CATEGORY=(!param||param==='all')?'autre':param;renderCategoryFeed(CURRENT_CATEGORY);var cpb=document.getElementById('catPublishBtn');if(cpb){var cn=(!param||param==='all')?'autre':param;cpb.style.display=(cn==='autre')?'':'none';}}if(page==='publish'){var cat=(!param||param==='all')?'autre':param;var type='autre';if(cat==='immobilier'||cat==='location'||cat==='parcelle')type='immobilier';else if(cat==='job'||cat==='jobs')type='jobs';setTimeout(function(){ouvrirPublishPourCategorie(type);},50);}if(page==='commerces'){demarrerBarreProgression();refreshCommerces().finally(function(){terminerBarreProgression();});}if(page==='dashboard-utilisateur'){demarrerPollingDeblocages();if(window.CURRENT_ACCOUNT){var n=document.getElementById('profilNom');var p=document.getElementById('profilPhone');if(n)n.textContent=window.CURRENT_ACCOUNT.name;if(p)p.textContent=window.CURRENT_ACCOUNT.phone;mettreAJourAvatarProfilUI();}appliquerThemeProfilUI();var pd=document.getElementById('profilPhoneDisplay');if(pd)pd.textContent=window.CURRENT_ACCOUNT?window.CURRENT_ACCOUNT.phone||'—':'—';verifierBoutiqueEtAfficher();renderMesStats();renderMesPublications();if(window.CURRENT_ACCOUNT){DEBLOCAGES_DIRTY=true;rafraichirTousDeblocages();setTimeout(function(){renderDeblocagesEnAttente();},300);}}if(!_navFromPopstate){try{history.pushState({page:page,param:param||null},'',null);}catch(e){}}_navFromPopstate=false;}
window.addEventListener('popstate',function(e){_navFromPopstate=true;if(e.state&&e.state.page){go(e.state.page,e.state.param);}else{go('index');}});

function renderCategoryFeed(cat){var f=document.getElementById('categoryFeed');if(!f)return;var cible=normCat(cat||'autre');var r=ANNONCES_DATA.filter(function(p){if(!p)return false;var c=normCat(p.cat);if(cible==='autre'){return CAT_JOB.indexOf(c)===-1;}return c===cible;});if(r.length===0){f.innerHTML='<div style="text-align:center;padding:60px 20px;background:var(--bg-card);border:1px dashed var(--border-primary);border-radius:16px;margin:16px"><div style="font-size:48px;opacity:.35;margin-bottom:14px">📭</div><h3 style="font-size:17px;font-weight:800">Aucune annonce</h3></div>';return;}f.innerHTML=r.map(function(x){return renderOffreCard(x,'autre');}).join('');setTimeout(verifierDescriptions,50);}
function filterCategory(el,cat){requireLogin('filtres',function(){CURRENT_CATEGORY=cat;document.querySelectorAll('.category-btn').forEach(function(b){b.classList.remove('active');});el.classList.add('active');if(cat==='commerces'){explorerCommerces();return;}if(cat==='jobs'){go('jobs');return;}if(cat==='immobilier'){go('immobilier');return;}go('category',cat);});}
function renderJobsFeed(){var feed=document.getElementById('jobsFeed');if(!feed)return;var jobs=ANNONCES_DATA.filter(function(p){if(!p)return false;return CAT_JOB.indexOf(normCat(p.cat))!==-1;});var q=(document.getElementById('jobsSearchInput')||{}).value||'';if(q.trim()){q=normaliser(q);jobs=jobs.filter(function(j){var txt=normaliser((j.title||'')+' '+(j.desc||'')+' '+(j.location||''));return txt.indexOf(q)!==-1;});}if(jobs.length===0){feed.innerHTML='<div style="text-align:center;padding:60px 20px;background:var(--bg-card);border:1px dashed var(--border-primary);border-radius:16px;margin:16px"><div style="font-size:48px;opacity:.35;margin-bottom:14px">💼</div><h3 style="font-size:17px;font-weight:800;color:var(--text-primary)">Aucune offre</h3></div>';return;}feed.innerHTML=jobs.map(function(j){return renderOffreCard(j,'jobs');}).join('');setTimeout(verifierDescriptions,50);}
function filtrerJobs(){renderJobsFeed();}
function filtrerImmobilier(el,sub){document.querySelectorAll('.immobilier-subtab').forEach(function(b){b.classList.remove('active');});el.classList.add('active');renderImmobilierFeed(sub);}
function renderImmobilierFeed(sub){var feed=document.getElementById('immobilierFeed');if(!feed)return;function catImmo(p){if(!p)return false;return CAT_IMMO.indexOf(normCat(p.cat))!==-1;}function catLoc(p){if(!p)return false;return CAT_IMMO_LOC.indexOf(normCat(p.cat))!==-1;}function catPar(p){if(!p)return false;return CAT_IMMO_PAR.indexOf(normCat(p.cat))!==-1;}var results;if(sub==='all'){results=ANNONCES_DATA.filter(catImmo);}else if(sub==='location'){results=ANNONCES_DATA.filter(catLoc);}else if(sub==='parcelle'){results=ANNONCES_DATA.filter(catPar);}else{results=ANNONCES_DATA.filter(function(p){return normCat(p.cat)===normCat(sub);});}if(results.length===0){feed.innerHTML='<div style="text-align:center;padding:60px 20px;background:var(--bg-card);border:1px dashed var(--border-primary);border-radius:16px;margin:16px"><div style="font-size:48px;opacity:.35;margin-bottom:14px">🏠</div><h3 style="font-size:17px;font-weight:800">Aucune annonce</h3></div>';return;}feed.innerHTML=results.map(function(x){return renderOffreCard(x,'immobilier');}).join('');setTimeout(verifierDescriptions,50);}
async function refreshCommerces(){try{var c=await window.chargerCommercesFirestore(false);COMMERCES_DATA=c;renderCommercesGrid();}catch(e){}}
function renderCommercesGrid(){var g=document.getElementById('commercesGrid');if(!g)return;if(!COMMERCES_DATA||COMMERCES_DATA.length===0){g.innerHTML='<div style="text-align:center;padding:60px 20px;background:var(--bg-card);border:1px dashed var(--border-primary);border-radius:16px;grid-column:1/-1"><div style="font-size:48px;opacity:.35;margin-bottom:14px">🏪</div><h3 style="font-size:17px;font-weight:800;color:var(--text-primary);margin-bottom:6px">Aucun commerce</h3></div>';return;}var html='';COMMERCES_DATA.forEach(function(c){if(!c)return;if(!c.type)c.type='Commerce';if(!c.nom)c.nom='Commerce';if(!c.ville)c.ville='RDC';if(!c.horaires)c.horaires='Ouvert';if(!c.description)c.description='Découvrez notre catalogue.';if(c.vues===undefined)c.vues=0;var isS=(c.type==='Services / Atelier'||c.type==='services');var isHotel=estHotelOuHebergement(c.type);var img=c.img||c.avatar||'';var imgHtml=img?'<img src="'+img+'" alt="" loading="lazy" decoding="async">':'<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;opacity:.4">'+((c.emoji)||'🏪')+'</div>';var actionsHtml='';
if(isS){actionsHtml='<a href="tel:'+((c.whatsapp||c.telephone||'').replace(/[^\d+]/g,''))+'" style="padding:9px 15px;border-radius:9px;font-size:13px;font-weight:900;background:#10b981;color:#fff;text-decoration:none" onclick="event.stopPropagation()"><i class="fa-solid fa-phone"></i> Appeler</a>';}
else if(isHotel){actionsHtml='<div style="display:flex;gap:6px;flex-wrap:wrap"><button onclick="event.stopPropagation();openCatalogue(\''+c.id+'\')" style="padding:9px 15px;border-radius:9px;font-size:13px;font-weight:900;background:#0055ff;color:#fff;border:none;cursor:pointer;font-family:inherit">Catalogue</button><button onclick="event.stopPropagation();ouvrirReservation(\''+c.id+'\')" style="padding:9px 15px;border-radius:9px;font-size:13px;font-weight:900;background:#f59e0b;color:#fff;border:none;cursor:pointer;font-family:inherit"><i class="fa-solid fa-bed"></i> Réserver</button></div>';}
else{actionsHtml='<button onclick="event.stopPropagation();openCatalogue(\''+c.id+'\')" style="padding:9px 15px;border-radius:9px;font-size:13px;font-weight:900;background:#0055ff;color:#fff;border:none;cursor:pointer;font-family:inherit">Catalogue <i class="fa-solid fa-arrow-right"></i></button>';}
html+='<article class="commerce-card" data-type="'+c.type+'" data-ville="'+(c.ville||'')+'" data-quartier="'+(c.quartier||'')+'" style="background:var(--bg-card);border:1px solid var(--border-primary);border-radius:16px;overflow:hidden;display:flex;flex-direction:column;cursor:pointer" onclick="openCatalogue(\''+c.id+'\')"><div style="position:relative;width:100%;aspect-ratio:16/10;background:var(--bg-card-alt);overflow:hidden">'+imgHtml+'<span style="position:absolute;top:10px;left:10px;background:rgba(15,23,42,.85);color:#fff;font-size:11px;font-weight:900;padding:5px 10px;border-radius:8px;text-transform:uppercase">'+c.type+'</span><span style="position:absolute;top:10px;right:10px;background:#0055ff;color:#fff;font-size:11px;font-weight:900;padding:6px 11px;border-radius:999px;border:1.5px solid rgba(255,255,255,.4);text-transform:uppercase">Vérifié</span></div><div style="padding:14px;display:flex;flex-direction:column;gap:8px;flex:1"><h3 style="font-size:18px;font-weight:900;color:var(--text-primary);line-height:1.35;margin:0">'+c.nom+'</h3><div style="font-size:14px;color:var(--text-muted);font-weight:600;display:flex;align-items:center;gap:5px"><i class="fa-solid fa-location-dot" style="color:#ef4444"></i> '+(c.ville||'RDC')+(c.quartier?' · '+c.quartier:'')+'</div><p style="font-size:15px;color:var(--text-secondary);line-height:1.6;margin:0">'+(c.description||'')+'</p></div><div style="padding:12px 14px;border-top:1px solid var(--border-soft);display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap"><span style="font-size:13px;color:var(--text-muted);font-weight:600"><i class="fa-regular fa-clock"></i> '+(c.horaires||'Ouvert')+'</span>'+actionsHtml+'</div></article>';});g.innerHTML=html;}
function filtrerCommerces(){requireLogin('filtres',function(){var type=(document.getElementById('filterCommerceType')||{}).value||'';var ville=(document.getElementById('filterCommerceVille')||{}).value||'';var quartier=((document.getElementById('filterCommerceQuartier')||{}).value||'').toLowerCase();var cards=document.querySelectorAll('.commerce-card');var visible=0;cards.forEach(function(card){var cT=card.getAttribute('data-type')||'';var cV=card.getAttribute('data-ville')||'';var cQ=(card.getAttribute('data-quartier')||'').toLowerCase();var mT=!type||cT===type;var mV=!ville||cV===ville;var mQ=!quartier||cQ.indexOf(quartier)!==-1;if(mT&&mV&&mQ){card.style.display='flex';visible++;}else{card.style.display='none';}});var cnt=document.getElementById('commercesCount');if(cnt)cnt.textContent=visible+' établissement'+(visible>1?'s':'');});}
async function openCatalogue(id){requireLogin('catalogue',function(){var c=COMMERCES_DATA.find(function(x){return x.id===id;});if(!c){showToast('Introuvable');return;}incrementerVuesBoutique(c.uid,c.id);if(!CURRENT_COMMERCE||CURRENT_COMMERCE.id!==c.id){cart=[];updateCart();refreshAddButtons();}CURRENT_COMMERCE=c;renderCatalogue(c);go('catalogue');});}
function renderCatalogue(c){if(!c){showToast('Introuvable');go('commerces');return;}var h=document.getElementById('catalogueHeader');var isS=(c.type==='Services / Atelier'||c.type==='services');var isHotel=estHotelOuHebergement(c.type);CATALOGUE_PRODUITS=Array.isArray(c.produits)?c.produits.slice():[];var av=c.img?'<img src="'+c.img+'" alt="">':(c.emoji||'🏪');var ch='';if(c.ville||c.quartier){ch+='<span class="catalogue-meta-chip"><i class="fa-solid fa-location-dot"></i> '+esc((c.ville||'')+(c.quartier?' · '+c.quartier:''))+'</span>';}if(c.horaires){ch+='<span class="catalogue-meta-chip"><i class="fa-regular fa-clock"></i> '+esc(c.horaires)+'</span>';}var nb=CATALOGUE_PRODUITS.length;var tv=c.vues||0;var wn=(c.whatsapp||c.whatsappCommercial||c.telephone||'').replace(/[^\d]/g,'');var resaBtn=isHotel?'<button onclick="ouvrirReservation(\''+c.id+'\')" style="margin-top:16px;padding:14px 22px;border-radius:12px;font-size:15px;font-weight:900;background:#f59e0b;color:#fff;border:none;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:8px;box-shadow:0 4px 14px rgba(245,158,11,.35)"><i class="fa-solid fa-bed"></i> Réserver une chambre</button>':'';if(h){h.innerHTML='<div class="catalogue-hero-content"><div class="catalogue-avatar">'+av+'</div><h1 class="catalogue-name">'+esc(c.nom||'Commerce')+'<span class="verified-badge"><i class="fa-solid fa-check"></i></span></h1>'+(ch?'<div class="catalogue-meta">'+ch+'</div>':'')+'<div class="catalogue-stats"><div class="catalogue-stat"><div class="catalogue-stat-value">'+nb+'</div><div class="catalogue-stat-label">Produits</div></div><div class="catalogue-stat"><div class="catalogue-stat-value">'+tv+'</div><div class="catalogue-stat-label">Vues</div></div></div>'+resaBtn+'</div>';}var cs=document.getElementById('cartHeaderSub');if(cs)cs.textContent=c.nom||'';renderCatalogueGrid(isS,wn);}
function renderCatalogueGrid(isS,wn){var g=document.getElementById('catalogueGrid');if(!g)return;if(!CATALOGUE_PRODUITS||CATALOGUE_PRODUITS.length===0){g.innerHTML='<div style="grid-column:1/-1;text-align:center;padding:60px 20px"><div style="font-size:48px;opacity:.35;margin-bottom:14px">📦</div><h3 style="font-size:17px;font-weight:800;color:var(--text-primary);margin-bottom:6px">Aucun article</h3></div>';return;}var html='';CATALOGUE_PRODUITS.forEach(function(p,idx){var n=String(p.nom||'Sans nom');var pr=Number(p.prix||0);var img=p.img||'';var cat=p.categorie||'';var pl=p.prixLabel||'';var mH=img?'<div class="product-media-3d">'+(cat?'<span class="product-cat-badge">'+esc(cat)+'</span>':'')+'<span class="product-verified"><i class="fa-solid fa-check"></i></span><img src="'+esc(img)+'" alt="" loading="lazy" decoding="async" onerror="this.parentElement.style.display=\'none\'"></div>':'<div class="product-media-3d">'+(cat?'<span class="product-cat-badge">'+esc(cat)+'</span>':'')+'<span class="product-verified"><i class="fa-solid fa-check"></i></span><div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:48px;opacity:.35">📦</div></div>';var aH='';if(isS){aH='<div class="product-actions-3d"><a href="tel:'+wn+'" class="product-call-btn-3d" onclick="event.stopPropagation()"><i class="fa-solid fa-phone"></i> Appeler</a><a href="https://wa.me/'+wn+'" target="_blank" class="product-wa-btn-3d" onclick="event.stopPropagation()"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a></div>';}else{var eN=String(n).replace(/'/g,"\\'").replace(/\\/g,"\\\\");var eI=String(img).replace(/'/g,"\\'").replace(/\\/g,"\\\\");var eC=String(cat).replace(/'/g,"\\'").replace(/\\/g,"\\\\");var eU=String(pl).replace(/'/g,"\\'").replace(/\\/g,"\\\\");aH='<div class="product-actions-3d"><button class="product-add-btn-3d" data-product-name="'+esc(n)+'" onclick="event.stopPropagation();openProductPopup(\''+eN+'\','+pr+',\''+eI+'\',\''+eC+'\',\''+eU+'\')"><i class="fa-solid fa-cart-shopping"></i> Ajouter</button></div>';}html+='<article class="product-3d" data-nom="'+esc(n)+'" data-prix="'+pr+'" data-cat="'+esc(cat)+'">'+mH+'<div class="product-body-3d"><div class="product-name-3d">'+esc(n)+'</div><div class="product-price-3d"><div class="product-price-value">'+pr.toLocaleString('fr-FR')+' <span>FC</span></div>'+(pl?'<div class="product-price-label">'+esc(pl)+'</div>':'')+'</div>'+aH+'</div></article>';});g.innerHTML=html;refreshAddButtons();}
function openProductPopup(n,pr,img,cat,pl){_popupProductName=n;_popupProductPrice=pr;var p=document.getElementById('productPopup');var o=document.getElementById('productPopupOverlay');var ie=document.getElementById('productPopupImage');var ne=document.getElementById('productPopupName');var pe=document.getElementById('productPopupPrice');var ue=document.getElementById('productPopupUnit');var ce=document.getElementById('productPopupCat');if(img){ie.innerHTML='<img src="'+img+'" alt="">';ie.style.display='block';}else{ie.innerHTML='<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:80px;opacity:.35">📦</div>';ie.style.display='block';}ne.textContent=n;pe.textContent=Number(pr).toLocaleString('fr-FR');ue.textContent=pl?('FC '+pl):'FC';if(cat){ce.textContent=cat;ce.style.display='inline-block';}else{ce.style.display='none';}o.classList.add('active');p.classList.add('active');}
function closeProductPopup(){var p=document.getElementById('productPopup');var o=document.getElementById('productPopupOverlay');if(p)p.classList.remove('active');if(o)o.classList.remove('active');_popupProductName=null;_popupProductPrice=0;}
function confirmAddToCartFromPopup(){if(!_popupProductName){showToast('Produit introuvable');return;}var e=cart.find(function(i){return i.name===_popupProductName;});if(e){e.qty++;}else{cart.push({name:_popupProductName,price:_popupProductPrice,qty:1});}updateCart();refreshAddButtons();showToast('✅ Ajouté');closeProductPopup();}
function filtrerCatalogueProduits(){var q=(document.getElementById('catalogueSearchInput')||{}).value||'';q=normaliser(q).trim();var cs=document.querySelectorAll('#catalogueGrid .product-3d');cs.forEach(function(c){var n=normaliser(c.getAttribute('data-nom')||'');var ct=normaliser(c.getAttribute('data-cat')||'');if(!q||n.indexOf(q)!==-1||ct.indexOf(q)!==-1){c.style.display='flex';}else{c.style.display='none';}});}
function trierCatalogue(){var m=['default','prix-asc','prix-desc','nom-asc'];var l={default:'Défaut','prix-asc':'Prix ↑','prix-desc':'Prix ↓','nom-asc':'Nom A→Z'};var i=m.indexOf(CATALOGUE_TRI);i=(i+1)%m.length;CATALOGUE_TRI=m[i];showToast('Tri : '+l[CATALOGUE_TRI]);var ps=CATALOGUE_PRODUITS.slice();if(CATALOGUE_TRI==='prix-asc')ps.sort(function(a,b){return(Number(a.prix)||0)-(Number(b.prix)||0);});else if(CATALOGUE_TRI==='prix-desc')ps.sort(function(a,b){return(Number(b.prix)||0)-(Number(a.prix)||0);});else if(CATALOGUE_TRI==='nom-asc')ps.sort(function(a,b){return String(a.nom||'').localeCompare(String(b.nom||''),'fr');});CATALOGUE_PRODUITS=ps;var isS=CURRENT_COMMERCE&&(CURRENT_COMMERCE.type==='Services / Atelier');var wn=CURRENT_COMMERCE?(CURRENT_COMMERCE.whatsapp||CURRENT_COMMERCE.telephone||'').replace(/[^\d]/g,''):'';renderCatalogueGrid(isS,wn);}

function ouvrirReservation(commerceId){
var c=null;for(var i=0;i<COMMERCES_DATA.length;i++){if(COMMERCES_DATA[i].id===commerceId){c=COMMERCES_DATA[i];break;}}
if(!c){showToast('Commerce introuvable');return;}
requireLogin('réserver',function(){
_resaCommerceId=commerceId;_resaChambreSelectionnee=null;
var nomEl=document.getElementById('reservationCommerceName');
if(nomEl)nomEl.textContent=c.nom||'Hôtel';
var nEl=document.getElementById('resaNom');var pEl=document.getElementById('resaPhone');
if(nEl)nEl.value=(window.CURRENT_ACCOUNT&&window.CURRENT_ACCOUNT.name)?window.CURRENT_ACCOUNT.name:'';
if(pEl&&window.CURRENT_ACCOUNT&&window.CURRENT_ACCOUNT.phone){var digits=String(window.CURRENT_ACCOUNT.phone).replace(/[^\d]/g,'');if(digits.length>9&&digits.indexOf('243')===0)digits=digits.substring(3);while(digits.length>0&&digits.charAt(0)==='0')digits=digits.substring(1);pEl.value=digits.slice(0,9);}
var today=new Date();var tomorrow=new Date(Date.now()+86400000);
var dArr=document.getElementById('resaDateArrivee');var dDep=document.getElementById('resaDateDepart');
if(dArr)dArr.value=today.toISOString().split('T')[0];
if(dDep)dDep.value=tomorrow.toISOString().split('T')[0];
var ch=document.getElementById('resaChambres');if(ch)ch.value='1';
var pe=document.getElementById('resaPersonnes');if(pe)pe.value='2';
var nu=document.getElementById('resaNuits');if(nu)nu.value='1';
var no=document.getElementById('resaNotes');if(no)no.value='';
renderChambresResa(c);
var o=document.getElementById('reservationOverlay');var m=document.getElementById('reservationModal');
if(o){o.style.opacity='1';o.style.pointerEvents='auto';}
if(m){m.style.transform='translateY(0)';m.classList.add('active');}
document.body.style.overflow='hidden';
});
}
function renderChambresResa(c){
var cont=document.getElementById('resaChambresListe');if(!cont)return;
var chambres=Array.isArray(c.chambres)?c.chambres:[];
if(chambres.length===0){
cont.innerHTML='<div style="padding:20px;background:#fffbeb;border:1.5px solid #fcd34d;border-radius:12px;text-align:center;color:#78350f;font-size:13.5px;line-height:1.55"><strong>Aucune chambre configurée</strong><br>Contactez l\'hôtel directement sur WhatsApp.</div>';
var tw=document.getElementById('resaTotalBoxWrap');if(tw)tw.style.display='none';
return;
}
var html='';
chambres.forEach(function(ch){
var dispo=(ch.dispo===undefined||ch.dispo===true);
html+='<div class="resa-chambre-card'+(ch.dispo===false?'" style="opacity:.5;pointer-events:none"':'"')+'" data-chambre-id="'+esc(ch.id||'')+'" onclick="selectionnerChambreResa(\''+esc(ch.id||'')+'\')">'
+'<div class="resa-chambre-img">'+(ch.img?'<img src="'+esc(ch.img)+'" alt="" loading="lazy" onerror="this.parentElement.innerHTML=\'🛏️\'">':'🛏️')+'</div>'
+'<div class="resa-chambre-info">'
+'<div class="resa-chambre-nom">'+esc(ch.nom||'Chambre')+'</div>'
+(ch.desc?'<div class="resa-chambre-desc">'+esc(ch.desc)+'</div>':'')
+'<div class="resa-chambre-meta">'
+'<span class="resa-chambre-prix">'+Number(ch.prix||0).toLocaleString('fr-FR')+' FC/nuit</span>'
+(ch.capacite?'<span class="resa-chambre-cap">• '+esc(String(ch.capacite))+' pers.</span>':'')
+'</div>'
+'</div>'
+'<div class="resa-chambre-radio"></div>'
+'</div>';
});
cont.innerHTML=html;
var tw=document.getElementById('resaTotalBoxWrap');if(tw)tw.style.display='none';
}
function selectionnerChambreResa(chambreId){
if(!_resaCommerceId)return;
var c=COMMERCES_DATA.find(function(x){return x.id===_resaCommerceId;});
if(!c)return;
var ch=null;for(var i=0;i<(c.chambres||[]).length;i++){if(c.chambres[i].id===chambreId){ch=c.chambres[i];break;}}
if(!ch)return;
if(ch.dispo===false){showToast('Chambre indisponible');return;}
_resaChambreSelectionnee=ch;
document.querySelectorAll('.resa-chambre-card').forEach(function(card){card.classList.remove('selected');});
var target=document.querySelector('.resa-chambre-card[data-chambre-id="'+chambreId+'"]');
if(target)target.classList.add('selected');
mettreAJourTotalResa();
}
function mettreAJourTotalResa(){
var wrap=document.getElementById('resaTotalBoxWrap');
var val=document.getElementById('resaTotalValue');
if(!_resaChambreSelectionnee){if(wrap)wrap.style.display='none';return;}
var nuits=parseInt((document.getElementById('resaNuits')||{}).value||'1',10);
if(!nuits||nuits<1)nuits=1;
var total=(Number(_resaChambreSelectionnee.prix)||0)*nuits;
if(wrap)wrap.style.display='block';
if(val)val.textContent=total.toLocaleString('fr-FR')+' FC ('+nuits+' nuit'+(nuits>1?'s':'')+')';
}
function fermerReservation(){
var o=document.getElementById('reservationOverlay');
var m=document.getElementById('reservationModal');
if(o){o.style.opacity='0';o.style.pointerEvents='none';}
if(m){m.style.transform='translateY(100%)';m.classList.remove('active');}
document.body.style.overflow='';
_resaChambreSelectionnee=null;
}
function validerReservation(){
if(!_resaCommerceId){showToast('Commerce introuvable');return;}
var c=COMMERCES_DATA.find(function(x){return x.id===_resaCommerceId;});
if(!c){showToast('Commerce introuvable');return;}
var nom=(document.getElementById('resaNom')||{}).value||'';
var phoneRaw=(document.getElementById('resaPhone')||{}).value||'';
var dArr=(document.getElementById('resaDateArrivee')||{}).value||'';
var dDep=(document.getElementById('resaDateDepart')||{}).value||'';
var chambresNb=(document.getElementById('resaChambres')||{}).value||'1';
var personnes=(document.getElementById('resaPersonnes')||{}).value||'1';
var nuits=(document.getElementById('resaNuits')||{}).value||'1';
var notes=(document.getElementById('resaNotes')||{}).value||'';
if(!nom.trim()){showToast('Saisissez votre nom');return;}
if(!isValidePhone243(phoneRaw)){showToast('Numéro WhatsApp invalide');return;}
if(!dArr||!dDep){showToast('Dates requises');return;}
if(new Date(dDep)<=new Date(dArr)){showToast('La date de départ doit être après l\'arrivée');return;}
if(!nuits||parseInt(nuits,10)<1){showToast('Nombre de nuits invalide');return;}
var tel=String(c.whatsapp||c.whatsappCommercial||c.telephone||'').replace(/[^\d]/g,'');
if(!tel){showToast('Numéro du commerce indisponible');return;}
var phone=formatPhone243(phoneRaw);
var fmtDate=function(s){try{var d=new Date(s);return d.toLocaleDateString('fr-FR',{day:'2-digit',month:'long',year:'numeric'});}catch(e){return s;}};
var msg='*NeTubeX RDC*%0A%0A🏨 *DEMANDE DE RÉSERVATION*%0A%0A';
msg+='🏪 *Commerce :* '+encodeURIComponent(c.nom||'')+'%0A';
msg+='📍 *Ville :* '+encodeURIComponent((c.ville||'')+(c.quartier?' · '+c.quartier:''))+'%0A%0A';
if(_resaChambreSelectionnee){
msg+='🛏 *Chambre choisie :*%0A';
msg+='• '+encodeURIComponent(_resaChambreSelectionnee.nom||'')+'%0A';
if(_resaChambreSelectionnee.desc)msg+='• '+encodeURIComponent(_resaChambreSelectionnee.desc)+'%0A';
if(_resaChambreSelectionnee.capacite)msg+='• Capacité : '+encodeURIComponent(String(_resaChambreSelectionnee.capacite))+' personne(s)%0A';
msg+='• Prix : '+encodeURIComponent(Number(_resaChambreSelectionnee.prix||0).toLocaleString('fr-FR'))+' FC/nuit%0A%0A';
}else{
msg+='⚠️ *Aucune chambre sélectionnée* (l\'hôtel n\'a pas configuré ses chambres).%0A%0A';
}
msg+='👤 *Client :*%0A';
msg+='• Nom : '+encodeURIComponent(nom.trim())+'%0A';
msg+='• WhatsApp : '+encodeURIComponent(phone)+'%0A%0A';
msg+='📅 *Séjour :*%0A';
msg+='• Arrivée : '+encodeURIComponent(fmtDate(dArr))+'%0A';
msg+='• Départ : '+encodeURIComponent(fmtDate(dDep))+'%0A';
msg+='• Nuits : '+encodeURIComponent(nuits)+'%0A%0A';
msg+='🛏 *Réservation :*%0A';
msg+='• Chambres : '+encodeURIComponent(chambresNb)+'%0A';
msg+='• Personnes : '+encodeURIComponent(personnes)+'%0A';
if(_resaChambreSelectionnee){
var total=(Number(_resaChambreSelectionnee.prix)||0)*parseInt(nuits,10);
msg+='%0A💰 *Estimation : '+encodeURIComponent(total.toLocaleString('fr-FR'))+' FC* ('+encodeURIComponent(nuits)+' × '+encodeURIComponent(Number(_resaChambreSelectionnee.prix||0).toLocaleString('fr-FR'))+' FC)%0A';
}
if(notes.trim())msg+='%0A📝 *Demandes :*%0A'+encodeURIComponent(notes.trim())+'%0A';
msg+='%0A✅ Merci de me confirmer la disponibilité.%0A_NeTubeX RDC_';
afficherPopupWhatsApp(msg, tel);
fermerReservation();
}

async function openDetail(oD){requireLogin('détails',async function(){if(oD&&CAT_JOB.indexOf(normCat(oD.cat))!==-1){return;}CURRENT_OFFRE=oD;if(oD&&(oD.annonceId||oD.id)){incrementerVuesAnnonce(oD.annonceId||oD.id,oD.publieurUid);}await renderDetail(oD);go('detail');});}
async function renderDetail(o){if(!o){showToast('Introuvable');go('index');return;}var hi=document.getElementById('detailHeroImg');if(hi){if(o.img){hi.src=o.img;hi.style.display='block';}else hi.style.display='none';}var hb=document.getElementById('detailHeroBadge');if(hb){hb.textContent=o.tag||'—';hb.className='feed-badge '+(o.tagClass||'post-tag-autre');}var ce=document.getElementById('detailCity');if(ce)ce.textContent=o.location||'—';var de=document.getElementById('detailDate');if(de)de.textContent=o.dateCreation?tempsRelatif(o.dateCreation):(o.time||'Récemment');var te=document.getElementById('detailTitle');if(te)te.textContent=o.title||'—';var pl=document.getElementById('detailPriceLabel');var pv=document.getElementById('detailPriceValue');var pb=document.getElementById('detailPriceBox');if(o.price&&pv){var parts=String(o.price).split(':');if(pl)pl.textContent=parts.length>1?parts[0].trim():'Prix';if(pv)pv.textContent=parts.length>1?parts[1].trim():o.price;if(pb)pb.style.display='flex';}else if(pb)pb.style.display='none';var dEl=document.getElementById('detailDescription');if(dEl)dEl.textContent=nettoyerTexte(o.desc)||'—';var os=document.getElementById('detailOrganisationSection');if(os){os.style.display='block';var on=document.getElementById('detailOrgName');var ol=document.getElementById('detailOrgLocation');var oa=document.getElementById('detailOrgAvatar');if(on)on.innerHTML=(o.name||'Utilisateur NeTubeX')+getVerifiedBadgeHTML(o)+getJobBadgeHTML(o);if(ol)ol.textContent=o.location||'';if(oa){if(o.avatar||o.img){oa.innerHTML='<img src="'+(o.avatar||o.img)+'" alt="">';}else{oa.textContent='👤';}}}var aId=o.annonceId||o.id||null;var dv=trouverDeblocagePourAnnonce(aId);var cs=document.getElementById('detailContactSection');var csx=document.getElementById('detailContactSexe');var co=document.getElementById('detailContactOwner');var ca=document.getElementById('detailContactAddr');var cp=document.getElementById('detailContactPhone');var ae=document.getElementById('detailActions');var oc=document.getElementById('coordonneesCacheesCard');if(oc)oc.remove();if(!dv){if(cs)cs.style.display='none';if(o.unlock){var cc=document.createElement('div');cc.id='coordonneesCacheesCard';cc.className='detail-section';cc.innerHTML='<h3 class="detail-section-title"><i class="fa-solid fa-lock"></i> Coordonnées du publieur</h3><div style="display:flex;flex-direction:column;gap:12px;position:relative"><div style="padding:14px;background:var(--bg-card-soft);border-radius:14px;filter:blur(7px);pointer-events:none;font-size:16px;font-weight:800">Homme</div><div style="padding:14px;background:var(--bg-card-soft);border-radius:14px;filter:blur(7px);pointer-events:none;font-size:16px;font-weight:800">Jean Kabila</div><div style="padding:14px;background:var(--bg-card-soft);border-radius:14px;filter:blur(7px);pointer-events:none;font-size:16px;font-weight:800">Av. de la Paix N° 45</div><div style="padding:14px;background:var(--bg-card-soft);border-radius:14px;filter:blur(7px);pointer-events:none;font-size:16px;font-weight:800">+243 97 000 00 00</div><div style="position:absolute;inset:0;background:rgba(15,23,42,.7);border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;padding:20px"><div style="width:64px;height:64px;border-radius:50%;background:#0055ff;display:flex;align-items:center;justify-content:center;font-size:28px;color:#fff"><i class="fa-solid fa-lock"></i></div><div style="font-size:16px;font-weight:900;color:#fff;text-align:center">Coordonnées verrouillées</div><div style="font-size:14px;color:rgba(255,255,255,.85);text-align:center">Débloquez pour voir</div></div></div>';var oi=document.getElementById('detailOrganisationSection');if(oi&&oi.parentNode){oi.parentNode.insertBefore(cc,oi.nextSibling);}}if(ae){ae.innerHTML='';if(o.unlock){var den=DEBLOCAGES_MEMORY.find(function(d){return d.annonceId===aId&&d.statut==='en_attente';});var ncd=normCat(o.cat);var fd=CAT_IMMO.indexOf(ncd)!==-1?1000:400;if(den){ae.innerHTML='<button class="detail-primary-btn gold" disabled><i class="fa-solid fa-hourglass-half"></i> En attente</button>';}else{ae.innerHTML='<button class="detail-primary-btn gold" onclick="openUnlock()"><i class="fa-solid fa-key"></i> Débloquer — '+fd.toLocaleString('fr-FR')+' FC</button>';}}}}else{var coo=dv.coordonnees;if(cs)cs.style.display='block';var sp=o.publieurSexe||'';var st='—';if(sp==='homme')st='Homme';else if(sp==='femme')st='Femme';if(csx)csx.textContent=st;if(co)co.textContent=(coo&&coo.nom)||o.name||'Propriétaire';if(ca)ca.textContent=(coo&&coo.adresse)||'—';if(cp)cp.textContent=(coo&&coo.telephone)||'—';if(ae){var tc=((coo&&coo.telephone)||'').replace(/[^\d]/g,'');if(tc){ae.innerHTML='<div style="padding:12px 14px;background:#ecfdf5;border:1.5px solid #a7f3d0;border-radius:12px;margin-bottom:10px;display:flex;align-items:center;gap:10px"><i class="fa-solid fa-circle-check" style="color:#059669;font-size:18px"></i><div style="flex:1;min-width:0"><div style="font-size:14px;font-weight:900;color:#065f46">Coordonnées débloquées</div><div style="font-size:12.5px;color:#047857;margin-top:2px">Valable 12h</div></div></div><div style="display:flex;gap:10px"><a href="tel:+'+tc+'" class="detail-primary-btn green" style="flex:1;text-decoration:none"><i class="fa-solid fa-phone"></i> Appeler</a><a href="https://wa.me/'+tc+'" target="_blank" class="detail-primary-btn" style="flex:1;background:#10b981;color:#fff;text-decoration:none"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a></div>';}}}var re=document.getElementById('detailRefValue');if(re&&o){var cc2='GEN';var ncr=normCat(o.cat);if(CAT_JOB.indexOf(ncr)!==-1)cc2='JOB';else if(CAT_IMMO_LOC.indexOf(ncr)!==-1)cc2='LOC';else if(CAT_IMMO_PAR.indexOf(ncr)!==-1)cc2='PARC';else if(ncr==='autre')cc2='SRV';var str=String((o.title||'')+(o.name||''));var h=0;for(var i=0;i<str.length;i++){h=((h<<5)-h)+str.charCodeAt(i);h|=0;}var n=String(Math.abs(h)%10000).padStart(4,'0');re.textContent='NTX-'+cc2+'-'+n;}}
async function sharePost(){var o=CURRENT_OFFRE;if(!o){showToast('Aucune annonce');return;}requireLogin('partager',async function(){var cp=(window.CURRENT_ACCOUNT.parrainage&&window.CURRENT_ACCOUNT.parrainage.code)?window.CURRENT_ACCOUNT.parrainage.code:'NTX-'+window.CURRENT_ACCOUNT.id.slice(0,6).toUpperCase();var lp='https://www.netubex.com/rdc?ref='+cp;var t=o.title||'Annonce NeTubeX';var msg='🔥 *'+t+'*\n\n📍 '+(o.location||'')+'\n💰 '+(o.price||'')+'\n\n👀 Voir sur *NeTubeX RDC* :\n'+lp;if(navigator.share){try{await navigator.share({title:t,text:msg,url:lp});return;}catch(err){if(err.name==='AbortError')return;}}window.open('https://wa.me/?text='+encodeURIComponent(msg),'_blank');});}
async function sharePostFromFeed(o){if(!o)return;requireLogin('partager',async function(){var s=CURRENT_OFFRE;CURRENT_OFFRE=o;try{await sharePost();}finally{CURRENT_OFFRE=s;}});}
function genererCodeCommande(commerceId,clientTel){var ts=Date.now().toString(36).toUpperCase();var hc=0;var sc=String(commerceId||'X');for(var i=0;i<sc.length;i++){hc=((hc<<5)-hc)+sc.charCodeAt(i);hc|=0;}var hcl=0;var scl=String(clientTel||'0');for(var j=0;j<scl.length;j++){hcl=((hcl<<5)-hcl)+scl.charCodeAt(j);hcl|=0;}var m=(Math.abs(hc)%1000).toString(36).toUpperCase().padStart(2,'0');var m2=(Math.abs(hcl)%1000).toString(36).toUpperCase().padStart(2,'0');var cr=Math.random().toString(36).slice(2,5).toUpperCase();return'NTX-'+ts.slice(-4)+m.slice(-2)+m2.slice(-2)+cr;}
function genererEtAfficherCodeCommande(){var ce=document.getElementById('cartOrderCode');if(!ce)return;var tel=(document.getElementById('client-tel')||{}).value||'0';var cId=CURRENT_COMMERCE?CURRENT_COMMERCE.id:'X';CURRENT_ORDER_CODE=genererCodeCommande(cId,tel);ce.textContent=CURRENT_ORDER_CODE;}
function cartGoToPage(n){CART_PAGE=n;document.querySelectorAll('.cart-page').forEach(function(p){p.classList.remove('active');});var t=document.querySelector('.cart-page[data-cart-page="'+n+'"]');if(t)t.classList.add('active');document.querySelectorAll('.cart-pager-dot').forEach(function(d){d.classList.remove('active');});document.querySelectorAll('.cart-pager-dot[data-dot="'+n+'"]').forEach(function(d){d.classList.add('active');});var b=document.getElementById('cartInfoBarText');if(b){if(n===1)b.textContent='Étape 1/3 : Vos articles';else if(n===2)b.textContent='Étape 2/3 : Mode';else b.textContent='Étape 3/3 : Coordonnées';}if(n===2||n===3){genererEtAfficherCodeCommande();}}
async function incrementerVuesAnnonce(aId,proprietaireUid){if(!aId||!window.CURRENT_ACCOUNT||!window.CURRENT_ACCOUNT.id)return;var uid=window.CURRENT_ACCOUNT.id;var today=getTodayKey();var key='vues_annonces_'+uid;try{var store=await idbGet('stats',key)||{};if(store[aId]===today)return;var p={};Object.keys(store).forEach(function(k){if(store[k]===today)p[k]=store[k];});p[aId]=today;await idbSet('stats',key,p);var ok=await window.incrementerVuesAnnonceFirestore(aId,proprietaireUid);if(ok){ANNONCES_DATA.forEach(function(a){if(a.annonceId===aId||a.id===aId)a.vues=(a.vues||0)+1;});}}catch(e){}}
async function incrementerVuesBoutique(uid,cId){if(!cId||!window.CURRENT_ACCOUNT||!window.CURRENT_ACCOUNT.id)return;var userId=window.CURRENT_ACCOUNT.id;var key='vues_boutiques_'+userId;var today=getTodayKey();try{var store=await idbGet('stats',key)||{};if(store[cId]===today)return;var p={};Object.keys(store).forEach(function(k){if(store[k]===today)p[k]=store[k];});p[cId]=today;await idbSet('stats',key,p);await window.incrementerVuesCommerceFirestore(cId);}catch(e){}}
function updateCart(){var fb=document.getElementById('cartFloatBadge');var fB=document.getElementById('cartFloatingBtn');var it=document.getElementById('cart-items');var em=document.getElementById('cart-empty');var to=document.getElementById('cart-total');var hs=document.getElementById('cartHeaderSub');var c=cart.reduce(function(s,i){return s+i.qty;},0);if(fb)fb.textContent=c;if(fB){if(c>0&&window.CURRENT_ACCOUNT)fB.classList.remove('hidden');else fB.classList.add('hidden');}if(hs){if(CURRENT_COMMERCE){hs.textContent=(CURRENT_COMMERCE.nom||'Commerce')+' · '+c+' article'+(c>1?'s':'');}else{hs.textContent=c+' article'+(c>1?'s':'');}}if(!it)return;if(c===0){if(em)em.style.display='flex';it.innerHTML='';if(to)to.textContent='0 FC';return;}if(em)em.style.display='none';it.innerHTML=cart.map(function(i,idx){return'<div class="cart-item"><div class="cart-item-thumb">📦</div><div class="cart-item-main"><div class="cart-item-name">'+i.name+'</div><div class="cart-item-price-line">P.U. <strong>'+i.price.toLocaleString('fr-FR')+' FC</strong></div><div class="cart-item-actions"><div class="cart-qty-control"><button class="cart-qty-btn" onclick="changeQty('+idx+',-1)">−</button><span class="cart-qty-value">'+i.qty+'</span><button class="cart-qty-btn" onclick="changeQty('+idx+',1)">+</button></div><div class="cart-item-subtotal">'+(i.price*i.qty).toLocaleString('fr-FR')+' FC</div></div></div><button class="cart-item-remove" onclick="removeItem('+idx+')"><i class="fa-solid fa-xmark"></i></button></div>';}).join('');var t=cart.reduce(function(s,i){return s+i.price*i.qty;},0);if(to)to.textContent=t.toLocaleString('fr-FR')+' FC';}
function refreshAddButtons(){var bs=document.querySelectorAll('[data-product-name]');bs.forEach(function(b){var n=b.getAttribute('data-product-name');var ic=cart.some(function(i){return i.name===n;});if(ic){b.classList.add('added');b.innerHTML='<i class="fa-solid fa-check"></i> Ajouté';b.disabled=true;}else{b.classList.remove('added');b.innerHTML='<i class="fa-solid fa-cart-shopping"></i> Ajouter';b.disabled=false;}});}
function changeQty(i,d){cart[i].qty+=d;if(cart[i].qty<=0){cart.splice(i,1);}updateCart();refreshAddButtons();}
function removeItem(i){cart.splice(i,1);updateCart();refreshAddButtons();}
function getBoutiqueOption(option){if(!CURRENT_COMMERCE)return false;if(option==='retrait'){if(CURRENT_COMMERCE.retraitActif===false)return false;return true;}if(option==='livraison'){if(CURRENT_COMMERCE.livraisonActive===false)return false;return true;}return false;}
function appliquerConfigCommandes(){var btnRetrait=document.getElementById('orderTypeRetrait');var btnLivraison=document.getElementById('orderTypeLivraison');var retraitOk=getBoutiqueOption('retrait');var livraisonOk=getBoutiqueOption('livraison');if(btnRetrait){if(retraitOk){btnRetrait.style.display='';btnRetrait.disabled=false;}else{btnRetrait.style.display='none';btnRetrait.disabled=true;}}if(btnLivraison){if(livraisonOk){btnLivraison.style.display='';btnLivraison.disabled=false;}else{btnLivraison.style.display='none';btnLivraison.disabled=true;}}if(ORDER_TYPE==='livraison'&&!livraisonOk){if(retraitOk)selectOrderType('retrait');}else if(ORDER_TYPE==='retrait'&&!retraitOk){if(livraisonOk)selectOrderType('livraison');}}
function openCart(){requireLogin('panier',function(){appliquerConfigCommandes();if(!getBoutiqueOption('retrait')&&!getBoutiqueOption('livraison')){showToast('Commandes indisponibles pour ce commerce');return;}CART_PAGE=1;cartGoToPage(1);genererEtAfficherCodeCommande();document.getElementById('cart-drawer').classList.add('active');document.getElementById('cart-overlay').classList.add('active');document.body.style.overflow='hidden';});}
function closeCart(){document.getElementById('cart-drawer').classList.remove('active');document.getElementById('cart-overlay').classList.remove('active');document.body.style.overflow='';}
function selectOrderType(t){ORDER_TYPE=t;var br=document.getElementById('orderTypeRetrait');var bl=document.getElementById('orderTypeLivraison');var fl=document.getElementById('orderTypeFieldsLivraison');if(t==='retrait'){if(br)br.classList.add('selected');if(bl)bl.classList.remove('selected');if(fl)fl.classList.remove('visible');}else{if(bl)bl.classList.add('selected');if(br)br.classList.remove('selected');if(fl)fl.classList.add('visible');}}
function submitOrder(){
if(cart.length===0){showToast('Panier vide');return;}
var retraitOk=getBoutiqueOption('retrait');
var livraisonOk=getBoutiqueOption('livraison');
if(!retraitOk&&!livraisonOk){showToast('Commandes indisponibles');return;}
var n=(document.getElementById('client-nom')||{}).value?document.getElementById('client-nom').value.trim():'';
var tRaw=(document.getElementById('client-tel')||{}).value?document.getElementById('client-tel').value.trim():'';
var al=(document.getElementById('client-adresse-livraison')||{}).value?document.getElementById('client-adresse-livraison').value.trim():'';
var ql=(document.getElementById('client-quartier-livraison')||{}).value?document.getElementById('client-quartier-livraison').value.trim():'';
if(!n||!tRaw){showToast('Remplissez nom et téléphone');return;}
if(!isValidePhone243(tRaw)){showToast('Numéro invalide');return;}
if(ORDER_TYPE==='livraison'&&!livraisonOk){showToast('Livraison indisponible pour ce commerce');return;}
if(ORDER_TYPE==='retrait'&&!retraitOk){showToast('Retrait indisponible pour ce commerce');return;}
if(ORDER_TYPE==='livraison'&&(!al||!ql)){showToast('Remplissez adresse et quartier');return;}
var t=formatPhone243(tRaw);
requireLogin('commander',function(){
var wc='243857525821';
if(CURRENT_COMMERCE){var w=CURRENT_COMMERCE.whatsapp||CURRENT_COMMERCE.whatsappCommercial||CURRENT_COMMERCE.telephone||'';if(w)wc=w.replace(/[^\d]/g,'');}
var cc=CURRENT_ORDER_CODE||genererCodeCommande(CURRENT_COMMERCE?CURRENT_COMMERCE.id:'X',t);
var msg='*NeTubeX RDC*%0A%0A🛒 *NOUVELLE COMMANDE*%0A%0A🎫 *CODE : '+cc+'*%0A%0A🏪 *Commerçant :* '+(CURRENT_COMMERCE?(CURRENT_COMMERCE.nom||''):'—')+'%0A'+(ORDER_TYPE==='livraison'?'🚚 *LIVRAISON*':'🏪 *RETRAIT*')+'%0A%0A📋 *ARTICLES :*%0A%0A';
cart.forEach(function(i,idx){msg+='*'+(idx+1)+'. '+i.name+'*%0A   • Qté : '+i.qty+'%0A   • PU : '+i.price.toLocaleString('fr-FR')+' FC%0A   • Sous-total : '+(i.price*i.qty).toLocaleString('fr-FR')+' FC%0A%0A';});
var tot=cart.reduce(function(s,i){return s+i.price*i.qty;},0);
msg+='💰 *TOTAL : '+tot.toLocaleString('fr-FR')+' FC*%0A%0A👤 *CLIENT :*%0A   • Nom : '+n+'%0A   • Téléphone : '+t+'%0A';
if(ORDER_TYPE==='livraison'){msg+='%0A📍 *LIVRAISON :*%0A   • Adresse : '+al+'%0A   • Quartier : '+ql+'%0A';}
msg+='%0A✅ Merci de confirmer.%0A_NeTubeX RDC_';
afficherPopupWhatsApp(msg, wc);
closeCart();
cart=[];
updateCart();
refreshAddButtons();
});
}
function openUnlock(){if(!CURRENT_OFFRE)return;var aId=CURRENT_OFFRE.annonceId||CURRENT_OFFRE.id;if(!aId){showToast('Annonce introuvable');return;}var ncu=normCat(CURRENT_OFFRE.cat);var f=CAT_IMMO.indexOf(ncu)!==-1?1000:400;var me=document.getElementById('unlockMontant');var mi=document.getElementById('unlockMontantInline');if(me)me.textContent=f.toLocaleString('fr-FR')+' FC';if(mi)mi.textContent=f.toLocaleString('fr-FR')+' FC';window._pendingDeblocageMontant=f;document.getElementById('unlock-modal').style.display='flex';attacherTousPhones();var de=DEBLOCAGES_MEMORY.find(function(d){return d.annonceId===aId&&(d.statut==='en_attente'||d.statut==='debloque');});if(de){document.getElementById('unlock-modal').style.display='none';if(de.statut==='en_attente'){showToast('Demande en cours');}else{showToast('Déjà débloqué');}}}
function annulerDeblocage(){document.getElementById('unlock-modal').style.display='none';var t=document.getElementById('unlockTxId');var n=document.getElementById('unlockNumEnvoi');if(t)t.value='';if(n)n.value='';showToast('Annulé');}
function fermerDeblocageModalSilencieux(){document.getElementById('unlock-modal').style.display='none';var t=document.getElementById('unlockTxId');var n=document.getElementById('unlockNumEnvoi');if(t)t.value='';if(n)n.value='';}
async function validerDeblocage(){if(!CURRENT_OFFRE){showToast('Introuvable');return;}if(!window.CURRENT_ACCOUNT){showToast('Connectez-vous');return;}var aId=CURRENT_OFFRE.annonceId||CURRENT_OFFRE.id||('LOCAL-'+Date.now());var tx=(document.getElementById('unlockTxId')||{}).value?document.getElementById('unlockTxId').value.trim():'';var neRaw=(document.getElementById('unlockNumEnvoi')||{}).value?document.getElementById('unlockNumEnvoi').value.trim():'';if(!tx||tx.length<6){showToast('ID Transaction invalide');return;}if(!isValidePhone243(neRaw)){showToast('Numéro invalide');return;}var ne=formatPhone243(neRaw);var f=window._pendingDeblocageMontant||400;var sb=document.querySelector('#unlock-modal button[type="submit"]');if(sb){sb.disabled=true;sb.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Envoi…';}try{await window.creerDeblocage(window.CURRENT_ACCOUNT.id,aId,tx,f,ne);DEBLOCAGES_DIRTY=true;fermerDeblocageModalSilencieux();document.getElementById('deblocagePendingOverlay').classList.add('active');document.getElementById('deblocagePendingModal').classList.add('active');await rafraichirTousDeblocages();}catch(err){showToast('Erreur');}finally{if(sb){sb.disabled=false;sb.innerHTML='<i class="fa-solid fa-paper-plane"></i> Envoyer';}}}
function annulerPaiementPublication(){document.getElementById('paiementModal').style.display='none';window._pendingPublishData=null;showToast('Annulé');}
function fermerPaiementModalSilencieux(){document.getElementById('paiementModal').style.display='none';}
function closeDeblocagePending(){document.getElementById('deblocagePendingOverlay').classList.remove('active');document.getElementById('deblocagePendingModal').classList.remove('active');}
function closeBoutiquePending(){document.getElementById('boutiquePendingOverlay').classList.remove('active');document.getElementById('boutiquePendingModal').classList.remove('active');var p=document.getElementById('page-inscription');if(p&&p.classList.contains('active')){go('index');}}
function signalerOffre(){requireLogin('signaler',function(){var o=CURRENT_OFFRE;if(!o){showToast('Introuvable');return;}var re=document.getElementById('detailRefValue');var r=re?re.textContent:'NTX-GEN-0000';document.getElementById('supportRef').value=r;document.getElementById('supportSujet').value="Signaler : "+(o.title||'');document.getElementById('supportDesc').value="Référence : "+r+"\nTitre : "+(o.title||'');document.getElementById('supportRaison').value='';go('support');});}
function submitSignalement(){
var ra=(document.getElementById('supportRaison')||{}).value||'';
var su=(document.getElementById('supportSujet')||{}).value||'';
var re=(document.getElementById('supportRef')||{}).value||'—';
if(!ra.trim()){showToast('Décrivez la raison');return;}
var nu=window.CURRENT_ACCOUNT?(window.CURRENT_ACCOUNT.name||'Utilisateur'):'Utilisateur';
var pu=window.CURRENT_ACCOUNT?(window.CURRENT_ACCOUNT.phone||'—'):'—';
var ta=su.replace("Signaler : ","");
var msg='*NeTubeX RDC*%0A%0A🚩 *SIGNALEMENT*%0A%0A*Référence :* '+re+'%0A*Titre :* '+encodeURIComponent(ta)+'%0A%0A*Par :* '+encodeURIComponent(nu)+'%0A*WhatsApp :* '+encodeURIComponent(pu)+'%0A%0A*Motif :*%0A'+encodeURIComponent(ra);
afficherPopupWhatsApp(msg, '243857525821');
}
async function submitInscriptionBoutique(){
var n=(document.getElementById('inscNom')||{}).value?document.getElementById('inscNom').value.trim():'';
var tRaw=(document.getElementById('inscTelephone')||{}).value?document.getElementById('inscTelephone').value.trim():'';
var wcRaw=(document.getElementById('inscWhatsappCommercial')||{}).value?document.getElementById('inscWhatsappCommercial').value.trim():'';
var nc=(document.getElementById('inscNomCommerce')||{}).value?document.getElementById('inscNomCommerce').value.trim():'';
var ty=(document.getElementById('inscType')||{}).value||'';
var v=getVilleValue('inscVille','inscVilleLibre');
var q=(document.getElementById('inscQuartier')||{}).value?document.getElementById('inscQuartier').value.trim():'';
var a=(document.getElementById('inscAdresse')||{}).value?document.getElementById('inscAdresse').value.trim():'';
var h=(document.getElementById('inscHoraires')||{}).value?document.getElementById('inscHoraires').value.trim():'';
var d=(document.getElementById('inscDescription')||{}).value?document.getElementById('inscDescription').value.trim():'';
d=nettoyerTextePourSaisie(d);
if(!n||!tRaw||!wcRaw||!nc||!ty||!v||!q){showToast('Remplissez les champs');return;}
if(!isValidePhone243(tRaw)){showToast('Téléphone invalide');return;}
if(!isValidePhone243(wcRaw)){showToast('WhatsApp invalide');return;}
var t=formatPhone243(tRaw);
var wc=formatPhone243(wcRaw);
var b=document.getElementById('inscSubmitBtn');
if(b){b.disabled=true;b.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i> Envoi…';}
try{
var da={nom:n,telephone:t,whatsappCommercial:wc,nomCommerce:nc,type:ty,ville:v,quartier:q,adresse:a,horaires:h,description:d,uid:window.CURRENT_ACCOUNT?window.CURRENT_ACCOUNT.id:null};
await window.creerDemandeBoutique(da);
var msg='*NeTubeX RDC*%0A%0A🏪 *DEMANDE COMMERCE*%0A%0A👤 *CONTACT*%0A• Nom : '+encodeURIComponent(n)+'%0A• Tél : '+encodeURIComponent(t)+'%0A• WhatsApp : '+encodeURIComponent(wc)+'%0A%0A🏬 *COMMERCE*%0A• Nom : '+encodeURIComponent(nc)+'%0A• Type : '+encodeURIComponent(ty)+'%0A• Ville : '+encodeURIComponent(v)+'%0A• Quartier : '+encodeURIComponent(q)+(a?'%0A• Adresse : '+encodeURIComponent(a):'')+(h?'%0A• Horaires : '+encodeURIComponent(h):'')+(d?'%0A%0A📝 '+encodeURIComponent(d):'');
afficherPopupWhatsApp(msg, '243857525821');
var f=document.getElementById('inscriptionForm');
if(f)f.reset();
inscShowStep(1);
document.getElementById('boutiquePendingOverlay').classList.add('active');
document.getElementById('boutiquePendingModal').classList.add('active');
}catch(err){showToast('Erreur');}
finally{if(b){b.disabled=false;b.innerHTML='<i class="fa-solid fa-paper-plane"></i> Envoyer';}}
}
function inscUpdateProgress(s){document.querySelectorAll('.insc-step-circle').forEach(function(d){var v=parseInt(d.getAttribute('data-circle'),10);if(v<s){d.classList.add('done');d.classList.remove('active');}else if(v===s){d.classList.add('active');d.classList.remove('done');}else{d.classList.remove('active');d.classList.remove('done');}});}
function inscShowStep(s){document.querySelectorAll('.insc-step').forEach(function(e){e.style.display=(parseInt(e.getAttribute('data-step'),10)===s)?'block':'none';});inscUpdateProgress(s);window.scrollTo({top:0,behavior:'smooth'});}
function inscNextStep(c){var e=[];if(c===1){if(!(document.getElementById('inscNom')||{}).value||!document.getElementById('inscNom').value.trim())e.push('Nom');if(!(document.getElementById('inscTelephone')||{}).value||!document.getElementById('inscTelephone').value.trim())e.push('Téléphone');if(!(document.getElementById('inscWhatsappCommercial')||{}).value||!document.getElementById('inscWhatsappCommercial').value.trim())e.push('WhatsApp');if(e.length){showToast('Remplissez : '+e.join(', '));return;}}if(c===2){if(!(document.getElementById('inscNomCommerce')||{}).value||!document.getElementById('inscNomCommerce').value.trim())e.push('Nom commerce');if(!(document.getElementById('inscType')||{}).value)e.push('Type');if(!(document.getElementById('inscVille')||{}).value)e.push('Ville');if(!(document.getElementById('inscQuartier')||{}).value||!document.getElementById('inscQuartier').value.trim())e.push('Quartier');if(e.length){showToast('Remplissez : '+e.join(', '));return;}}inscShowStep(c+1);}
function inscPrevStep(c){inscShowStep(c-1);}
function toggleInscVilleLibre(){var s=document.getElementById('inscVille');var i=document.getElementById('inscVilleLibre');if(!s||!i)return;if(s.value==='autre'){i.style.display='block';i.required=true;}else{i.style.display='none';i.required=false;i.value='';}}
function togglePublishVilleLibre(){var s=document.getElementById('publishVille');var i=document.getElementById('publishVilleLibre');if(!s||!i)return;if(s.value==='autre'){i.style.display='block';i.required=true;}else{i.style.display='none';i.required=false;i.value='';}}
function getVilleValue(s,i){var se=document.getElementById(s);var ie=document.getElementById(i);if(!se)return'';if(se.value==='autre')return ie?ie.value.trim():'';return se.value;}
function toggleImmoSelect(){var s=document.getElementById('immoSelect');if(s)s.classList.toggle('open');}
function selectImmoOption(v,e){document.querySelectorAll('#immoSelectMenu .custom-select-option').forEach(function(o){o.classList.remove('selected');});e.classList.add('selected');var em=e.querySelector('.cs-emoji').textContent;var la=e.querySelector('.cs-label').textContent;document.getElementById('immoSelectValue').innerHTML='<span class="custom-select-icon">'+em+'</span><span>'+la+'</span>';document.getElementById('immoSelect').classList.remove('open');SOUS_TYPE_IMMO=v;publishCat=(v==='parcelle')?'parcelle':'location';updatePublishFormForCategory();}
function selectJobContract(t){jobContract=t;var cdi=document.getElementById('jobTypeCDI');var cdd=document.getElementById('jobTypeCDD');if(t==='cdi'){cdi.style.background='#0055ff';cdi.style.color='#fff';cdi.style.borderColor='#0055ff';cdd.style.background='var(--bg-card-soft)';cdd.style.color='var(--text-secondary)';cdd.style.borderColor='var(--border-primary)';}else{cdd.style.background='#0055ff';cdd.style.color='#fff';cdd.style.borderColor='#0055ff';cdi.style.background='var(--bg-card-soft)';cdi.style.color='var(--text-secondary)';cdi.style.borderColor='var(--border-primary)';}}
function ouvrirPublishPourCategorie(cat){publishCat=null;publishImages=[];jobContract=null;SOUS_TYPE_IMMO=null;['typeBlockImmo','typeBlockJob','typeBlockAutre'].forEach(function(id){var el=document.getElementById(id);if(el)el.style.display='none';});if(cat==='immobilier'){document.getElementById('typeBlockImmo').style.display='block';document.getElementById('immoSelectValue').innerHTML='<span class="custom-select-icon">📋</span><span>— Choisir —</span>';document.querySelectorAll('#immoSelectMenu .custom-select-option').forEach(function(o){o.classList.remove('selected');});}else if(cat==='jobs'){document.getElementById('typeBlockJob').style.display='block';publishCat='job';document.getElementById('jobTypeCDI').style.background='var(--bg-card-soft)';document.getElementById('jobTypeCDI').style.color='var(--text-secondary)';document.getElementById('jobTypeCDD').style.background='var(--bg-card-soft)';document.getElementById('jobTypeCDD').style.color='var(--text-secondary)';}else{document.getElementById('typeBlockAutre').style.display='block';publishCat='autre';}updatePublishFormForCategory();}
function updatePublishFormForCategory(){var is=document.getElementById('publishImagesSection');var pa=document.getElementById('publishPricingAmount');var hint=document.getElementById('publishPricingHint');if(!publishCat){if(is)is.style.display='none';if(pa)pa.textContent='—';return;}var ei=(publishCat==='parcelle'||publishCat==='location');var m=ei?'1 000 FC':'400 FC';if(pa)pa.textContent=m;if(hint)hint.textContent=publishCat==='job'?"Offre d'emploi":(ei?'Immobilier':'Autres');if(is)is.style.display='block';}
function handlePublishImages(e){var fs=Array.from(e.target.files||[]);var r=MAX_PUBLISH_IMAGES-publishImages.length;if(r<=0){showToast('Maximum '+MAX_PUBLISH_IMAGES+' photos');e.target.value='';return;}var ta=fs.slice(0,r);ta.forEach(function(f){if(f.size>MAX_IMAGE_SIZE_MB*1024*1024){showToast('Image trop lourde');return;}var re=new FileReader();re.onload=function(ev){publishImages.push({file:f,dataUrl:ev.target.result});renderPublishImages();};re.readAsDataURL(f);});e.target.value='';}
function renderPublishImages(){var p=document.getElementById('publishImagesPreview');var c=document.getElementById('publishImagesCounter');if(!p)return;p.innerHTML='';publishImages.forEach(function(img,idx){var it=document.createElement('div');it.className='publish-image-item';it.innerHTML='<img src="'+img.dataUrl+'" alt=""><button type="button" class="publish-image-remove" onclick="removePublishImage('+idx+')">✕</button>';p.appendChild(it);});if(c){c.textContent=publishImages.length+' photo'+(publishImages.length>1?'s':'');}}
function removePublishImage(i){publishImages.splice(i,1);renderPublishImages();}
async function submitPublish(){if(!publishCat){showToast('Sélectionnez un type');return;}var t=(document.getElementById('publishTitre')||{}).value?document.getElementById('publishTitre').value.trim():'';var v=getVilleValue('publishVille','publishVilleLibre');var p=(document.getElementById('publishPrix')||{}).value?document.getElementById('publishPrix').value.trim():'';var a=(document.getElementById('publishAdresse')||{}).value?document.getElementById('publishAdresse').value.trim():'';var d=(document.getElementById('publishDescription')||{}).value?document.getElementById('publishDescription').value.trim():'';d=nettoyerTextePourSaisie(d);if(!t||!v||!p||!d||!a){showToast('Remplissez tous les champs');return;}var ei=(publishCat==='parcelle'||publishCat==='location');var m=ei?1000:400;var jt=null;if(publishCat==='job'){if(!jobContract){showToast('Choisissez CDI ou CDD');return;}jt=jobContract;}window._pendingMontant=m;window._pendingPublishData={titre:t,desc:d,ville:v,prix:p,adresse:a,cat:publishCat,images:publishImages.slice(),jobType:jt,sousTypeImmo:SOUS_TYPE_IMMO};var me=document.getElementById('paiementMontant');if(me)me.textContent=m.toLocaleString('fr-FR')+' FC';document.getElementById('paiementModal').style.display='flex';attacherTousPhones();}
async function validerPaiementEtPublier(){var tx=(document.getElementById('publishTxId')||{}).value?document.getElementById('publishTxId').value.trim():'';var neRaw=(document.getElementById('publishNumEnvoi')||{}).value?document.getElementById('publishNumEnvoi').value.trim():'';if(!tx||tx.length<6){showToast('ID Transaction invalide');return;}if(!isValidePhone243(neRaw)){showToast('Numéro invalide');return;}var ne=formatPhone243(neRaw);var d=window._pendingPublishData;if(!d){showToast('Données perdues');return;}try{var pn=window.CURRENT_ACCOUNT.name||window.CURRENT_ACCOUNT.nomComplet||'Utilisateur';var tagL='post-tag-'+d.cat;if(d.cat==='job'){tagL='post-tag-job';}var imagesUrl=[];if(d.images&&d.images.length>0){for(var i=0;i<d.images.length;i++){try{var url=await window.uploadImageAnnonce(d.images[i].file);if(url)imagesUrl.push(url);}catch(e){}}}var payload={titre:d.titre,desc:d.desc,ville:d.ville,quartier:'',prix:d.prix,img:imagesUrl.length>0?imagesUrl[0]:'',images:imagesUrl,cat:d.cat,tag:d.cat==='job'?'Emploi':'',tagClass:tagL,proprietaireUid:window.CURRENT_ACCOUNT.id,publieurNom:pn,publieurAvatar:window.CURRENT_ACCOUNT.avatarUrl||'',publieurType:'user',publieurPhone:window.CURRENT_ACCOUNT.phone||'',publieurSexe:window.CURRENT_ACCOUNT.sexe||''};if(d.cat==='job'&&d.jobType){payload.jobType=d.jobType;}if(d.cat==='parcelle'&&d.sousTypeImmo){payload.sousTypeImmo=d.sousTypeImmo;}if(d.cat==='location'&&d.sousTypeImmo){payload.sousTypeImmo=d.sousTypeImmo;}await window.creerAnnonce(payload,{nom:pn,adresse:d.adresse,telephone:window.CURRENT_ACCOUNT.phone||'',email:window.CURRENT_ACCOUNT.emailAuth||''},{transactionId:tx,numeroEnvoi:ne,montant:window._pendingMontant||400,destinataire:'+243976953045'});try{await idbDelete('stats','stats_user_'+window.CURRENT_ACCOUNT.id);}catch(e){}try{await idbDelete('stats','pubs_user_'+window.CURRENT_ACCOUNT.id);}catch(e){}fermerPaiementModalSilencieux();document.getElementById('publishPendingOverlay').classList.add('active');document.getElementById('publishPendingModal').classList.add('active');}catch(e){showToast('Erreur');}}
function closePublishPending(){document.getElementById('publishPendingOverlay').classList.remove('active');document.getElementById('publishPendingModal').classList.remove('active');showToast('Publication enregistrée');setTimeout(function(){go('index');},400);}

async function renderMesStats(){var t=document.getElementById('statTotalVues');var s=document.getElementById('statTotalVuesSub');if(!t)return;if(!window.CURRENT_ACCOUNT||!window.CURRENT_ACCOUNT.id){t.textContent='—';if(s)s.textContent='Connectez-vous';return;}t.textContent='…';if(s)s.textContent='Chargement…';try{var cacheKey='stats_user_'+window.CURRENT_ACCOUNT.id;var cached=await idbGet('stats',cacheKey);var stats;if(cached&&(Date.now()-cached.ts)<120000){stats=cached.data;}else{var snap=await window.getDocRef(window.docRef(window.db,'user_stats',window.CURRENT_ACCOUNT.id));if(!snap.exists()){stats={totalVues:0,nbAnnonces:0};try{await window.setDoc(window.docRef(window.db,'user_stats',window.CURRENT_ACCOUNT.id),{totalVues:0,nbAnnonces:0,nbPubliees:0,nbEnAttente:0,nbRefusees:0,totalDeblocages:0,totalCommerceVues:0,nbProduitsCommerce:0,derniereMiseAJour:new Date().toISOString()});}catch(e){}}else{stats=snap.data();}await idbSet('stats',cacheKey,{data:stats,ts:Date.now()});}t.textContent=(stats.totalVues||0).toLocaleString('fr-FR');if(s){if((stats.nbAnnonces||0)===0)s.textContent='Aucune annonce publiée';else s.textContent='Vues sur '+stats.nbAnnonces+' annonce'+(stats.nbAnnonces>1?'s':'');}var c=await chargerCommerceCommercant();if(c){var st=document.getElementById('statVuesBoutique');var sp=document.getElementById('statNbProduits');var sec=document.getElementById('statsBoutiqueSection');if(sec)sec.style.display='block';if(st)st.textContent=(c.vues||0).toLocaleString('fr-FR');var prods=(c.produits||[]).filter(function(p){return!p.statut||p.statut==='approuve';});if(sp)sp.textContent=prods.length;}}catch(e){t.textContent='0';if(s)s.textContent='Aucune donnée';}}
async function chargerCommerceCommercant(){if(!window.CURRENT_ACCOUNT||!window.CURRENT_ACCOUNT.id)return null;var cacheKey='commerce_user_'+window.CURRENT_ACCOUNT.id;var cached=await idbGet('stats',cacheKey);if(cached&&(Date.now()-cached.ts)<300000){return cached.data;}try{var q=window.query(window.collection(window.db,'commerces'),window.where('uid','==',window.CURRENT_ACCOUNT.id));var snap=await window.getDocs(q);var c=null;snap.forEach(function(d){c=Object.assign({id:d.id},d.data());});await idbSet('stats',cacheKey,{data:c,ts:Date.now()});return c;}catch(e){return null;}}
async function renderMesPublications(){var c=document.getElementById('mesPublicationsListe');if(!c)return;if(!window.CURRENT_ACCOUNT||!window.CURRENT_ACCOUNT.id){c.innerHTML='<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:14px">Connectez-vous.</div>';return;}c.innerHTML='<div style="text-align:center;padding:20px;color:var(--text-muted);font-size:14px">Chargement…</div>';try{var cacheKey='pubs_user_'+window.CURRENT_ACCOUNT.id;var cached=await idbGet('stats',cacheKey);var ma;if(cached&&(Date.now()-cached.ts)<180000){ma=cached.data;}else{var q=window.query(window.collection(window.db,'annonces'),window.where('proprietaireUid','==',window.CURRENT_ACCOUNT.id),window.limit(20));var snap=await window.getDocs(q);ma=[];snap.forEach(function(d){ma.push(Object.assign({id:d.id},d.data()));});ma.sort(function(a,b){return(b.dateCreation||'').localeCompare(a.dateCreation||'');});await idbSet('stats',cacheKey,{data:ma,ts:Date.now()});}if(ma.length===0){c.innerHTML='<div style="text-align:center;padding:24px 12px;color:var(--text-muted);font-size:14px">Aucune publication.</div>';return;}c.innerHTML=ma.map(function(a){var sb='';if(a.statut==='en_attente')sb='<span style="font-size:11px;font-weight:900;padding:4px 9px;border-radius:6px;background:#fef3c7;color:#92400e;text-transform:uppercase">⏳ En attente</span>';else if(a.statut==='approuve')sb='<span style="font-size:11px;font-weight:900;padding:4px 9px;border-radius:6px;background:#d1fae5;color:#065f46;text-transform:uppercase">✅ Publié</span>';else if(a.statut==='refuse')sb='<span style="font-size:11px;font-weight:900;padding:4px 9px;border-radius:6px;background:#fee2e2;color:#991b1b;text-transform:uppercase">❌ Refusé</span>';return'<div class="pub-item">'+(a.img?'<img src="'+esc(a.img)+'" onerror="this.style.display=\'none\'">':'<div style="width:52px;height:52px;background:var(--bg-card);border:1px solid var(--border-primary);border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0">📄</div>')+'<div class="pub-item-info"><div class="pub-item-titre">'+esc(a.titre||'Sans titre')+'</div><div class="pub-item-ville">'+esc(a.ville||'')+'</div><div style="margin-top:6px">'+sb+'</div></div></div>';}).join('');}catch(e){c.innerHTML='<div style="text-align:center;padding:20px;color:#dc2626;font-size:14px">Erreur</div>';}}
async function verifierBoutiqueEtAfficher(){var ti=document.getElementById('dashTabInfos');var tc=document.getElementById('dashTabCatalogue');var sb=document.getElementById('shopStatusBadge');var bandeau=document.getElementById('bandeauStatutBoutique');var statsBoutique=document.getElementById('statsBoutiqueSection');if(!window.CURRENT_ACCOUNT){if(ti)ti.style.display='none';if(tc)tc.style.display='none';if(sb)sb.style.display='none';if(statsBoutique)statsBoutique.style.display='none';return;}var b=window.CURRENT_ACCOUNT.boutique;if(!b){var c=await chargerCommerceCommercant();if(c){b={uid:c.uid,nom:c.nom,type:c.type,ville:c.ville,quartier:c.quartier,adresse:c.adresse,horaires:c.horaires,telephone:c.telephone,whatsappCommercial:c.whatsappCommercial||c.whatsapp,statut:c.statut,img:c.img,emoji:c.emoji,description:c.description,retraitActif:c.retraitActif,livraisonActive:c.livraisonActive};}if(!b){if(ti)ti.style.display='none';if(tc)tc.style.display='none';if(sb)sb.style.display='none';if(bandeau)bandeau.style.display='none';if(statsBoutique)statsBoutique.style.display='none';return;}}if(b.statut==='approuve'){if(ti)ti.style.display='inline-flex';if(tc)tc.style.display='inline-flex';if(statsBoutique)statsBoutique.style.display='block';if(bandeau)bandeau.style.display='none';afficherInfosBoutique(b);}else if(b.statut==='en_attente'){if(ti)ti.style.display='none';if(tc)tc.style.display='none';if(statsBoutique)statsBoutique.style.display='none';if(bandeau){bandeau.style.display='block';bandeau.innerHTML='<div class="bandeau-statut attente"><i class="fa-solid fa-hourglass-half"></i><div><strong>Commerce en attente</strong><br>Vous serez appelé sous 30 min.</div></div>';}}else if(b.statut==='refuse'){if(ti)ti.style.display='none';if(tc)tc.style.display='none';if(statsBoutique)statsBoutique.style.display='none';if(bandeau){bandeau.style.display='block';bandeau.innerHTML='<div class="bandeau-statut refuse"><i class="fa-solid fa-circle-xmark"></i><div><strong>Commerce refusé</strong><br>Contactez le support.</div></div>';}}}
function afficherInfosBoutique(b){var av=document.getElementById('shopHeroAvatar');var nm=document.getElementById('shopHeroName');var ty=document.getElementById('shopHeroType');var sb=document.getElementById('shopStatusBadge');var list=document.getElementById('shopInfoList');if(av){if(b.img||b.emoji){if(b.img){av.innerHTML='<img src="'+esc(b.img)+'" alt="">';}else{av.textContent=b.emoji||'🏪';}}else{av.textContent='🏪';}}if(nm)nm.textContent=b.nom||'Mon commerce';if(ty)ty.textContent=(b.type||'Commerce')+' · '+(b.ville||'RDC')+(b.quartier?' · '+b.quartier:'');if(sb){if(b.statut==='approuve'){sb.className='shop-status-badge approuve';sb.innerHTML='<i class="fa-solid fa-circle-check"></i> Commerce approuvé';}else if(b.statut==='en_attente'){sb.className='shop-status-badge en_attente';sb.innerHTML='<i class="fa-solid fa-hourglass-half"></i> En attente';}else{sb.className='shop-status-badge refuse';sb.innerHTML='<i class="fa-solid fa-circle-xmark"></i> Refusé';}}if(list){var items=[];if(b.telephone)items.push({icon:'fa-phone',color:'#0055ff',label:'Téléphone',value:b.telephone});if(b.whatsappCommercial||b.whatsapp)items.push({icon:'fa-brands fa-whatsapp',color:'#10b981',label:'WhatsApp',value:b.whatsappCommercial||b.whatsapp});if(b.adresse)items.push({icon:'fa-location-dot',color:'#ef4444',label:'Adresse',value:b.adresse});if(b.horaires)items.push({icon:'fa-clock',color:'#f59e0b',label:'Horaires',value:b.horaires});list.innerHTML=items.map(function(it){return'<div class="shop-info-item"><div class="shop-info-icon" style="background:'+it.color+'"><i class="fa-solid '+it.icon+'"></i></div><div class="shop-info-content"><div class="shop-info-label">'+it.label+'</div><div class="shop-info-value">'+esc(it.value)+'</div></div></div>';}).join('');}}
function switchDashTab(el,tab){document.querySelectorAll('#page-dashboard-utilisateur .dash-tab').forEach(function(x){x.classList.remove('active');});el.classList.add('active');document.querySelectorAll('#page-dashboard-utilisateur .dash-panel').forEach(function(p){p.style.display='none';});var m={infos:'dashPanelInfos',stats:'dashPanelStats',catalogue:'dashPanelCatalogue',pubs:'dashPanelPubs',compte:'dashPanelCompte'};var tg=document.getElementById(m[tab]);if(tg)tg.style.display='block';if(tab==='stats')renderMesStats();if(tab==='catalogue')ouvrirCatalogueCommercant();if(tab==='pubs')renderMesPublications();if(tab==='infos'){var b=window.CURRENT_ACCOUNT?window.CURRENT_ACCOUNT.boutique:null;if(b)afficherInfosBoutique(b);}}
async function ouvrirCatalogueCommercant(){var c=await chargerCommerceCommercant();if(!c){var l=document.getElementById('catListe');if(l)l.innerHTML='<div class="cat-empty"><div class="cat-empty-icon">📦</div><div class="cat-empty-title">Aucun catalogue</div></div>';return;}CATALOGUE_COMMERCE_ID=c.id;CATALOGUE_FULL=(c.produits||[]);var cc=document.getElementById('catCount');if(cc)cc.textContent=CATALOGUE_FULL.length+' produit'+(CATALOGUE_FULL.length>1?'s':'');await chargerCompteurSuppressions();renderCataloguePage();}
async function chargerCompteurSuppressions(){var today=getTodayKey();var key='suppressions_'+getUserId();try{var data=await idbGet('stats',key);if(data&&data.date===today){SUPPRESSIONS_JOUR=data.count||0;SUPPRESSIONS_DATE=today;}else{SUPPRESSIONS_JOUR=0;SUPPRESSIONS_DATE=today;await idbSet('stats',key,{date:today,count:0});}}catch(e){SUPPRESSIONS_JOUR=0;SUPPRESSIONS_DATE=today;}}
async function incrementerSuppressions(){var today=getTodayKey();var key='suppressions_'+getUserId();if(SUPPRESSIONS_DATE!==today){SUPPRESSIONS_JOUR=0;SUPPRESSIONS_DATE=today;}SUPPRESSIONS_JOUR++;await idbSet('stats',key,{date:today,count:SUPPRESSIONS_JOUR});}
function renderCompteurSuppressions(){var el=document.getElementById('catDelCounter');if(!el)return;el.textContent='🗑️ '+SUPPRESSIONS_JOUR+' / '+SUPPRESSIONS_MAX;}
function renderCataloguePage(){var liste=document.getElementById('catListe');if(!liste)return;renderCompteurSuppressions();if(!CATALOGUE_FULL||CATALOGUE_FULL.length===0){liste.innerHTML='<div class="cat-empty"><div class="cat-empty-icon">📦</div><div class="cat-empty-title">Catalogue vide</div><div class="cat-empty-desc">Ajoutez vos premiers produits.</div></div>';return;}liste.innerHTML=CATALOGUE_FULL.map(function(p,gi){var statut=p.statut||'en_attente';var badge='';if(statut==='approuve')badge='<span class="cat-item-badge approuve"><i class="fa-solid fa-check"></i> Publié</span>';else if(statut==='en_attente')badge='<span class="cat-item-badge en_attente">⏳ En attente</span>';else if(statut==='refuse')badge='<span class="cat-item-badge refuse">❌ Refusé</span>';var actions='<div class="cat-item-actions">';if(statut!=='refuse')actions+='<button class="cat-action-btn cat-action-edit" onclick="event.stopPropagation();ouvrirChangerPrix(\''+esc(p.nom||'')+'\','+gi+')"><i class="fa-solid fa-pen"></i></button>';var dis=(SUPPRESSIONS_JOUR>=SUPPRESSIONS_MAX)?'disabled':'';actions+='<button class="cat-action-btn cat-action-delete" '+dis+' onclick="event.stopPropagation();ouvrirSupprimerProduit(\''+esc(p.nom||'')+'\','+gi+')"><i class="fa-solid fa-'+(SUPPRESSIONS_JOUR>=SUPPRESSIONS_MAX?'lock':'trash')+'"></i></button>';actions+='</div>';var thumb=p.img?'<img src="'+esc(p.img)+'" onerror="this.parentElement.textContent=\'📦\'">':'📦';return'<div class="cat-item"><div class="cat-item-thumb">'+thumb+'</div><div class="cat-item-info"><div class="cat-item-name">'+esc(p.nom||'Sans nom')+'</div><div class="cat-item-price">'+Number(p.prix||0).toLocaleString('fr-FR')+' FC</div>'+badge+'</div>'+actions+'</div>';}).join('');}
function ouvrirAjouterProduit(){document.getElementById('prodNom').value='';document.getElementById('prodPrix').value='';document.getElementById('prodPrixLabel').value='';document.getElementById('prodCategorie').value='';_produitImageData=null;var prev=document.getElementById('prodImagePreview');if(prev)prev.style.display='none';document.getElementById('ajouterProduitModal').classList.add('active');}
function fermerAjouterProduit(){document.getElementById('ajouterProduitModal').classList.remove('active');_produitImageData=null;}
function handleProdImage(e){var f=e.target.files[0];if(!f)return;if(f.size>2*1024*1024){showToast('Image trop lourde (max 2MB)');e.target.value='';return;}var reader=new FileReader();reader.onload=function(ev){_produitImageData=ev.target.result;var prev=document.getElementById('prodImagePreview');var img=document.getElementById('prodImagePreviewImg');if(img)img.src=ev.target.result;if(prev)prev.style.display='block';};reader.readAsDataURL(f);}
async function validerAjouterProduit(){var nom=document.getElementById('prodNom').value.trim();var prix=parseInt(document.getElementById('prodPrix').value,10);var unit=document.getElementById('prodPrixLabel').value;var cat=document.getElementById('prodCategorie').value;if(!nom){showToast('Saisissez le nom');return;}if(!prix||prix<=0){showToast('Prix invalide');return;}if(!_produitImageData){showToast('Ajoutez une photo');return;}if(!CATALOGUE_COMMERCE_ID){showToast('Erreur');return;}var btn=document.getElementById('ajouterProduitBtn');if(btn){btn.disabled=true;btn.innerHTML='<i class="fa-solid fa-spinner fa-spin"></i>…';}try{var ref=window.docRef(window.db,'commerces',CATALOGUE_COMMERCE_ID);var snap=await window.getDocRef(ref);if(!snap.exists()){showToast('Erreur');return;}var data=snap.data();var produits=data.produits||[];var imgUrl=_produitImageData;if(window.CURRENT_ACCOUNT){try{var blob=await fetch(_produitImageData).then(function(r){return r.blob();});var file=new File([blob],'produit_'+Date.now()+'.webp',{type:'image/webp'});var path='commerces/'+window.CURRENT_ACCOUNT.id+'/'+Date.now()+'_'+Math.random().toString(36).slice(2,7)+'.webp';var sRef=window.storageRef(window.storage,path);await window.uploadBytes(sRef,file);imgUrl=await window.getDownloadURL(sRef);}catch(e){}}produits.push({nom:nom,prix:prix,prixLabel:unit,categorie:cat,img:imgUrl,statut:'en_attente',dateAjout:new Date().toISOString()});await window.setDoc(ref,{produits:produits},{merge:true});await window.invaliderCache('cache_commerces');try{await idbDelete('stats','commerce_user_'+window.CURRENT_ACCOUNT.id);}catch(e){}fermerAjouterProduit();document.getElementById('produitPendingModal').classList.add('active');await ouvrirCatalogueCommercant();}catch(err){showToast('Erreur');}finally{if(btn){btn.disabled=false;btn.innerHTML='Ajouter';}}}
function fermerProduitPending(){document.getElementById('produitPendingModal').classList.remove('active');}
function ouvrirChangerPrix(nom,index){if(SUPPRESSIONS_JOUR>=SUPPRESSIONS_MAX){showToast('Limite atteinte');return;}var p=CATALOGUE_FULL[index];if(!p)return;_editProduitIndex=index;_editProduitNom=nom;_editProduitCommerceId=CATALOGUE_COMMERCE_ID;document.getElementById('changerPrixNom').textContent=nom;document.getElementById('nouveauPrix').value=p.prix||'';document.getElementById('nouveauPrixLabel').value=p.prixLabel||'';document.getElementById('changerPrixModal').classList.add('active');}
function fermerChangerPrix(){document.getElementById('changerPrixModal').classList.remove('active');_editProduitIndex=-1;}
async function validerChangerPrix(){var np=parseInt(document.getElementById('nouveauPrix').value,10);var nu=document.getElementById('nouveauPrixLabel').value;if(!np||np<=0){showToast('Prix invalide');return;}if(_editProduitIndex<0){showToast('Erreur');return;}try{var ref=window.docRef(window.db,'commerces',_editProduitCommerceId);var snap=await window.getDocRef(ref);if(!snap.exists()){showToast('Erreur');return;}var data=snap.data();var produits=data.produits||[];if(!produits[_editProduitIndex]){showToast('Introuvable');return;}produits[_editProduitIndex].prix=np;produits[_editProduitIndex].prixLabel=nu;await window.setDoc(ref,{produits:produits},{merge:true});await window.invaliderCache('cache_commerces');try{await idbDelete('stats','commerce_user_'+window.CURRENT_ACCOUNT.id);}catch(e){}fermerChangerPrix();showToast('✅ Prix mis à jour');await ouvrirCatalogueCommercant();}catch(err){showToast('Erreur');}}
function ouvrirSupprimerProduit(nom,index){if(SUPPRESSIONS_JOUR>=SUPPRESSIONS_MAX){showToast('⚠️ Limite atteinte');return;}var p=CATALOGUE_FULL[index];if(!p)return;_editProduitIndex=index;_editProduitNom=nom;_editProduitCommerceId=CATALOGUE_COMMERCE_ID;document.getElementById('supprimerProduitNom').textContent=nom;document.getElementById('supprimerProduitModal').classList.add('active');}
function fermerSupprimerProduit(){document.getElementById('supprimerProduitModal').classList.remove('active');_editProduitIndex=-1;}
async function validerSuppressionProduit(){if(_editProduitIndex<0){showToast('Erreur');return;}if(SUPPRESSIONS_JOUR>=SUPPRESSIONS_MAX){showToast('Limite atteinte');fermerSupprimerProduit();return;}try{var ref=window.docRef(window.db,'commerces',_editProduitCommerceId);var snap=await window.getDocRef(ref);if(!snap.exists()){showToast('Erreur');return;}var data=snap.data();var produits=data.produits||[];produits.splice(_editProduitIndex,1);await window.setDoc(ref,{produits:produits},{merge:true});await window.invaliderCache('cache_commerces');try{await idbDelete('stats','commerce_user_'+window.CURRENT_ACCOUNT.id);}catch(e){}await incrementerSuppressions();fermerSupprimerProduit();showToast('✅ Produit supprimé');await ouvrirCatalogueCommercant();}catch(err){showToast('Erreur');}}
function toggleSearchCard(){requireLogin('rechercher',function(){var wrapper=document.getElementById('searchCardWrapper');var trigger=document.getElementById('besoinTrigger');if(!wrapper||!trigger)return;wrapper.classList.add('open');trigger.classList.add('hidden');setTimeout(function(){var input=document.getElementById('searchQuery');if(input)input.focus();},300);});}
function fermerSearchCard(){var wrapper=document.getElementById('searchCardWrapper');var trigger=document.getElementById('besoinTrigger');if(!wrapper||!trigger)return;wrapper.classList.remove('open');trigger.classList.remove('hidden');}
function ouvrirPublierJob(){requireLogin('publier',function(){go('publish','jobs');});}
function recupererCodeParWhatsApp(){if(!window.CURRENT_ACCOUNT){showToast('Connectez-vous');return;}var nom=window.CURRENT_ACCOUNT.name||'Utilisateur';var phone=window.CURRENT_ACCOUNT.phone||'—';var msg='*NeTubeX RDC*%0A%0A🎧 *DEMANDE CODE*%0A%0A👤 '+encodeURIComponent(nom)+'%0A📱 '+encodeURIComponent(phone)+'%0A%0AJ\'ai oublié mon code.';afficherPopupWhatsApp(msg, '243857525821');}
function ouvrirMdpOublie(){var phone=window.CURRENT_ACCOUNT?window.CURRENT_ACCOUNT.phone:'';var msg='*NeTubeX RDC*%0A%0A🔑 *CODE OUBLIÉ*%0A%0A👤 '+encodeURIComponent(phone||'—')+'%0A%0AJe souhaite réinitialiser.';afficherPopupWhatsApp(msg, '243857525821');}

function updateHeaderOnScroll(){var cY=window.scrollY||document.documentElement.scrollTop;if(cY>lastScrollY&&cY>80)document.body.classList.add('hide-header');else document.body.classList.remove('hide-header');lastScrollY=cY;clearTimeout(headerTimer);headerTimer=setTimeout(function(){document.body.classList.remove('hide-header');},SCROLL_DELAY);}
window.addEventListener('scroll',updateHeaderOnScroll,{passive:true});
window.addEventListener('resize',function(){setTimeout(verifierDescriptions,150);});
var _scrollingTimer;
window.addEventListener('scroll',function(){document.body.classList.add('is-scrolling');if(_scrollingTimer)clearTimeout(_scrollingTimer);_scrollingTimer=setTimeout(function(){document.body.classList.remove('is-scrolling');},150);},{passive:true});
function demarrerPolling(){if(_pollingTimer)return;if(!_appEstActive)return;if(currentTab==='index')return;_pollingTimer=setInterval(rafraichirDonneesSilencieusement,600000);}
function arreterPolling(){if(_pollingTimer){clearInterval(_pollingTimer);_pollingTimer=null;}}
async function rafraichirDonneesSilencieusement(){if(!navigator.onLine||document.hidden||currentTab==='index'||currentTab==='catalogue')return;try{var annonces=await window.chargerAnnoncesFirestore(false);var commerces=await window.chargerCommercesFirestore(false);ANNONCES_DATA=annonces;COMMERCES_DATA=commerces;if(currentTab==='category'){renderCategoryFeed(CURRENT_CATEGORY||'autre');}if(currentTab==='commerces'){renderCommercesGrid();}if(currentTab==='jobs'){renderJobsFeed();}if(currentTab==='immobilier'){var sub=document.querySelector('.immobilier-subtab.active');renderImmobilierFeed(sub?sub.getAttribute('data-sub')||'all':'all');}}catch(e){}}
document.addEventListener('visibilitychange',function(){if(document.hidden){_appEstActive=false;arreterPolling();}else{_appEstActive=true;demarrerPolling();}});
window.addEventListener('online',function(){if(_appEstActive)rafraichirDonneesSilencieusement();});
window.addEventListener('offline',function(){arreterPolling();});
async function verifierCompteLocal(){if(!window.CURRENT_ACCOUNT||!window.CURRENT_ACCOUNT.id)return;var lastCheck=sessionStorage.getItem('ntx_last_verify');if(lastCheck&&(Date.now()-parseInt(lastCheck,10))<600000)return;try{var s=await window.getDocRef(window.docRef(window.db,'netubers',window.CURRENT_ACCOUNT.id));if(s.exists()){var d=s.data();if(d.actif===false){showToast('Compte désactivé');setCurrentAccount(null);CURRENT_COMMERCANT=null;}else{var acc=Object.assign({},window.CURRENT_ACCOUNT,{boutique:d.boutique||null,code:d.code||window.CURRENT_ACCOUNT.code,phone:d.phone||window.CURRENT_ACCOUNT.phone,nomComplet:d.nomComplet||window.CURRENT_ACCOUNT.nomComplet,sexe:d.sexe||window.CURRENT_ACCOUNT.sexe||'',avatarUrl:d.avatarUrl||window.CURRENT_ACCOUNT.avatarUrl||''});acc.name=acc.nomComplet;setCurrentAccount(acc);}}sessionStorage.setItem('ntx_last_verify',Date.now().toString());}catch(e){}}
async function restaurerSession(){try{var stored=await window.getStored(window.STORES.account,'current',null);if(!stored||!stored.id){try{var backup=localStorage.getItem('ntx_account_backup');if(backup){stored=JSON.parse(backup);await window.setStored(window.STORES.account,'current',stored);}}catch(e){}}if(stored&&stored.id){setCurrentAccount(stored);CURRENT_COMMERCANT=await window.getStored(window.STORES.boutique,'current',null);return true;}}catch(e){}return false;}
async function restaurerDepuisFirebaseAuth(user){if(!user||!user.uid)return false;try{var data=await window.getUserDoc(user.uid);if(!data)return false;if(data.actif===false)return false;setCurrentAccount({id:user.uid,uid:user.uid,nom:data.nom||'',prenom:data.prenom||'',nomComplet:data.nomComplet||'',name:data.nomComplet||data.nom||'',sexe:data.sexe||'',phone:data.phone||'',code:data.code||'',emailAuth:data.emailAuth||user.email||'',email:data.emailAuth||user.email||'',ville:data.ville||'',role:data.role||'user',boutique:data.boutique||null,parrainage:data.parrainage||null,actif:data.actif!==false,dateCreation:data.dateCreation||'',avatarUrl:data.avatarUrl||''});try{await window.setStored(window.STORES.account,'current',window.CURRENT_ACCOUNT);}catch(e){}try{localStorage.setItem('ntx_account_backup',JSON.stringify(window.CURRENT_ACCOUNT));}catch(e){}return true;}catch(e){return false;}}
async function attendreFirebaseAuth(){return new Promise(function(resolve){var resolu=false;var timer=setTimeout(function(){if(!resolu){resolu=true;resolve(null);}},5000);try{if(window.onAuthStateChangedRef){window.onAuthStateChangedRef(window.auth,function(user){if(resolu)return;resolu=true;clearTimeout(timer);resolve(user);});}else{if(!resolu){resolu=true;clearTimeout(timer);resolve(null);}}}catch(e){if(!resolu){resolu=true;clearTimeout(timer);resolve(null);}}});}
document.addEventListener('DOMContentLoaded',async function(){
  await window.migrerDepuisLocalStorage();
  await restaurerSession();
  if(!window.CURRENT_ACCOUNT){
    var fbUser=await attendreFirebaseAuth();
    if(fbUser){
      await restaurerDepuisFirebaseAuth(fbUser);
      if(!window.CURRENT_ACCOUNT){await restaurerSession();}
    }
  }
  if(window.CURRENT_ACCOUNT){window.CURRENT_ACCOUNT_REF=window.CURRENT_ACCOUNT;}
  await verifierCompteLocal();
  demarrerBarreProgression();
  afficherSkeletonsFeed(4);
  
  try{
    var co=await window.chargerCommercesFirestore(true);
    var an=await window.chargerAnnoncesFirestore(true);
    COMMERCES_DATA=co;
    ANNONCES_DATA=an;
    renderCommercesGrid();
    masquerSkeletonsFeed();
    initFeed();
    terminerBarreProgression();
    updateCart();
    appliquerThemeProfilUI();
    go('index');
    attacherTousPhones();
    attacherNettoyageDescription();
    _sessionEnCours=false;
  }catch(err){
    masquerSkeletonsFeed();
    terminerBarreProgression();
    _sessionEnCours=false;
    var feed = document.getElementById('mainFeed');
    if(feed) {
      feed.innerHTML = '<div style="text-align:center;padding:60px 20px;background:var(--bg-card);border:1px dashed var(--border-primary);border-radius:16px;margin:16px">'
        + '<div style="font-size:48px;opacity:.35;margin-bottom:14px">📶</div>'
        + '<h3 style="font-size:17px;font-weight:800;color:var(--text-primary);margin-bottom:8px">Connexion instable</h3>'
        + '<p style="font-size:14px;color:var(--text-muted);margin-bottom:16px">Impossible de charger les annonces. Vérifiez votre réseau.</p>'
        + '<button onclick="window.location.reload()" class="btn-3d blue" style="padding:12px 24px;border-radius:10px;margin:0 auto"><i class="fa-solid fa-rotate"></i> Réessayer</button>'
        + '</div>';
    }
    showToast('Erreur de connexion');
  }
});
if(window.onAuthStateChangedRef){window.onAuthStateChangedRef(window.auth,async function(user){if(_sessionEnCours)return;if(user&&user.uid){if(!window.CURRENT_ACCOUNT||window.CURRENT_ACCOUNT.id!==user.uid){await restaurerDepuisFirebaseAuth(user);}}});}

window.go=go;window.openDetail=openDetail;window.openCatalogue=openCatalogue;window.filterCategory=filterCategory;window.toggleSearchCard=toggleSearchCard;window.fermerSearchCard=fermerSearchCard;window.executeSearch=executeSearch;window.openAccountOrProfile=openAccountOrProfile;window.doLogout=doLogout;window.ouvrirConnexion=ouvrirConnexion;window.validerDeblocage=validerDeblocage;window.switchDashTab=switchDashTab;window.switchDeblocageSubTab=switchDeblocageSubTab;window.closeCart=closeCart;window.openCart=openCart;window.changeQty=changeQty;window.removeItem=removeItem;window.submitOrder=submitOrder;window.copyText=copyText;window.toggleImmoSelect=toggleImmoSelect;window.selectImmoOption=selectImmoOption;window.selectJobContract=selectJobContract;window.handlePublishImages=handlePublishImages;window.removePublishImage=removePublishImage;window.submitPublish=submitPublish;window.closePublishPending=closePublishPending;window.inscNextStep=inscNextStep;window.inscPrevStep=inscPrevStep;window.submitInscriptionBoutique=submitInscriptionBoutique;window.toggleInscVilleLibre=toggleInscVilleLibre;window.togglePublishVilleLibre=togglePublishVilleLibre;window.ouvrirChangerNumero=ouvrirChangerNumero;window.fermerChangerNumero=fermerChangerNumero;window.validerChangerNumero=validerChangerNumero;window.toggleThemeProfil=toggleThemeProfil;window.closeAccountModal=closeAccountModal;window.basculerModalAccueil=basculerModalAccueil;window.submitAccountModal=submitAccountModal;window.submitAccountLogin=submitAccountLogin;window.showAccountModal=showAccountModal;window.signalerOffre=signalerOffre;window.submitSignalement=submitSignalement;window.closeDetailFullscreen=closeDetailFullscreen;window.closeBoutiquePending=closeBoutiquePending;window.closeDeblocagePending=closeDeblocagePending;window.filtrerCommerces=filtrerCommerces;window.headerBackAction=headerBackAction;window.requireLogin=requireLogin;window.initFeed=initFeed;window.sharePostFromFeed=sharePostFromFeed;window.sharePost=sharePost;window.explorerCommerces=explorerCommerces;window.lancerOffreImmobilier=lancerOffreImmobilier;window.genererEtAfficherCodeCommande=genererEtAfficherCodeCommande;window.closeProductPopup=closeProductPopup;window.openProductPopup=openProductPopup;window.confirmAddToCartFromPopup=confirmAddToCartFromPopup;window.selectOrderType=selectOrderType;window.cartGoToPage=cartGoToPage;window.toggleDesc=toggleDesc;window.filtrerCatalogueProduits=filtrerCatalogueProduits;window.trierCatalogue=trierCatalogue;window.choisirSexe=choisirSexe;window.renderMesPublications=renderMesPublications;window.renderMesStats=renderMesStats;window.ouvrirPublierJob=ouvrirPublierJob;window.verifierDescriptions=verifierDescriptions;window.filtrerImmobilier=filtrerImmobilier;window.renderImmobilierFeed=renderImmobilierFeed;window.filtrerJobs=filtrerJobs;window.renderJobsFeed=renderJobsFeed;window.postulerJob=postulerJob;window.partagerJob=partagerJob;window.demanderDeconnexion=demanderDeconnexion;window.fermerDeconnexionModal=fermerDeconnexionModal;window.confirmerDeconnexion=confirmerDeconnexion;window.ouvrirAjouterProduit=ouvrirAjouterProduit;window.fermerAjouterProduit=fermerAjouterProduit;window.handleProdImage=handleProdImage;window.validerAjouterProduit=validerAjouterProduit;window.fermerProduitPending=fermerProduitPending;window.ouvrirChangerPrix=ouvrirChangerPrix;window.fermerChangerPrix=fermerChangerPrix;window.validerChangerPrix=validerChangerPrix;window.ouvrirSupprimerProduit=ouvrirSupprimerProduit;window.fermerSupprimerProduit=fermerSupprimerProduit;window.validerSuppressionProduit=validerSuppressionProduit;window.recupererCodeParWhatsApp=recupererCodeParWhatsApp;window.ouvrirMdpOublie=ouvrirMdpOublie;window.togglePasswordVisibility=togglePasswordVisibility;window.chargerCommerceCommercant=chargerCommerceCommercant;window.closeSearchModal=closeSearchModal;window.openSearchModal=openSearchModal;window.switchSearchTab=switchSearchTab;window.openDetailBySearchIdx=openDetailBySearchIdx;window.rechercherAvecDernierQuery=rechercherAvecDernierQuery;window.estHotelOuHebergement=estHotelOuHebergement;window.ouvrirReservation=ouvrirReservation;window.fermerReservation=fermerReservation;window.validerReservation=validerReservation;window.selectionnerChambreResa=selectionnerChambreResa;window.mettreAJourTotalResa=mettreAJourTotalResa;window.handleAvatarInscription=handleAvatarInscription;window.retirerAvatarInscription=retirerAvatarInscription;window.ouvrirChangerAvatar=ouvrirChangerAvatar;window.fermerChangerAvatar=fermerChangerAvatar;window.handleAvatarProfil=handleAvatarProfil;window.retirerAvatarProfil=retirerAvatarProfil;window.mettreAJourAvatarProfilUI=mettreAJourAvatarProfilUI;

function closeDetailFullscreen(){if(!detailFsActive)return;detailFsActive=false;var o=document.getElementById('detailFullscreen');if(o)o.classList.remove('active');}
function openDetailFullscreen(src){if(!src||detailFsActive)return;detailFsActive=true;var o=document.getElementById('detailFullscreen');var i=document.getElementById('detailFsImg');if(!o||!i)return;i.src=src;o.classList.add('active');setTimeout(function(){closeDetailFullscreen();},10000);}
window.openDetailFullscreen=openDetailFullscreen;window.closeDetailFullscreen=closeDetailFullscreen;

var _resaNuitsBind=document.getElementById('resaNuits');
if(_resaNuitsBind){_resaNuitsBind.addEventListener('input',mettreAJourTotalResa);}

(function surveillerInvalidation(){
  var _lastInvalidation = null;
  var _invalidationActive = false;
  var _enCours = false;
  var POLL_MS = 3000;
  var AGE_RECENT_MS = 5*60*1000;

  async function verifierInvalidation(){
    if(document.hidden) return;
    if(_enCours) return;
    _enCours = true;
    try {
      var snap = await window.getDocRef(window.docRef(window.db,'config','app'));
      if(!snap.exists()) return;
      var d = snap.data();
      var inv = d.invalidationDirecte || {active:false};
      _invalidationActive = inv.active === true;
      if(!_invalidationActive){
        _lastInvalidation = d.invalidationForcee || 0;
        return;
      }
      var forcee = d.invalidationForcee || 0;
      if(!forcee) return;
      if(_lastInvalidation === null){
        _lastInvalidation = forcee;
        var lastChange = inv.lastChangeAt ? new Date(inv.lastChangeAt).getTime() : 0;
        var age = Date.now() - lastChange;
        if(age >= 0 && age < AGE_RECENT_MS){
          await rafraichirToutSilencieux();
        }
        return;
      }
      if(forcee !== _lastInvalidation){
        _lastInvalidation = forcee;
        await rafraichirToutSilencieux();
      }
    } catch(e){}
    finally { _enCours = false; }
  }

  async function rafraichirToutSilencieux(){
    try { await window.invaliderCache(); } catch(e){}
    try {
      var results = await Promise.all([
        window.chargerAnnoncesFirestore(true),
        window.chargerCommercesFirestore(true)
      ]);
      ANNONCES_DATA = results[0];
      COMMERCES_DATA = results[1];
      if(currentTab === 'index'){
        _nextFeedOrder = null;
        _feedCycleItems = [];
        _feedCycleIndex = 0;
        _feedSeenIds.clear();
        initFeed();
      } else if(currentTab === 'commerces'){
        renderCommercesGrid();
      } else if(currentTab === 'jobs'){
        renderJobsFeed();
      } else if(currentTab === 'immobilier'){
        var sub = document.querySelector('.immobilier-subtab.active');
        renderImmobilierFeed(sub ? sub.getAttribute('data-sub') || 'all' : 'all');
      } else if(currentTab === 'category'){
        renderCategoryFeed(CURRENT_CATEGORY || 'autre');
      } else if(currentTab === 'dashboard-utilisateur'){
        renderMesStats();
        renderMesPublications();
        try { DEBLOCAGES_DIRTY = true; await rafraichirTousDeblocages(); } catch(e){}
      } else if(currentTab === 'catalogue' && CURRENT_COMMERCE){
        var refreshed = COMMERCES_DATA.find(function(c){ return c.id === CURRENT_COMMERCE.id; });
        if(refreshed){
          CURRENT_COMMERCE = refreshed;
          renderCatalogue(refreshed);
          if(document.getElementById('cart-drawer').classList.contains('active')){
            appliquerConfigCommandes();
          }
        }
      }
    } catch(e){}
  }

  setInterval(verifierInvalidation, POLL_MS);
  verifierInvalidation();
})();
```
