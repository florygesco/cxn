import { doc, setDoc, serverTimestamp } from "firebase/firestore";

const REF_PRESENCE = (db) => doc(db, "presence_global", "etat");

async function signalerPresence(db, ecoleId, ecoleNom, profId, profNom, actif) {
  if (!ecoleId || !profId || !profNom) return;
  try {
    await setDoc(
      REF_PRESENCE(db),
      {
        ecoles: {
          [ecoleId]: {
            nom: ecoleNom,
            profs: {
              [profId]: {
                nom: profNom,
                actif: actif === true,
                lastSeen: serverTimestamp()
              }
            }
          }
        },
        updatedAt: serverTimestamp()
      },
      { merge: true }
    );
  } catch (e) {}
}

const DELAI_INACTIVITE_MS = 5 * 60 * 1000;
const DELAI_MIN_ENTRE_ENVOIS = 3000;

export function demarrerSuiviActivite(db, ecoleId, ecoleNom, profId, profNom) {
  let statutActuel = null;
  let timerInactivite = null;
  let dernierEnvoi = 0;
  let arrete = false;

  async function envoyer(nouveauStatut) {
    if (arrete) return;
    if (nouveauStatut === statutActuel) return;
    const maintenant = Date.now();
    if (maintenant - dernierEnvoi < DELAI_MIN_ENTRE_ENVOIS) return;
    statutActuel = nouveauStatut;
    dernierEnvoi = maintenant;
    await signalerPresence(db, ecoleId, ecoleNom, profId, profNom, nouveauStatut);
  }

  function marquerActif() {
    if (arrete) return;
    clearTimeout(timerInactivite);
    envoyer(true);
    timerInactivite = setTimeout(() => {
      envoyer(false);
    }, DELAI_INACTIVITE_MS);
  }

  function marquerInactifImmediat() {
    clearTimeout(timerInactivite);
    envoyer(false);
  }

  function surActivite() {
    if (document.hidden) return;
    marquerActif();
  }

  function surVisibilite() {
    if (document.hidden) {
      marquerInactifImmediat();
    } else {
      marquerActif();
    }
  }

  function surFermeture() {
    marquerInactifImmediat();
  }

  document.addEventListener("mousemove", surActivite, { passive: true });
  document.addEventListener("mousedown", surActivite, { passive: true });
  document.addEventListener("keydown", surActivite, { passive: true });
  document.addEventListener("touchstart", surActivite, { passive: true });
  document.addEventListener("touchmove", surActivite, { passive: true });
  document.addEventListener("scroll", surActivite, { passive: true, capture: true });
  document.addEventListener("wheel", surActivite, { passive: true });
  document.addEventListener("visibilitychange", surVisibilite);
  window.addEventListener("beforeunload", surFermeture);
  window.addEventListener("pagehide", surFermeture);

  marquerActif();

  return function arreterSuivi() {
    arrete = true;
    clearTimeout(timerInactivite);
    document.removeEventListener("mousemove", surActivite);
    document.removeEventListener("mousedown", surActivite);
    document.removeEventListener("keydown", surActivite);
    document.removeEventListener("touchstart", surActivite);
    document.removeEventListener("touchmove", surActivite);
    document.removeEventListener("scroll", surActivite, { capture: true });
    document.removeEventListener("wheel", surActivite);
    document.removeEventListener("visibilitychange", surVisibilite);
    window.removeEventListener("beforeunload", surFermeture);
    window.removeEventListener("pagehide", surFermeture);
    arrete = false;
    marquerInactifImmediat();
    arrete = true;
  };
}
