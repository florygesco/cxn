window.BANQUES_DATA = [];

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
        id: d.id,
        nom: v.nom || '',
        slogan: v.slogan || '',
        ville: v.ville || '',
        services: v.services || [],
        description: v.description || '',
        telephone: v.telephone || '',
        siteWeb: v.siteWeb || '',
        imageUrl: v.imageUrl || '',
        logoUrl: v.logoUrl || '',
        anneeCreation: v.anneeCreation || '',
        nombreAgences: v.nombreAgences || 0,
        nombreClients: v.nombreClients || '0',
        moyenneGlobale: v.moyenneGlobale || 0,
        nombreNotesGlobal: v.nombreNotesGlobal || 0,
        agences: v.agences || [],
        contactActif: v.contactActif === true,
        verifie: v.verifie === true
      });
    });
    banques.sort(function(a, b) { return (b.moyenneGlobale || 0) - (a.moyenneGlobale || 0); });
    await setCachedList('cache_banques', banques);
    return banques;
  } catch (e) {
    var cached = await getCachedList('cache_banques');
    return cached || [];
  }
};

window.ouvrirFicheBanque = function(banqueId) {
  var banque = window.BANQUES_DATA.find(function(b) { return b.id === banqueId; });
  if (!banque) { showToast('Banque introuvable'); return; }

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

  if (elHeroImg) elHeroImg.src = banque.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop';
  if (elHeroName) elHeroName.textContent = banque.nom;
  if (elLogo) elLogo.src = banque.logoUrl || '';
  if (elName) elName.textContent = banque.nom;
  if (elSlogan) elSlogan.textContent = banque.slogan || 'La banque de vos ambitions';
  if (elRating) elRating.textContent = (banque.moyenneGlobale || 0).toFixed(1) + '/5';
  if (elReviews) elReviews.textContent = '(' + (banque.nombreNotesGlobal || 0) + ' avis)';
  if (elDesc) elDesc.textContent = banque.description || '';
  if (elYears) elYears.textContent = 'Depuis ' + (banque.anneeCreation || 'N/A');
  if (elAgencies) elAgencies.textContent = '+' + (banque.nombreAgences || 0) + ' en RDC';
  if (elClients) elClients.textContent = '+' + (banque.nombreClients || '0');

  var agences = banque.agences || [];
  if (elCount) elCount.textContent = agences.length;
  if (elList) {
    elList.innerHTML = agences.map(function(a) {
      return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center;">' +
        '<div><div style="font-size:15px; font-weight:900; color:#0f172a;">' + (a.nom || '') + '</div>' +
        '<div style="font-size:13px; color:#64748b;">' + (a.adresse || '') + '</div></div>' +
        '<i class="fa-solid fa-chevron-right" style="color:#cbd5e1;"></i></div>';
    }).join('');
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
    if (b) {
      b.style.color = '#94a3b8';
      b.style.borderBottomColor = 'transparent';
    }
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
  showToast("Redirection vers le site officiel...");
};

window.toggleFavoriBanque = function() {
  showToast("Ajouté aux favoris !");
};
