<div id="page-telecom-detail" class="page">
  <div style="position:relative; width:100%; height:80px; background:#1e3a8a; display:flex; align-items:center; padding:0 16px;">
    <button onclick="go('ecoles')" style="background:transparent; border:none; color:#fff; font-size:20px; cursor:pointer;"><i class="fa-solid fa-arrow-left"></i></button>
    <h1 id="telecomHeaderName" style="color:#fff; font-size:18px; font-weight:900; margin-left:16px;">Opérateur</h1>
    <div style="margin-left:auto; display:flex; gap:16px;">
      <button style="background:transparent; border:none; color:#fff; font-size:20px;"><i class="fa-regular fa-heart"></i></button>
      <button style="background:transparent; border:none; color:#fff; font-size:20px;"><i class="fa-solid fa-share-nodes"></i></button>
    </div>
  </div>

  <div style="padding:16px; background:#f8fafc;">
    <div style="background:#fff; border-radius:16px; padding:20px; box-shadow:0 4px 12px rgba(0,0,0,0.05); margin-bottom:16px;">
      <div style="display:flex; gap:16px;">
        <div id="telecomLogo" style="width:64px; height:64px; border-radius:12px; background:#f1f5f9; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:900; color:#e11d48; overflow:hidden;">Airtel</div>
        <div style="flex:1;">
          <h2 id="telecomName" style="font-size:20px; font-weight:900; color:#0f172a; margin:0 0 4px 0;">Airtel RDC</h2>
          <div style="display:inline-flex; align-items:center; gap:6px; background:#ecfdf5; color:#065f46; padding:4px 10px; border-radius:20px; font-size:12px; font-weight:800; margin-bottom:8px;">
            <i class="fa-solid fa-circle-check"></i> Profil vérifié
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="color:#fbbf24; font-size:16px;">★★★★★</span>
            <span style="font-size:14px; font-weight:900; color:#0f172a;" id="telecomRating">4.3/5</span>
            <span style="font-size:13px; color:#64748b;" id="telecomReviewsCount">(1 248 avis)</span>
          </div>
        </div>
      </div>
      <p id="telecomDesc" style="font-size:14px; color:#334155; line-height:1.6; margin-top:16px;"></p>
    </div>

    <div style="background:#1e3a8a; border-radius:16px; overflow:hidden; position:relative; margin-bottom:16px; height:160px;">
      <img id="telecomBanner" src="" style="width:100%; height:100%; object-fit:cover; opacity:0.8;">
    </div>

    <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:16px; text-align:center;">
      <div style="background:#fff; padding:12px; border-radius:12px; border:1px solid #e2e8f0;">
        <i class="fa-solid fa-tower-cell" style="color:#007fff; font-size:20px; margin-bottom:6px;"></i>
        <div style="font-size:12px; color:#64748b; font-weight:700;">Agences</div>
        <div id="telecomAgencies" style="font-size:14px; font-weight:900; color:#0f172a;">+250</div>
      </div>
      <div style="background:#fff; padding:12px; border-radius:12px; border:1px solid #e2e8f0;">
        <i class="fa-solid fa-map" style="color:#007fff; font-size:20px; margin-bottom:6px;"></i>
        <div style="font-size:12px; color:#64748b; font-weight:700;">Couverture</div>
        <div id="telecomCoverage" style="font-size:14px; font-weight:900; color:#0f172a;">Toute la RDC</div>
      </div>
      <div style="background:#fff; padding:12px; border-radius:12px; border:1px solid #e2e8f0;">
        <i class="fa-solid fa-users" style="color:#007fff; font-size:20px; margin-bottom:6px;"></i>
        <div style="font-size:12px; color:#64748b; font-weight:700;">Clients</div>
        <div id="telecomClients" style="font-size:14px; font-weight:900; color:#0f172a;">+10M</div>
      </div>
    </div>

    <div style="display:flex; border-bottom:2px solid #e2e8f0; margin-bottom:16px;">
      <button onclick="switchTelecomTab('services')" id="tabTelServices" style="flex:1; padding:12px; font-weight:800; color:#007fff; border-bottom:3px solid #007fff; background:transparent; border-top:none; border-left:none; border-right:none; cursor:pointer;">Services</button>
      <button onclick="switchTelecomTab('reseau')" id="tabTelReseau" style="flex:1; padding:12px; font-weight:800; color:#94a3b8; border-bottom:3px solid transparent; background:transparent; border-top:none; border-left:none; border-right:none; cursor:pointer;">Qualité</button>
      <button onclick="switchTelecomTab('infos')" id="tabTelInfos" style="flex:1; padding:12px; font-weight:800; color:#94a3b8; border-bottom:3px solid transparent; background:transparent; border-top:none; border-left:none; border-right:none; cursor:pointer;">Infos</button>
    </div>

    <div id="telContentServices">
      <h3 style="font-size:16px; font-weight:900; color:#0f172a; margin-bottom:12px;">Services proposés</h3>
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">
        <div style="width:40px; height:40px; border-radius:50%; background:#fee2e2; color:#e11d48; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-phone"></i></div>
        <div><div style="font-size:15px; font-weight:900; color:#0f172a;">Appels</div><div style="font-size:13px; color:#64748b;">Voix et appels internationaux</div></div>
      </div>
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">
        <div style="width:40px; height:40px; border-radius:50%; background:#fef3c7; color:#d97706; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-comment-dots"></i></div>
        <div><div style="font-size:15px; font-weight:900; color:#0f172a;">SMS</div><div style="font-size:13px; color:#64748b;">SMS classiques et internationaux</div></div>
      </div>
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; align-items:center; gap:12px; margin-bottom:10px;">
        <div style="width:40px; height:40px; border-radius:50%; background:#e0f2fe; color:#0284c7; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-wifi"></i></div>
        <div><div style="font-size:15px; font-weight:900; color:#0f172a;">Internet mobile</div><div style="font-size:13px; color:#64748b;">4G/5G, internet haut débit</div></div>
      </div>
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; align-items:center; gap:12px;">
        <div style="width:40px; height:40px; border-radius:50%; background:#fce7f3; color:#db2777; display:flex; align-items:center; justify-content:center;"><i class="fa-solid fa-money-bill-transfer"></i></div>
        <div><div style="font-size:15px; font-weight:900; color:#0f172a;">Mobile Money</div><div style="font-size:13px; color:#64748b;">Transferts et paiements</div></div>
      </div>
    </div>

    <div id="telContentReseau" style="display:none;">
      <h3 style="font-size:16px; font-weight:900; color:#0f172a; margin-bottom:12px;">Qualité du réseau</h3>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px;">
          <div style="font-size:13px; color:#64748b; font-weight:700; margin-bottom:4px;"><i class="fa-solid fa-phone"></i> Appels</div>
          <div id="telNoteAppels" style="font-size:20px; font-weight:900; color:#0f172a;">0/5</div>
        </div>
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px;">
          <div style="font-size:13px; color:#64748b; font-weight:700; margin-bottom:4px;"><i class="fa-solid fa-wifi"></i> Internet</div>
          <div id="telNoteInternet" style="font-size:20px; font-weight:900; color:#0f172a;">0/5</div>
        </div>
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px;">
          <div style="font-size:13px; color:#64748b; font-weight:700; margin-bottom:4px;"><i class="fa-solid fa-shield"></i> Stabilité</div>
          <div id="telNoteStabilite" style="font-size:20px; font-weight:900; color:#0f172a;">0/5</div>
        </div>
        <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px;">
          <div style="font-size:13px; color:#64748b; font-weight:700; margin-bottom:4px;"><i class="fa-solid fa-clock"></i> Disponibilité</div>
          <div id="telNoteDisponibilite" style="font-size:20px; font-weight:900; color:#0f172a;">0/5</div>
        </div>
      </div>
    </div>

    <div id="telContentInfos" style="display:none;">
      <h3 style="font-size:16px; font-weight:900; color:#0f172a; margin-bottom:12px;">Informations pratiques</h3>
      <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:16px; display:flex; flex-direction:column; gap:12px;">
        <div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-globe" style="color:#007fff; width:20px;"></i> <span id="telInfoSite" style="font-size:14px; font-weight:700; color:#334155;">—</span></div>
        <div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-phone" style="color:#007fff; width:20px;"></i> <span id="telInfoTel" style="font-size:14px; font-weight:700; color:#334155;">—</span></div>
        <div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-location-dot" style="color:#007fff; width:20px;"></i> <span id="telInfoVilles" style="font-size:14px; font-weight:700; color:#334155;">—</span></div>
        <div style="display:flex; align-items:center; gap:10px;"><i class="fa-solid fa-clock" style="color:#007fff; width:20px;"></i> <span id="telInfoHoraires" style="font-size:14px; font-weight:700; color:#334155;">—</span></div>
      </div>
    </div>
  </div>
</div>
