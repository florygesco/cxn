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

  var page = document.getElementById('page-banque-detail');
  if (!page) return;

  var starsHtml = '';
  for (var i = 1; i <= 5; i++) {
    starsHtml += i <= Math.round(calc.moyenne) 
      ? '<i class="fa-solid fa-star" style="color:#fbbf24;font-size:14px;"></i>' 
      : '<i class="fa-regular fa-star" style="color:#cbd5e1;font-size:14px;"></i>';
  }

  var agencesHtml = (banque.agences || []).map(function(a) {
    return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
      '<div style="display:flex; gap:12px; align-items:center;">' +
        '<div style="width:36px; height:36px; border-radius:50%; background:#eff6ff; color:#007fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-location-dot"></i></div>' +
        '<div><div style="font-size:15px; font-weight:900; color:#0f172a;">' + (a.nom || 'Agence') + '</div>' +
        '<div style="font-size:13px; color:#64748b;">' + (a.adresse || '') + '</div></div></div>' +
      '<i class="fa-solid fa-chevron-right" style="color:#cbd5e1;"></i></div>';
  }).join('');

  var servicesHtml = (banque.services || []).map(function(s) {
    return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">' +
      '<div style="width:40px; height:40px; border-radius:50%; background:#eff6ff; color:#007fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-check"></i></div>' +
      '<div style="font-size:15px; font-weight:800; color:#0f172a;">' + s + '</div></div>';
  }).join('');

  var offresHtml = (banque.offres || []).map(function(o) {
    return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
      '<div style="display:flex; gap:12px; align-items:center;">' +
        '<div style="width:40px; height:40px; border-radius:50%; background:#fef2f2; color:#ef4444; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-gift"></i></div>' +
        '<div><div style="font-size:15px; font-weight:900; color:#0f172a;">' + (o.titre || 'Offre') + '</div>' +
        '<div style="font-size:13px; color:#64748b;">' + (o.description || '') + '</div></div></div>' +
      '<i class="fa-solid fa-chevron-right" style="color:#cbd5e1;"></i></div>';
  }).join('');

  page.innerHTML = `
    <div style="position:relative; width:100%; height:200px; background:#1e3a8a;">
      <img src="${banque.imageUrl || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop'}" style="width:100%; height:100%; object-fit:cover; opacity:0.8;">
      <div style="position:absolute; inset:0; background:linear-gradient(to bottom, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.8) 100%);"></div>
      <button onclick="go('ecoles')" style="position:absolute; top:16px; left:16px; width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,0.9); border:none; font-size:18px; color:#0f172a; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.15);"><i class="fa-solid fa-arrow-left"></i></button>
      <div style="position:absolute; top:16px; right:16px; display:flex; gap:10px;">
        <button onclick="toggleFavoriBanque()" style="width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,0.9); border:none; font-size:18px; color:#ef4444; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.15);"><i class="fa-regular fa-heart"></i></button>
        <button style="width:40px; height:40px; border-radius:50%; background:rgba(255,255,255,0.9); border:none; font-size:18px; color:#007fff; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 2px 8px rgba(0,0,0,0.15);"><i class="fa-solid fa-share-nodes"></i></button>
      </div>
      <div style="position:absolute; bottom:16px; left:20px; right:20px;">
        <h1 style="font-size:24px; font-weight:900; color:#fff; margin:0; text-shadow:0 2px 4px rgba(0,0,0,0.5);">${banque.nom}</h1>
      </div>
    </div>

    <div style="background:#fff; padding:12px 16px; border-bottom:1px solid #e2e8f0; position:sticky; top:0; z-index:20;">
      <div style="display:flex; align-items:center; background:#f1f5f9; border-radius:12px; padding:12px 16px;">
        <i class="fa-solid fa-magnifying-glass" style="color:#94a3b8; margin-right:12px;"></i>
        <input type="text" placeholder="Rechercher une agence, un service..." style="border:none; background:transparent; outline:none; width:100%; font-size:15px; color:#0f172a; font-weight:500;">
      </div>
    </div>

    <div style="padding:16px; max-width:800px; margin:0 auto;">
      <div style="background:#fff; border-radius:20px; padding:20px; box-shadow:0 4px 15px rgba(0,0,0,0.03); margin-bottom:16px; border:1px solid #e2e8f0;">
        <div style="display:flex; gap:16px; align-items:flex-start;">
          <div style="width:72px; height:72px; border-radius:16px; background:#f8fafc; display:flex; align-items:center; justify-content:center; border:1px solid #e2e8f0; overflow:hidden; flex-shrink:0;">
            <img src="${banque.logoUrl || ''}" style="width:100%; height:100%; object-fit:contain; padding:8px;">
          </div>
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <h2 style="font-size:20px; font-weight:900; color:#0f172a; margin:0;">${banque.nom}</h2>
              <span style="background:#ecfdf5; color:#065f46; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:900; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-circle-check"></i> Profil vérifié</span>
            </div>
            <p style="font-size:13px; color:#64748b; margin:6px 0 8px 0;">${banque.slogan || 'La banque de vos ambitions'}</p>
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <div style="display:flex; gap:2px;">${starsHtml}</div>
              <span style="background:#00b67a; color:#fff; padding:3px 8px; border-radius:6px; font-weight:900; font-size:12px;">${calc.moyenne.toFixed(1)}/5</span>
              <span style="font-size:12px; color:#64748b; font-weight:600;">(${calc.total} avis)</span>
            </div>
          </div>
        </div>
        <p style="font-size:13px; color:#475569; line-height:1.6; margin-top:16px;">${banque.description || ''}</p>
        <button onclick="ouvrirNotationUniverselle('banque', '${banque.nom}')" style="width:100%; margin-top:16px; padding:12px; border-radius:12px; background:#f8fafc; color:#0f172a; font-weight:900; font-size:14px; border:1px solid #e2e8f0; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
          <i class="fa-solid fa-star" style="color:#fbbf24;"></i> Noter cette banque
        </button>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:20px;">
        <div style="background:#fff; padding:16px 8px; border-radius:16px; text-align:center; border:1px solid #e2e8f0;">
          <i class="fa-solid fa-calendar" style="color:#007fff; font-size:20px; margin-bottom:8px;"></i>
          <div style="font-size:11px; color:#64748b; font-weight:700;">Années d'activité</div>
          <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">Depuis ${banque.anneeCreation || 'N/A'}</div>
        </div>
        <div style="background:#fff; padding:16px 8px; border-radius:16px; text-align:center; border:1px solid #e2e8f0;">
          <i class="fa-solid fa-building" style="color:#007fff; font-size:20px; margin-bottom:8px;"></i>
          <div style="font-size:11px; color:#64748b; font-weight:700;">Agences</div>
          <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">+${banque.nombreAgences || 0} en RDC</div>
        </div>
        <div style="background:#fff; padding:16px 8px; border-radius:16px; text-align:center; border:1px solid #e2e8f0;">
          <i class="fa-solid fa-users" style="color:#007fff; font-size:20px; margin-bottom:8px;"></i>
          <div style="font-size:11px; color:#64748b; font-weight:700;">Clients</div>
          <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">+${banque.nombreClients || 0}</div>
        </div>
      </div>

      <div style="display:flex; border-bottom:1.5px solid #e2e8f0; margin-bottom:16px; gap:24px; overflow-x:auto;">
        <button onclick="switchBankTab('agences')" id="btnTabAgences" style="padding:10px 0; font-weight:800; font-size:14px; color:#007fff; border-bottom:3px solid #007fff; background:transparent; border:none; cursor:pointer; white-space:nowrap;">Agences</button>
        <button onclick="switchBankTab('services')" id="btnTabServices" style="padding:10px 0; font-weight:800; font-size:14px; color:#94a3b8; border-bottom:3px solid transparent; background:transparent; border:none; cursor:pointer; white-space:nowrap;">Services</button>
        <button onclick="switchBankTab('offres')" id="btnTabOffres" style="padding:10px 0; font-weight:800; font-size:14px; color:#94a3b8; border-bottom:3px solid transparent; background:transparent; border:none; cursor:pointer; white-space:nowrap;">Offres</button>
      </div>

      <div id="bankTabContentAgences">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h3 style="font-size:15px; font-weight:900; color:#0f172a; margin:0;">Nos agences (${(banque.agences || []).length})</h3>
          <span style="font-size:13px; color:#007fff; font-weight:800;">Voir tout</span>
        </div>
        <div style="display:flex; flex-direction:column;">${agencesHtml || '<div style="text-align:center; color:#64748b; padding:20px;">Aucune agence répertoriée.</div>'}</div>
      </div>

      <div id="bankTabContentServices" style="display:none;">
        <h3 style="font-size:15px; font-weight:900; color:#0f172a; margin-bottom:12px;">Services proposés</h3>
        <div style="display:flex; flex-direction:column;">${servicesHtml || '<div style="text-align:center; color:#64748b; padding:20px;">Aucun service spécifié.</div>'}</div>
      </div>

      <div id="bankTabContentOffres" style="display:none;">
        <h3 style="font-size:15px; font-weight:900; color:#0f172a; margin-bottom:12px;">Offres et produits</h3>
        <div style="display:flex; flex-direction:column;">${offresHtml || '<div style="text-align:center; color:#64748b; padding:20px;">Aucune offre disponible.</div>'}</div>
      </div>
    </div>

    <div style="position:fixed; bottom:0; left:0; right:0; background:#fff; padding:16px; border-top:1px solid #e2e8f0; display:flex; gap:12px; z-index:100;">
      <button onclick="ouvrirSiteBanque()" style="flex:1; padding:16px; border-radius:14px; background:#007fff; color:#fff; font-weight:900; font-size:15px; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; box-shadow:0 4px 12px rgba(0,127,255,0.3);">
        Visiter le site web <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:14px;"></i>
      </button>
    </div>
  `;
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
