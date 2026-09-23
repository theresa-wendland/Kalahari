// Add your real email here when you are ready to receive enquiries.
const studioEmail = '';
// WhatsApp number in international format, including country code.
const studioWhatsApp = '+51 953 126 238';

const mobile = window.matchMedia('(max-width: 700px)');

const pieces = {
  pearlEarrings: { name: 'Pearl earrings', image: 'assets/pearl-collection-earrings.png', description: 'From the Pearl & Poise collection. Luminous pearl drops paired with 18k gold-plated hardware, in a selection of delicate silhouettes.' },
  pearlBracelets: { name: 'Pearl bracelets', image: 'assets/pearl-collection-bracelets-sep18.png', description: 'From the Pearl & Poise collection. Pearls and 18k gold-plated details come together in a delicate, effortlessly wearable bracelet.' }
};
Object.assign(pieces, {
  "stone1": {
    "name": "Blush stone set",
    "image": "assets/stone-soul-blush-set-sep18.png",
    "description": "From the Stone & Soul collection. A necklace and matching earrings in soft blush tones."
  },
  "stone2": {
    "name": "Golden-brown stone bracelet",
    "image": "assets/stone-soul-golden-brown-bracelet-sep18.png",
    "description": "From the Stone & Soul collection. Faceted golden-brown stones with a pale central accent."
  },
  "stone3": {
    "name": "Green stone & pearl set",
    "image": "assets/stone-soul-green-set.png",
    "description": "From the Stone & Soul collection. A green stone necklace and matching earrings with pearl accents."
  },
  "stone4": {
    "name": "Blue stone bracelets",
    "image": "assets/stone-soul-blue-bracelets.png",
    "description": "From the Stone & Soul collection. Two bracelet designs celebrating blue and white natural patterns."
  },
  "stone5": {
    "name": "Earth-tone drop earrings",
    "image": "assets/stone-soul-earth-tone-earrings.png",
    "description": "From the Stone & Soul collection. Warm brown and cream stones in a long drop silhouette."
  },
  "stone6": {
    "name": "Pale green stone bracelet",
    "image": "assets/stone-soul-pale-green-bracelet.png",
    "description": "From the Stone & Soul collection. Faceted pale green beads framing a smooth oval stone."
  },
  "stone7": {
    "name": "Pale blue stone bracelet",
    "image": "assets/stone-soul-pale-blue-bracelet.png",
    "description": "From the Stone & Soul collection. Soft blue stones with delicate bands and gold-plated details."
  },
  "stone8": {
    "name": "Black stone bracelet",
    "image": "assets/stone-soul-black-bracelet.png",
    "description": "From the Stone & Soul collection. Faceted black stones with gold-plated finishing details."
  }
});
Object.assign(pieces, {
  "glass1": {
    "name": "Blue glass bracelets",
    "image": "assets/glass-glow-blue-bracelets.png",
    "description": "From the Glass & Glow collection. Blue glass beads with gold-plated details and pearl and shell accents."
  },
  "glass2": {
    "name": "Green glass necklace & bracelet",
    "image": "assets/glass-glow-green-set.png",
    "description": "From the Glass & Glow collection. Green glass beads with gold-plated details and heart-shaped shell accents."
  }
});
const dialog = document.querySelector('#piece-dialog');
document.querySelectorAll('[data-piece]').forEach(button => {
  button.hidden = false;
  button.addEventListener('click', () => {
    const piece = pieces[button.dataset.piece];
    document.querySelector('#dialog-title').textContent = piece.name;
    document.querySelector('#dialog-description').textContent = piece.description;
    const image = document.querySelector('#dialog-image');
    image.src = piece.image;
    image.alt = button.querySelector('img').alt;
    dialog.showModal();
  });
});
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
document.querySelector('#dialog-contact').addEventListener('click', () => dialog.close());
const yearLabel = document.querySelector('#year');
if (yearLabel) yearLabel.textContent = new Date().getFullYear();
if (studioEmail) {
  const contactLink = document.querySelector('#contact-link');
  contactLink.href = `mailto:${studioEmail}?subject=${encodeURIComponent('Jewelry enquiry')}`;
  contactLink.hidden = false;
  document.querySelector('#contact-copy').textContent = 'For questions about a piece, send a little note.';
}

// Click-to-chat opens a draft; it never sends a message automatically.
const whatsAppNumber = studioWhatsApp.replace(/[^0-9]/g, '');
if (/^[1-9][0-9]{6,14}$/.test(whatsAppNumber)) {
  const enquiryLink = document.querySelector('#contact-link');
  if (enquiryLink && !studioEmail) {
    enquiryLink.href = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent('Hi Kalahari! I would like to ask about a piece in your collection.')}`;
    enquiryLink.target = '_blank';
    enquiryLink.rel = 'noopener noreferrer';
    enquiryLink.hidden = false;
    document.querySelector('#contact-copy').textContent = 'Message us on WhatsApp for questions about a piece.';
  }

  const message = 'Hi Kalahari! Could you share your upcoming pop-up dates and locations?';
  document.querySelectorAll('[data-whatsapp-popup]').forEach(placeholder => {
    const link = document.createElement('a');
    link.href = `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
    link.className = 'whatsapp-link';
    link.innerHTML = `<svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" focusable="false" fill="currentColor"><path d="M20.52 3.48A11.87 11.87 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.69 1.45h.01c6.56 0 11.9-5.34 11.9-11.9a11.82 11.82 0 0 0-3.44-8.42ZM12.06 21.8a9.86 9.86 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.43-9.88 9.88-9.88a9.8 9.8 0 0 1 7 2.9 9.8 9.8 0 0 1 2.9 7c0 5.45-4.44 9.88-9.9 9.88Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.28-.2-.57-.35Z"/></svg>`;
    link.title = 'Message us on WhatsApp';
    link.setAttribute('aria-label', 'Message Kalahari on WhatsApp for upcoming pop-up dates and locations');
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    placeholder.after(link);
  });
}

// Collection previews: native details supports tapping and keyboard activation.
const collectionsMenu = document.querySelector('.collections-menu');
const collectionsSummary = collectionsMenu.querySelector('summary');
const hoverNavigation = window.matchMedia('(hover: hover) and (min-width: 701px)');
let collectionsCloseTimer;
function closeCollections() {
  clearTimeout(collectionsCloseTimer);
  collectionsMenu.open = false;
}
collectionsMenu.addEventListener('mouseenter', () => {
  clearTimeout(collectionsCloseTimer);
  if (hoverNavigation.matches) collectionsMenu.open = true;
});
collectionsMenu.addEventListener('mouseleave', () => {
  if (hoverNavigation.matches && !collectionsMenu.contains(document.activeElement)) {
    collectionsCloseTimer = setTimeout(closeCollections, 180);
  }
});
collectionsMenu.addEventListener('focusout', event => {
  if (!collectionsMenu.contains(event.relatedTarget)) closeCollections();
});
collectionsMenu.addEventListener('keydown', event => {
  if (event.key === 'Escape' && collectionsMenu.open) {
    event.preventDefault();
    event.stopPropagation();
    closeCollections();
    collectionsSummary.focus();
  }
});
document.addEventListener('click', event => {
  if (!collectionsMenu.contains(event.target)) closeCollections();
});
collectionsMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeCollections));
mobile.addEventListener('change', closeCollections);

// Play the heading accent once when it becomes visible.
const newCollectionsTitle = document.querySelector('.new-collections-title');
if (newCollectionsTitle && 'IntersectionObserver' in window) {
  const headingObserver = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      newCollectionsTitle.classList.add('line-revealed');
      headingObserver.disconnect();
    }
  }, { threshold: 0.6 });
  headingObserver.observe(newCollectionsTitle);
}
