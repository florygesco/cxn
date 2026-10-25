window.OPERATEURS_DATA = [];
window.CURRENT_TELECOM_ID = null;

window.chargerOperateursFirestore = async function(forceRefresh) {
  if (!forceRefresh) {
    var cached = await getCachedList('cache_operateurs');
    if (cached && Array.isArray(cached)) return cached;
  }
  try {
    var snap = await getDocs(collection(db, 'operateurs_telecoms'));
    var ops = [];
    snap.forEach(function(d) {
      var v = d.data();
      ops.push({
        id: d.id,
        nom: v.nom || '',
        description: v.description || '',
        telephone: v.telephone || '',
        siteWeb: v.siteWeb || '',
        ville: v.ville || 'RDC',
        couverture: v.couverture || 'RDC',
        nombreAgences: v.nombreAgences || 0,
        nombreClients: v.nombreClients || '0',
        logoUrl: v.logoUrl || '',
        bannerUrl: v.bannerUrl || '',
        horaires: v.horaires || '',
        notesReseau: v.notesReseau || {},
        services: v.services || [],
        offres: v.offres || [],
        contactActif: v.contactActif === true,
        verifie: v.verifie === true
      });
    });
    await setCachedList('cache_operateurs', ops);
    return ops;
  } catch (e) {
    var cached = await getCachedList('cache_operateurs');
    return cached || [];
  }
};

window.chargerNotesTelecom = async function(operateurId) {
  try {
    var q = window.query(window.collection(window.db, 'notes_telecoms'), window.where('operateurId', '==', operateurId));
    var snap = await window.getDocs(q);
    var notes = [];
    snap.forEach(function(d) { notes.push(Object.assign({ id: d.id }, d.data())); });
    return notes;
  } catch (e) { return []; }
};

window.calculerMoyenneTelecom = function(notes) {
  if (!notes || notes.length === 0) return { moyenne: 0, total: 0 };
  var somme = 0;
  notes.forEach(function(n) { somme += Number(n.etoiles) || 0; });
  return { moyenne: Math.round((somme / notes.length) * 10) / 10, total: notes.length };
};

window.aDejaNoteTelecom = async function(operateurId) {
  if (!window.CURRENT_ACCOUNT) return null;
  try {
    var docId = operateurId + '_' + window.CURRENT_ACCOUNT.id;
    var snap = await window.getDocRef(window.docRef(window.db, 'notes_telecoms', docId));
    return snap.exists() ? Object.assign({ id: docId }, snap.data()) : null;
  } catch (e) { return null; }
};

window.noterTelecom = async function(operateurId, etoiles) {
  if (!window.CURRENT_ACCOUNT) throw new Error('Non connecté');
  if (!etoiles || etoiles < 1 || etoiles > 5) throw new Error('Note entre 1 et 5');
  
  var docId = operateurId + '_' + window.CURRENT_ACCOUNT.id;
  var existant = await aDejaNoteTelecom(operateurId);
  
  if (existant && existant.dateModification) {
    var last = new Date(existant.dateModification).getTime();
    var daysSince = (Date.now() - last) / (1000 * 60 * 60 * 24);
    if (daysSince < 7) {
      var reste = Math.ceil(7 - daysSince);
      throw new Error('Modification possible dans ' + reste + ' jour' + (reste > 1 ? 's' : ''));
    }
  }
  
  await window.setDoc(window.docRef(window.db, 'notes_telecoms', docId), {
    operateurId: operateurId, uid: window.CURRENT_ACCOUNT.id, etoiles: etoiles,
    dateCreation: existant ? existant.dateCreation : new Date().toISOString(),
    dateModification: new Date().toISOString()
  });
  
  await window.invaliderCache('cache_operateurs');
  return true;
};

window.ouvrirFicheTelecom = async function(operatorId) {
  var op = window.OPERATEURS_DATA.find(function(o) { return o.id === operatorId; });
  if (!op) { showToast('Opérateur introuvable'); return; }
  
  window.CURRENT_TELECOM_ID = operatorId;
  var notes = await window.chargerNotesTelecom(operatorId);
  var calc = window.calculerMoyenneTelecom(notes);

  var elHeaderName = document.getElementById('telecomHeaderName');
  var elLogo = document.getElementById('telecomLogo');
  var elName = document.getElementById('telecomName');
  var elRating = document.getElementById('telecomRating');
  var elReviews = document.getElementById('telecomReviewsCount');
  var elDesc = document.getElementById('telecomDesc');
  var elBanner = document.getElementById('telecomBanner');
  var elAgencies = document.getElementById('telecomAgencies');
  var elCoverage = document.getElementById('telecomCoverage');
  var elClients = document.getElementById('telecomClients');
  var elStars = document.getElementById('telecomStarsDisplay');

  if (elHeaderName) elHeaderName.textContent = op.nom;
  if (elLogo) {
    if (op.logoUrl) elLogo.innerHTML = '<img src="' + op.logoUrl + '" style="width:100%;height:100%;object-fit:contain;padding:8px;">';
    else elLogo.textContent = (op.nom || '').substring(0, 6);
  }
  if (elName) elName.textContent = op.nom;
  if (elRating) elRating.textContent = calc.moyenne.toFixed(1) + '/5';
  if (elReviews) elReviews.textContent = '(' + calc.total + ' avis)';
  if (elDesc) elDesc.textContent = op.description || '';
  if (elBanner) elBanner.src = op.bannerUrl || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop';
  
  if (elAgencies) elAgencies.textContent = '+' + (op.nombreAgences || 0);
  if (elCoverage) elCoverage.textContent = op.couverture || 'RDC';
  if (elClients) elClients.textContent = '+' + (op.nombreClients || '0');

  if (elStars) {
    var starsHtml = '';
    for (var i = 1; i <= 5; i++) {
      starsHtml += i <= Math.round(calc.moyenne) 
        ? '<i class="fa-solid fa-star" style="color:#fbbf24;font-size:14px;"></i>' 
        : '<i class="fa-regular fa-star" style="color:#cbd5e1;font-size:14px;"></i>';
    }
    elStars.innerHTML = starsHtml;
  }

  var elServices = document.getElementById('telListeServices');
  if (elServices) {
    var srv = op.services || [];
    if (srv.length === 0) {
      elServices.innerHTML = '<div style="text-align:center; padding:20px; color:#64748b; font-size:14px; background:#fff; border-radius:12px; border:1px solid #e2e8f0;">Services non spécifiés.</div>';
    } else {
      elServices.innerHTML = srv.map(function(s) {
        return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">' +
          '<div style="width:40px; height:40px; border-radius:50%; background:#fef2f2; color:#e11d48; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-check"></i></div>' +
          '<div style="font-size:15px; font-weight:800; color:#0f172a;">' + s + '</div></div>';
      }).join('');
    }
  }

  var elOffres = document.getElementById('telListeOffres');
  if (elOffres) {
    var off = op.offres || [];
    if (off.length === 0) {
      elOffres.innerHTML = '<div style="text-align:center; padding:20px; color:#64748b; font-size:14px; background:#fff; border-radius:12px; border:1px solid #e2e8f0;">Aucune offre disponible.</div>';
    } else {
      elOffres.innerHTML = off.map(function(o) {
        return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
          '<div style="display:flex; gap:12px; align-items:center;">' +
            '<div style="width:40px; height:40px; border-radius:50%; background:#eff6ff; color:#007fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-tags"></i></div>' +
            '<div><div style="font-size:15px; font-weight:900; color:#0f172a;">' + (o.titre || 'Offre') + '</div>' +
            '<div style="font-size:13px; color:#64748b;">' + (o.description || '') + '</div></div></div>' +
          '<i class="fa-solid fa-chevron-right" style="color:#cbd5e1;"></i></div>';
      }).join('');
    }
  }

  var notesRes = op.notesReseau || {};
  var elAppels = document.getElementById('telNoteAppels');
  var elInternet = document.getElementById('telNoteInternet');
  var elStab = document.getElementById('telNoteStabilite');
  var elDispo = document.getElementById('telNoteDisponibilite');
  if (elAppels) elAppels.textContent = (notesRes.appels || 0) + '/5';
  if (elInternet) elInternet.textContent = (notesRes.internet || 0) + '/5';
  if (elStab) elStab.textContent = (notesRes.stabilite || 0) + '/5';
  if (elDispo) elDispo.textContent = (notesRes.disponibilite || 0) + '/5';

  var elSite = document.getElementById('telInfoSite');
  var elTel = document.getElementById('telInfoTel');
  var elVilles = document.getElementById('telInfoVilles');
  var elHoraires = document.getElementById('telInfoHoraires');
  if (elSite) elSite.textContent = op.siteWeb || '—';
  if (elTel) elTel.textContent = op.telephone || '—';
  if (elVilles) elVilles.textContent = op.ville || 'RDC';
  if (elHoraires) elHoraires.textContent = op.horaires || '—';

  if (typeof go === 'function') go('telecom-detail');
};

window.switchTelecomTab = function(tab) {
  var tabs = ['services', 'offres', 'qualite', 'infos'];
  var btns = {
    services: document.getElementById('tabTelServices'),
    offres: document.getElementById('tabTelOffres'),
    qualite: document.getElementById('tabTelQualite'),
    infos: document.getElementById('tabTelInfos')
  };
  var contents = {
    services: document.getElementById('telContentServices'),
    offres: document.getElementById('telContentOffres'),
    qualite: document.getElementById('telContentQualite'),
    infos: document.getElementById('telContentInfos')
  };

  tabs.forEach(function(t) {
    if (contents[t]) contents[t].style.display = (t === tab) ? 'block' : 'none';
    if (btns[t]) {
      btns[t].style.color = (t === tab) ? '#007fff' : '#94a3b8';
      btns[t].style.borderBottomColor = (t === tab) ? '#007fff' : 'transparent';
    }
  });
};
