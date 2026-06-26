document.querySelectorAll('.overlay').forEach((overlay) => {
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) {
      window.location.hash = '#';
    }
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && window.location.hash) {
    window.location.hash = '#';
  }
});
