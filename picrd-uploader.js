async function uploadToPicrd(file, options) {
  options = options || {};
  if (!file) throw new Error('Aucun fichier fourni');
  if (file.size > MAX_SIZE) throw new Error('Image trop volumineuse (max 10 Mo). Votre fichier : ' + (file.size/1024/1024).toFixed(2) + ' Mo');
  if (!ALLOWED_TYPES.includes(file.type)) throw new Error('Format non supporté (' + file.type + '). Utilisez PNG, JPEG, WebP ou GIF');

  const fd = new FormData();
  fd.append('file', file);
  fd.append('visibility', options.visibility || 'unlisted');
  if (options.ttl_seconds) fd.append('ttl_seconds', String(options.ttl_seconds));
  if (options.album_id) fd.append('album_id', options.album_id);

  let res;
  try {
    res = await fetch(PICRD_UPLOAD_URL, { method: 'POST', body: fd });
  } catch (networkError) {
    throw new Error('Erreur réseau : ' + networkError.message + ' — Vérifiez votre connexion mobile');
  }

  const responseText = await res.text();

  if (!res.ok) {
    if (res.status === 429) throw new Error('Limite atteinte (60/heure). Réessayez plus tard.');
    if (res.status === 400) throw new Error('Fichier refusé par picrd. Réponse : ' + responseText.substring(0, 200));
    if (res.status === 0) throw new Error('CORS bloqué ou réseau coupé. Réessayez en WiFi.');
    throw new Error('Erreur HTTP ' + res.status + ' : ' + responseText.substring(0, 200));
  }

  try {
    return JSON.parse(responseText);
  } catch (e) {
    throw new Error('Réponse invalide de picrd : ' + responseText.substring(0, 200));
  }
}
