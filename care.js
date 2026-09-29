(() => {
  const trigger = document.querySelector('.care-trigger');
  const dialog = document.querySelector('#care-dialog');
  if (!trigger || !dialog) return;
  trigger.addEventListener('click', () => {
    dialog.showModal();
    document.documentElement.classList.add('care-is-open');
  });
  dialog.querySelector('.care-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.documentElement.classList.remove('care-is-open');
    trigger.focus({preventScroll: true});
  });
})();
