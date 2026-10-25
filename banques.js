window.BANQUES_DATA = [];
window.CURRENT_BANQUE_ID = null;

window.chargerBanquesFirestore = async function(forceRefresh) {
  if (!forceRefresh) {
    var cached = await getCachedList('cache_banques');
    if (cached && Array.isArray(cached)) return cached;
  }
  try {
    var snap = await getDocs(collection(db, 'banques'));
    var banques = [];
    snap.forEach(function(d) {
      var v = d.data();
      banques.push({
        id: d.id, nom: v.nom || '', slogan: v.slogan || '', ville: v.ville || '',
        services: v.services || [], description: v.description || '', telephone: v.telephone || '',
        siteWeb: v.siteWeb || '', imageUrl: v.imageUrl || '', logoUrl: v.logoUrl || '',
        anneeCreation: v.anneeCreation || '', nombreAgences: v.nombreAgences || 0,
        nombreClients: v.nombreClients || '0', agences: v.agences || [], offres: v.offres || [],
        contactActif: v.contactActif === true, verifie: v.verifie === true
      });
    });
    await setCachedList('cache_banques', banques);
    return banques;
  } catch (e) {
    var cached = await getCachedList('cache_banques');
    return cached || [];
  }
};

window.chargerNotesBanques = async function(banqueId) {
  try {
    var q = window.query(window.collection(window.db, 'notes_banques'), window.where('banqueId', '==', banqueId));
    var snap = await window.getDocs(q);
    var notes = [];
    snap.forEach(function(d) { notes.push(Object.assign({ id: d.id }, d.data())); });
    return notes;
  } catch (e) { return []; }
};

window.calculerMoyenneBanque = function(notes) {
  if (!notes || notes.length === 0) return { moyenne: 0, total: 0 };
  var somme = 0;
  notes.forEach(function(n) { somme += Number(n.etoiles) || 0; });
  return { moyenne: Math.round((somme / notes.length) * 10) / 10, total: notes.length };
};

window.aDejaNoteBanque = async function(banqueId) {
  if (!window.CURRENT_ACCOUNT) return null;
  try {
    var docId = banqueId + '_' + window.CURRENT_ACCOUNT.id;
    var snap = await window.getDocRef(window.docRef(window.db, 'notes_banques', docId));
    return snap.exists() ? Object.assign({ id: docId }, snap.data()) : null;
  } catch (e) { return null; }
};

window.noterBanque = async function(banqueId, etoiles) {
  if (!window.CURRENT_ACCOUNT) throw new Error('Non connecté');
  if (!etoiles || etoiles < 1 || etoiles > 5) throw new Error('Note entre 1 et 5');
  var docId = banqueId + '_' + window.CURRENT_ACCOUNT.id;
  var existant = await aDejaNoteBanque(banqueId);
  if (existant && existant.dateModification) {
    var last = new Date(existant.dateModification).getTime();
    var daysSince = (Date.now() - last) / (1000 * 60 * 60 * 24);
    if (daysSince < 7) {
      var reste = Math.ceil(7 - daysSince);
      throw new Error('Modification possible dans ' + reste + ' jour' + (reste > 1 ? 's' : ''));
    }
  }
  await window.setDoc(window.docRef(window.db, 'notes_banques', docId), {
    banqueId: banqueId, uid: window.CURRENT_ACCOUNT.id, etoiles: etoiles,
    dateCreation: existant ? existant.dateCreation : new Date().toISOString(),
    dateModification: new Date().toISOString()
  });
  await window.invaliderCache('cache_banques');
  return true;
};

window.ouvrirFicheBanque = async function(banqueId) {
  var banque = window.BANQUES_DATA.find(function(b) { return b.id === banqueId; });
  if (!banque) { showToast('Banque introuvable'); return; }
  window.CURRENT_BANQUE_ID = banqueId;
  var notes = await window.chargerNotesBanques(banqueId);
  var calc = window.calculerMoyenneBanque(notes);

  var elHeroImg = document.getElementById('bankHeroImg');
  var elHeroName = document.getElementById('bankHeroName');
  var elLogo = document.getElementById('bankLogoImg');
  var elName = document.getElementById('bankNameTitle');
  var elSlogan = document.getElementById('bankSlogan');
  var elRating = document.getElementById('bankRating');
  var elReviews = document.getElementById('bankReviewsCount');
  var elDesc = document.getElementById('bankDescription');
  var elYears = document.getElementById('bankYears');
  var elAgencies = document.getElementById('bankAgencies');
  var elClients = document.getElementById('bankClients');
  var elCount = document.getElementById('bankAgenciesCount');
  var elList = document.getElementById('bankAgenciesList');
  var elStars = document.getElementById('bankStarsDisplay');

  if (elHeroImg) elHeroImg.src = banque.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';
  if (elHeroName) elHeroName.textContent = banque.nom;
  if (elLogo) elLogo.src = banque.logoUrl || '';
  if (elName) elName.textContent = banque.nom;
  if (elSlogan) elSlogan.textContent = banque.slogan || 'La banque de vos ambitions';
  if (elRating) elRating.textContent = calc.moyenne.toFixed(1) + '/5';
  if (elReviews) elReviews.textContent = '(' + calc.total + ' avis)';
  if (elDesc) elDesc.textContent = banque.description || '';
  if (elYears) elYears.textContent = 'Depuis ' + (banque.anneeCreation || 'N/A');
  if (elAgencies) elAgencies.textContent = '+' + (banque.nombreAgences || 0) + ' en RDC';
  if (elClients) elClients.textContent = '+' + (banque.nombreClients || '0');

  if (elStars) {
    var starsHtml = '';
    for (var i = 1; i <= 5; i++) {
      starsHtml += i <= Math.round(calc.moyenne) 
        ? '<i class="fa-solid fa-star" style="color:#fbbf24;font-size:14px;"></i>' 
        : '<i class="fa-regular fa-star" style="color:#cbd5e1;font-size:14px;"></i>';
    }
    elStars.innerHTML = starsHtml;
  }

  var agences = banque.agences || [];
  if (elCount) elCount.textContent = agences.length;
  if (elList) {
    if (agences.length === 0) {
      elList.innerHTML = '<div style="text-align:center; padding:20px; color:#64748b; font-size:14px; background:#fff; border-radius:12px; border:1px solid #e2e8f0;">Aucune agence répertoriée pour le moment.</div>';
    } else {
      elList.innerHTML = agences.map(function(a) {
        return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
          '<div style="display:flex; gap:12px; align-items:center;">' +
            '<div style="width:36px; height:36px; border-radius:50%; background:#eff6ff; color:#007fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-location-dot"></i></div>' +
            '<div><div style="font-size:15px; font-weight:900; color:#0f172a;">' + (a.nom || 'Agence') + '</div>' +
            '<div style="font-size:13px; color:#64748b;">' + (a.adresse || '') + '</div></div></div>' +
          '<i class="fa-solid fa-chevron-right" style="color:#cbd5e1;"></i></div>';
      }).join('');
    }
  }

  var elServices = document.getElementById('bankServicesList');
  if (elServices) {
    var srv = banque.services || [];
    if (srv.length === 0) {
      elServices.innerHTML = '<div style="text-align:center; padding:20px; color:#64748b; font-size:14px; background:#fff; border-radius:12px; border:1px solid #e2e8f0;">Services non spécifiés.</div>';
    } else {
      elServices.innerHTML = srv.map(function(s) {
        return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">' +
          '<div style="width:40px; height:40px; border-radius:50%; background:#eff6ff; color:#007fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-check"></i></div>' +
          '<div style="font-size:15px; font-weight:800; color:#0f172a;">' + s + '</div></div>';
      }).join('');
    }
  }

  var elOffres = document.getElementById('bankOffresList');
  if (elOffres) {
    var off = banque.offres || [];
    if (off.length === 0) {
      elOffres.innerHTML = '<div style="text-align:center; padding:20px; color:#64748b; font-size:14px; background:#fff; border-radius:12px; border:1px solid #e2e8f0;">Aucune offre disponible.</div>';
    } else {
      elOffres.innerHTML = off.map(function(o) {
        return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
          '<div style="display:flex; gap:12px; align-items:center;">' +
            '<div style="width:40px; height:40px; border-radius:50%; background:#fef2f2; color:#ef4444; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-gift"></i></div>' +
            '<div><div style="font-size:15px; font-weight:900; color:#0f172a;">' + (o.titre || 'Offre') + '</div>' +
            '<div style="font-size:13px; color:#64748b;">' + (o.description || '') + '</div></div></div>' +
          '<i class="fa-solid fa-chevron-right" style="color:#cbd5e1;"></i></div>';
      }).join('');
    }
  }

  if (typeof go === 'function') go('banque-detail');
};

window.switchBankTab = function(tab) {
  var tAgences = document.getElementById('bankTabContentAgences');
  var tServices = document.getElementById('bankTabContentServices');
  var tOffres = document.getElementById('bankTabContentOffres');
  var bAgences = document.getElementById('btnTabAgences');
  var bServices = document.getElementById('btnTabServices');
  var bOffres = document.getElementById('btnTabOffres');

  if (tAgences) tAgences.style.display = 'none';
  if (tServices) tServices.style.display = 'none';
  if (tOffres) tOffres.style.display = 'none';
  [bAgences, bServices, bOffres].forEach(function(b) {
    if (b) { b.style.color = '#94a3b8'; b.style.borderBottomColor = 'transparent'; }
  });

  if (tab === 'agences') {
    if (tAgences) tAgences.style.display = 'block';
    if (bAgences) { bAgences.style.color = '#007fff'; bAgences.style.borderBottomColor = '#007fff'; }
  } else if (tab === 'services') {
    if (tServices) tServices.style.display = 'block';
    if (bServices) { bServices.style.color = '#007fff'; bServices.style.borderBottomColor = '#007fff'; }
  } else if (tab === 'offres') {
    if (tOffres) tOffres.style.display = 'block';
    if (bOffres) { bOffres.style.color = '#007fff'; bOffres.style.borderBottomColor = '#007fff'; }
  }
};

window.ouvrirSiteBanque = function() {
  var banque = window.BANQUES_DATA.find(function(b) { return b.id === window.CURRENT_BANQUE_ID; });
  if (banque && banque.siteWeb) window.open(banque.siteWeb, '_blank');
  else showToast("Site web non disponible");
};

window.toggleFavoriBanque = function() { showToast("Ajouté aux favoris !"); };
