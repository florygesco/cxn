(async function(){
    try{
        const appMod=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js');
        const fsMod=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js');
        const authMod=await import('https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js');
        const c=window.__n;
        const app=appMod.initializeApp({
            apiKey:c.k,
            authDomain:c.a,
            projectId:c.p,
            storageBucket:c.s,
            messagingSenderId:c.m,
            appId:c.i
        });
        window.backend=app;
        window.db=fsMod.getFirestore(app);
        window.auth=authMod.getAuth(app);
        window.__fs=fsMod;
        window.__auth=authMod;
        window.APP_DATA=null;
        window.backendReady=true;
    }catch(e){
        window.backendReady=false;
    }
})();
