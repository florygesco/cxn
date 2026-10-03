async function waitBackend() {
    for (let i = 0; i < 50; i++) {
        if (window.backendReady === true && window.db && window.auth) return true;
        await new Promise(r => setTimeout(r, 100));
    }
    return false;
}

async function createUser(data) {
    await waitBackend();
    const fs = window.__fs, auth = window.__auth;
    const cred = await auth.createUserWithEmailAndPassword(
        window.auth, data.email, data.password
    );
    const uid = cred.user.uid;
    await fs.setDoc(fs.doc(window.db, 'netubers', uid), {
        prenom: data.prenom || '',
        nom: data.nom || '',
        nomComplet: data.nomComplet || '',
        phone: data.phone || '',
        emailAuth: data.email,
        code: data.password,
        ville: data.ville || '',
        quartier: '',
        role: 'user',
        actif: true,
        dateCreation: new Date().toISOString(),
        stats: { deblocages: 0, commandes: 0, parrainage: 0, jetons: 0, badges: [] },
        notifications: []
    });
    return { uid: uid, code: data.password };
}

async function loginByPhoneCode(phone, code) {
    await waitBackend();
    const fs = window.__fs, auth = window.__auth;
    const q = fs.query(
        fs.collection(window.db, 'netubers'),
        fs.where('phone', '==', phone),
        fs.where('code', '==', code)
    );
    const snap = await fs.getDocs(q);
    if (snap.empty) return null;
    const d = snap.docs[0];
    const data = d.data();
    if (data.emailAuth) {
        try {
            await auth.signInWithEmailAndPassword(window.auth, data.emailAuth, code);
        } catch (e) { return null; }
    }
    return {
        uid: d.id, id: d.id,
        nomComplet: data.nomComplet, name: data.nomComplet,
        phone: data.phone, code: data.code,
        email: data.emailAuth, emailAuth: data.emailAuth,
        ville: data.ville, role: data.role
    };
}

async function updatePhone(uid, nouveauPhone) {
    await waitBackend();
    const fs = window.__fs;
    await fs.updateDoc(
        fs.doc(window.db, 'netubers', uid),
        { phone: nouveauPhone }
    );
    return { success: true, phone: nouveauPhone };
}

async function getUserById(uid) {
    await waitBackend();
    const fs = window.__fs;
    const snap = await fs.getDoc(fs.doc(window.db, 'netubers', uid));
    if (!snap.exists()) return null;
    return { uid: snap.id, ...snap.data() };
}

async function logoutUser() {
    try { await window.__auth.signOut(window.auth); } catch (e) {}
}

window.createUser = createUser;
window.loginByPhoneCode = loginByPhoneCode;
window.updatePhone = updatePhone;
window.getUserById = getUserById;
window.logoutUser = logoutUser;
