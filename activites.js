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

export function demarrerSuiviActivite(db, ecoleId, ecoleNom, profId, profNom) {
  let arrete = false;

  async function envoyer(actif) {
    if (arrete) return;
    await signalerPresence(db, ecoleId, ecoleNom, profId, profNom, actif);
  }

  function surVisibilite() {
    if (document.hidden) {
      envoyer(false);
    } else {
      envoyer(true);
    }
  }

  function surFermeture() {
    envoyer(false);
  }

  document.addEventListener("visibilitychange", surVisibilite);
  window.addEventListener("beforeunload", surFermeture);
  window.addEventListener("pagehide", surFermeture);

  envoyer(true);

  return function arreterSuivi() {
    arrete = true;
    document.removeEventListener("visibilitychange", surVisibilite);
    window.removeEventListener("beforeunload", surFermeture);
    window.removeEventListener("pagehide", surFermeture);
    envoyer(false);
  };
}
