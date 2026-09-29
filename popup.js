(() => {
  const carousel = document.querySelector('.popup-carousel');
  if (!carousel) return;
  const photos = [
    ['0282', 'Gemstone bracelets on wooden trays at the Kalahari pop-up'],
    ['0278', 'Pearl earrings on brass and wood stands'],
    ['0281', 'Handmade earrings displayed on kraft cards'],
    ['0280', 'Gemstone necklaces beside an open mineral book'],
    ['0274', 'The Kalahari pop-up jewelry table'],
    ['0279', 'A closer look at dangling pearl earrings'],
    ['0273', 'Arranging jewelry at the pop-up']
  ];
  // One key per photo/action keeps unrelated changes in other tabs intact.
  const prefix = 'kalahari:popup:v1:';
  const memory = new Map();
  const posts = carousel.querySelector('.popup-posts');
  const dots = carousel.querySelector('.popup-dots');
  const status = carousel.querySelector('.popup-status');
  const narrow = matchMedia('(max-width:440px)');
  const medium = matchMedia('(max-width:700px)');
  const compact = matchMedia('(max-width:1050px)');
  let index = 0;
  function storageUnavailable() {
    carousel.querySelector('.popup-storage-note').hidden = false;
  }
  function selected(key) {
    if (memory.has(key)) return memory.get(key);
    try { return localStorage.getItem(key) === '1'; }
    catch { storageUnavailable(); return false; }
  }
  function updateButton(button) {
    const active = selected(prefix + button.dataset.id + ':' + button.dataset.action);
    button.setAttribute('aria-pressed', String(active));
    button.title = button.dataset.action === 'liked' ? (active ? 'Unlike photo' : 'Like photo') : (active ? 'Unsave photo' : 'Save photo');
  }
  function render() {
    const count = narrow.matches ? 1 : medium.matches ? 2 : compact.matches ? 3 : 4;
    posts.innerHTML = Array.from({length: count}, (_, offset) => {
      const [id, alt] = photos[(index + offset) % photos.length];
      const position = (index + offset) % photos.length;
      const dotStart = Math.max(0, Math.min(position - 1, photos.length - 3));
      return `<article class="popup-post" aria-label="${alt}">
        <header class="popup-post-header"><img class="popup-avatar" src="assets/popup/profile-logo.png" alt="Kalahari gold monogram" width="40" height="40"><div class="popup-profile"><span class="popup-name">Kalahari</span><span class="popup-location">Handcrafted jewelry</span></div><details class="popup-menu"><summary aria-label="Photo options">⋮</summary><a href="assets/popup/${id}.jpg" target="_blank" rel="noopener">Open photo</a></details></header>
        <img class="popup-photo" src="assets/popup/${id}.jpg" alt="${alt}" width="700" height="875" loading="lazy">
        <div class="popup-actions">
          <button class="popup-action" type="button" data-id="${id}" data-action="liked" aria-label="Like photo: ${alt}" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg></button>
          <button class="popup-action popup-comment" type="button" data-id="${id}" aria-label="Ask about this photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 11.5a9 9 0 1 0-5 8L21 21l-1.5-5a9 9 0 0 0 1.5-4.5Z"/></svg></button>
          <button class="popup-action popup-share" type="button" data-id="${id}" aria-label="Share photo"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m22 2-7 20-4-9L2 9 22 2ZM11 13 22 2"/></svg></button>
          <span class="popup-card-dots" aria-hidden="true">${photos.slice(dotStart, dotStart + 3).map(([photoId]) => `<span class="${photoId === id ? 'current' : ''}"></span>`).join('')}</span>
          <button class="popup-action" type="button" data-id="${id}" data-action="saved" aria-label="Save photo: ${alt}" aria-pressed="false"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4Z"/></svg></button>
        </div>
        <div class="popup-question" hidden><a href="https://wa.me/51953126238?text=${encodeURIComponent('Hi Kalahari! I have a question about this photo: ' + new URL('assets/popup/' + id + '.jpg', location.href).href)}" target="_blank" rel="noopener noreferrer">Ask about this piece on WhatsApp ↗</a></div>
        <p class="popup-share-feedback" role="status" hidden></p>
      </article>`;
    }).join('');
    posts.querySelectorAll('[data-action]').forEach(updateButton);
    dots.querySelectorAll('button').forEach((button, i) => button.setAttribute('aria-current', String(i === index)));
    status.textContent = `Photo ${index + 1} of ${photos.length}`;
  }
  photos.forEach((photo, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'popup-dot';
    button.setAttribute('aria-label', `Show photo ${i + 1}`);
    button.addEventListener('click', () => { index = i; render(); });
    dots.append(button);
  });
  function move(delta) { index = (index + delta + photos.length) % photos.length; render(); }
  carousel.querySelector('[data-popup-prev]').addEventListener('click', () => move(-1));
  carousel.querySelector('[data-popup-next]').addEventListener('click', () => move(1));
  posts.addEventListener('click', async event => {
    const button = event.target.closest('.popup-action');
    if (!button) return;
    if (button.classList.contains('popup-comment')) {
      const question = button.closest('.popup-post').querySelector('.popup-question');
      question.hidden = !question.hidden;
      button.setAttribute('aria-expanded', String(!question.hidden));
      return;
    }
    if (button.classList.contains('popup-share')) {
      const url = new URL(location.href);
      url.searchParams.set('popup', button.dataset.id);
      url.hash = 'contact';
      const feedback = button.closest('.popup-post').querySelector('.popup-share-feedback');
      try {
        if (navigator.share) await navigator.share({title:'Kalahari — Pop-up moments',url:url.href});
        else { await navigator.clipboard.writeText(url.href); feedback.textContent = 'Photo link copied'; feedback.hidden = false; }
      } catch (error) {
        if (error.name !== 'AbortError') { feedback.replaceChildren(); const link = document.createElement('a'); link.href = url.href; link.textContent = 'Photo link — copy to share'; feedback.append(link); feedback.hidden = false; }
      }
      return;
    }
    const key = prefix + button.dataset.id + ':' + button.dataset.action;
    const active = !selected(key);
    memory.set(key, active);
    try { if (active) localStorage.setItem(key, '1'); else localStorage.removeItem(key); }
    catch { storageUnavailable(); }
    updateButton(button);
  });
  window.addEventListener('storage', event => {
    if (event.key === null) memory.clear();
    else if (event.key.startsWith(prefix)) memory.delete(event.key);
    else return;
    posts.querySelectorAll('[data-action]').forEach(updateButton);
  });
  let start = null;
  posts.addEventListener('touchstart', event => { start = { x:event.touches[0].clientX, y:event.touches[0].clientY }; }, {passive:true});
  posts.addEventListener('touchend', event => {
    if (!start) return;
    const dx = event.changedTouches[0].clientX - start.x;
    const dy = event.changedTouches[0].clientY - start.y;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
    start = null;
  }, {passive:true});
  posts.addEventListener('touchcancel', () => { start = null; });
  narrow.addEventListener('change', render);
  medium.addEventListener('change', render);
  compact.addEventListener('change', render);
  const sharedPhoto = new URL(location.href).searchParams.get('popup');
  const sharedIndex = photos.findIndex(([id]) => id === sharedPhoto);
  if (sharedIndex >= 0) index = sharedIndex;
  render();
  carousel.hidden = false;
})();
