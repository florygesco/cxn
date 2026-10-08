(function(){
  'use strict';

  const PICRD_UPLOAD_URL = 'https://picrd.com/api/upload';
  const MAX_SIZE = 10 * 1024 * 1024;
  const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'];

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

  async function compresser(file, maxWidth, quality) {
    maxWidth = maxWidth || 1200;
    quality = quality || 0.85;

    return new Promise(function(resolve, reject) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          const ratio = Math.min(maxWidth / img.width, maxWidth / img.height, 1);
          canvas.width = Math.round(img.width * ratio);
          canvas.height = Math.round(img.height * ratio);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(function(blob) {
            if (blob) resolve(new File([blob], file.name || 'image.jpg', { type: 'image/jpeg' }));
            else reject(new Error('Compression échouée'));
          }, 'image/jpeg', quality);
        };
        img.onerror = function() { reject(new Error('Image invalide')); };
        img.src = ev.target.result;
      };
      reader.onerror = function() { reject(new Error('Lecture échouée')); };
      reader.readAsDataURL(file);
    });
  }

  async function compressAndUpload(file, maxWidth, quality) {
    const compressed = await compresser(file, maxWidth, quality);
    return uploadToPicrd(compressed, { visibility: 'public' });
  }

  async function uploadBase64(base64String, options) {
    if (!base64String) throw new Error('Aucune donnée');
    if (base64String.startsWith('http://') || base64String.startsWith('https://')) {
      return { image_url: base64String, already_hosted: true };
    }
    const res = await fetch(base64String);
    const blob = await res.blob();
    return uploadToPicrd(blob, options || {});
  }

  async function uploadWithFallback(file, options) {
    try {
      const result = await uploadToPicrd(file, Object.assign({ visibility: 'public' }, options || {}));
      return {
        url: result.image_url,
        mode: 'picrd',
        delete_url: result.delete_url,
        image_id: result.image_id,
        page_url: result.page_url
      };
    } catch (err) {
      console.warn('[picrd] fallback base64 activé:', err.message);
      const dataUrl = await new Promise(function(resolve) {
        const reader = new FileReader();
        reader.onload = function(e) { resolve(e.target.result); };
        reader.readAsDataURL(file);
      });
      return { url: dataUrl, mode: 'base64', delete_url: null, image_id: null };
    }
  }

  window.picrd = {
    upload: uploadToPicrd,
    uploadBase64: uploadBase64,
    compressAndUpload: compressAndUpload,
    uploadWithFallback: uploadWithFallback,
    compress: compresser
  };

  console.log('✅ picrd-uploader chargé');
})();
