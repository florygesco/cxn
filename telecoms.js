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
        id: d.id, nom: v.nom || '', description: v.description || '', telephone: v.telephone || '',
        siteWeb: v.siteWeb || '', ville: v.ville || 'RDC', couverture: v.couverture || 'RDC',
        nombreAgences: v.nombreAgences || 0, nombreClients: v.nombreClients || '0',
        logoUrl: v.logoUrl || '', bannerUrl: v.bannerUrl || '', horaires: v.horaires || '',
        notesReseau: v.notesReseau || {}, services: v.services || [], offres: v.offres || [],
        contactActif: v.contactActif === true, verifie: v.verifie === true
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

  var page = document.getElementById('page-telecom-detail');
  if (!page) return;

  var starsHtml = '';
  for (var i = 1; i <= 5; i++) {
    starsHtml += i <= Math.round(calc.moyenne) 
      ? '<i class="fa-solid fa-star" style="color:#fbbf24;font-size:14px;"></i>' 
      : '<i class="fa-regular fa-star" style="color:#cbd5e1;font-size:14px;"></i>';
  }

  var servicesHtml = (op.services || []).map(function(s) {
    return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">' +
      '<div style="width:40px; height:40px; border-radius:50%; background:#fef2f2; color:#e11d48; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-check"></i></div>' +
      '<div style="font-size:15px; font-weight:800; color:#0f172a;">' + s + '</div></div>';
  }).join('');

  var offresHtml = (op.offres || []).map(function(o) {
    return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">' +
      '<div style="display:flex; gap:12px; align-items:center;">' +
        '<div style="width:40px; height:40px; border-radius:50%; background:#eff6ff; color:#007fff; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fa-solid fa-tags"></i></div>' +
        '<div><div style="font-size:15px; font-weight:900; color:#0f172a;">' + (o.titre || 'Offre') + '</div>' +
        '<div style="font-size:13px; color:#64748b;">' + (o.description || '') + '</div></div></div>' +
      '<i class="fa-solid fa-chevron-right" style="color:#cbd5e1;"></i></div>';
  }).join('');

  var notesRes = op.notesReseau || {};

  page.innerHTML = `
    <div style="background:#0f172a; padding:16px; display:flex; align-items:center; justify-content:space-between; position:sticky; top:0; z-index:50;">
      <button onclick="go('ecoles')" style="background:transparent; border:none; color:#fff; font-size:18px; cursor:pointer;"><i class="fa-solid fa-arrow-left"></i></button>
      <h1 style="font-size:16px; font-weight:800; color:#fff; margin:0;">${op.nom}</h1>
      <div style="display:flex; gap:16px; color:#fff;">
        <button style="background:transparent; border:none; color:#fff; font-size:18px;"><i class="fa-regular fa-heart"></i></button>
        <button style="background:transparent; border:none; color:#fff; font-size:18px;"><i class="fa-solid fa-share-nodes"></i></button>
      </div>
    </div>

    <div style="padding:16px; max-width:800px; margin:0 auto;">
      <div style="background:#fff; border-radius:20px; padding:20px; box-shadow:0 4px 15px rgba(0,0,0,0.03); margin-bottom:16px; border:1px solid #e2e8f0;">
        <div style="display:flex; gap:16px; align-items:flex-start;">
          <div style="width:72px; height:72px; border-radius:16px; background:#f1f5f9; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:900; color:#e11d48; overflow:hidden; flex-shrink:0; border:1px solid #e2e8f0;">
            ${op.logoUrl ? `<img src="${op.logoUrl}" style="width:100%;height:100%;object-fit:contain;padding:8px;">` : (op.nom || '').substring(0, 6)}
          </div>
          <div style="flex:1;">
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <h2 style="font-size:20px; font-weight:900; color:#0f172a; margin:0;">${op.nom}</h2>
              <span style="background:#ecfdf5; color:#065f46; padding:3px 8px; border-radius:6px; font-size:10px; font-weight:900; display:inline-flex; align-items:center; gap:4px;"><i class="fa-solid fa-circle-check"></i> Profil vérifié</span>
            </div>
            <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
              <div style="display:flex; gap:2px;">${starsHtml}</div>
              <span style="font-size:14px; font-weight:900; color:#0f172a;">${calc.moyenne.toFixed(1)}/5</span>
              <span style="font-size:12px; color:#64748b;">(${calc.total} avis)</span>
            </div>
          </div>
        </div>
        <p style="font-size:13px; color:#475569; line-height:1.5; margin-top:16px;">${op.description || ''}</p>
        <button onclick="ouvrirNotationUniverselle('telecom', '${op.nom}')" style="width:100%; margin-top:16px; padding:12px; border-radius:12px; background:#f8fafc; color:#0f172a; font-weight:900; font-size:14px; border:1px solid #e2e8f0; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px;">
          <i class="fa-solid fa-star" style="color:#fbbf24;"></i> Noter cet opérateur
        </button>
      </div>

      <div style="background:#0f172a; border-radius:20px; overflow:hidden; position:relative; margin-bottom:20px; height:140px;">
        <img src="${op.bannerUrl || 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=800&auto=format&fit=crop'}" style="width:100%; height:100%; object-fit:cover; opacity:0.6;">
        <div style="position:absolute; inset:0; display:flex; flex-direction:column; justify-content:center; padding:20px;">
          <h3 style="color:#fff; font-size:22px; font-weight:900; margin:0; line-height:1.2;">Plus proches<br>de vous</h3>
          <div style="background:rgba(255,255,255,0.2); border-radius:8px; padding:10px 12px; margin-top:12px; display:flex; align-items:center; gap:8px; backdrop-filter:blur(4px); border:1px solid rgba(255,255,255,0.3);">
            <i class="fa-solid fa-magnifying-glass" style="color:#fff; font-size:12px;"></i>
            <input type="text" placeholder="Rechercher une agence..." style="background:transparent; border:none; outline:none; color:#fff; font-size:12px; width:100%;">
          </div>
        </div>
      </div>

      <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:20px;">
        <div style="background:#fff; padding:16px 8px; border-radius:16px; text-align:center; border:1px solid #e2e8f0;">
          <i class="fa-solid fa-tower-cell" style="color:#007fff; font-size:20px; margin-bottom:8px;"></i>
          <div style="font-size:11px; color:#64748b; font-weight:700;">Agences</div>
          <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">+${op.nombreAgences || 0}</div>
        </div>
        <div style="background:#fff; padding:16px 8px; border-radius:16px; text-align:center; border:1px solid #e2e8f0;">
          <i class="fa-solid fa-earth-africa" style="color:#007fff; font-size:20px; margin-bottom:8px;"></i>
          <div style="font-size:11px; color:#64748b; font-weight:700;">Pays couverts</div>
          <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">${op.couverture || 'RDC'}</div>
        </div>
        <div style="background:#fff; padding:16px 8px; border-radius:16px; text-align:center; border:1px solid #e2e8f0;">
          <i class="fa-solid fa-users" style="color:#007fff; font-size:20px; margin-bottom:8px;"></i>
          <div style="font-size:11px; color:#64748b; font-weight:700;">Clients</div>
          <div style="font-size:14px; font-weight:900; color:#0f172a; margin-top:2px;">+${op.nombreClients || 0}</div>
        </div>
      </div>

      <div style="display:flex; border-bottom:1.5px solid #e2e8f0; margin-bottom:16px; gap:24px; overflow-x:auto;">
        <button onclick="switchTelecomTab('services')" id="tabTelServices" style="padding:10px 0; font-weight:800; font-size:14px; color:#007fff; border-bottom:3px solid #007fff; background:transparent; border:none; cursor:pointer; white-space:nowrap;">Services</button>
        <button onclick="switchTelecomTab('offres')" id="tabTelOffres" style="padding:10px 0; font-weight:800; font-size:14px; color:#94a3b8; border-bottom:3px solid transparent; background:transparent; border:none; cursor:pointer; white-space:nowrap;">Offres</button>
        <button onclick="switchTelecomTab('qualite')" id="tabTelQualite" style="padding:10px 0; font-weight:800; font-size:14px; color:#94a3b8; border-bottom:3px solid transparent; background:transparent; border:none; cursor:pointer; white-space:nowrap;">Qualité du réseau</button>
        <button onclick="switchTelecomTab('infos')" id="tabTelInfos" style="padding:10px 0; font-weight:800; font-size:14px; color:#94a3b8; border-bottom:3px solid transparent; background:transparent; border:none; cursor:pointer; white-space:nowrap;">Infos</button>
      </div>

      <div id="telContentServices">
        <h3 style="font-size:15px; font-weight:900; color:#0f172a; margin-bottom:12px;"><i class="fa-solid fa-bolt" style="color:#007fff; margin-right:6px;"></i> Services proposés</h3>
        <div style="display:flex; flex-direction:column;">${servicesHtml || '<div style="text-align:center; color:#64748b; padding:20px;">Aucun service spécifié.</div>'}</div>
        <button onclick="ouvrirNotationUniverselle('telecom', '${op.nom}')" style="width:100%; padding:16px; margin-top:16px; border-radius:14px; background:#007fff; color:#fff; font-weight:900; font-size:14px; border:none; cursor:pointer;">Voir le profil complet</button>
      </div>

      <div id="telContentOffres" style="display:none;">
        <h3 style="font-size:15px; font-weight:900; color:#0f172a; margin-bottom:12px;"><i class="fa-solid fa-tags" style="color:#007fff; margin-right:6px;"></i> Offres et forfaits populaires</h3>
        <div style="display:flex; flex-direction:column;">${offresHtml || '<div style="text-align:center; color:#64748b; padding:20px;">Aucune offre disponible.</div>'}</div>
      </div>

      <div id="telContentQualite" style="display:none;">
        <h3 style="font-size:15px; font-weight:900; color:#0f172a; margin-bottom:12px;"><i class="fa-solid fa-chart-simple" style="color:#007fff; margin-right:6px;"></i> Qualité du réseau</h3>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;">
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:16px;">
            <div style="font-size:13px; color:#64748b; font-weight:700; margin-bottom:4px;"><i class="fa-solid fa-phone" style="color:#007fff;"></i> Appels</div>
            <div style="font-size:20px; font-weight:900; color:#0f172a;">${notesRes.appels || 0}/5</div>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:16px;">
            <div style="font-size:13px; color:#64748b; font-weight:700; margin-bottom:4px;"><i class="fa-solid fa-wifi" style="color:#007fff;"></i> Internet</div>
            <div style="font-size:20px; font-weight:900; color:#0f172a;">${notesRes.internet || 0}/5</div>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:16px;">
            <div style="font-size:13px; color:#64748b; font-weight:700; margin-bottom:4px;"><i class="fa-solid fa-shield" style="color:#007fff;"></i> Stabilité</div>
            <div style="font-size:20px; font-weight:900; color:#0f172a;">${notesRes.stabilite || 0}/5</div>
          </div>
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:16px;">
            <div style="font-size:13px; color:#64748b; font-weight:700; margin-bottom:4px;"><i class="fa-solid fa-clock" style="color:#007fff;"></i> Disponibilité</div>
            <div style="font-size:20px; font-weight:900; color:#0f172a;">${notesRes.disponibilite || 0}/5</div>
          </div>
        </div>
      </div>

      <div id="telContentInfos" style="display:none;">
        <h3 style="font-size:15px; font-weight:900; color:#0f172a; margin-bottom:12px;"><i class="fa-solid fa-circle-info" style="color:#007fff; margin-right:6px;"></i> Informations pratiques</h3>
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:16px; padding:16px; display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; align-items:center; gap:12px;"><i class="fa-solid fa-globe" style="color:#007fff; width:20px; text-align:center;"></i> <span style="font-size:14px; font-weight:700; color:#334155;">${op.siteWeb || '—'}</span></div>
          <div style="display:flex; align-items:center; gap:12px;"><i class="fa-solid fa-phone" style="color:#007fff; width:20px; text-align:center;"></i> <span style="font-size:14px; font-weight:700; color:#334155;">${op.telephone || '—'}</span></div>
          <div style="display:flex; align-items:center; gap:12px;"><i class="fa-solid fa-location-dot" style="color:#007fff; width:20px; text-align:center;"></i> <span style="font-size:14px; font-weight:700; color:#334155;">${op.ville || 'RDC'}</span></div>
          <div style="display:flex; align-items:center; gap:12px;"><i class="fa-solid fa-clock" style="color:#007fff; width:20px; text-align:center;"></i> <span style="font-size:14px; font-weight:700; color:#334155;">${op.horaires || '—'}</span></div>
        </div>
      </div>
    </div>
  `;
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
