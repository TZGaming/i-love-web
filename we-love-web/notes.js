const noteList = document.querySelectorAll('#demo-lijst .note-card');
const overlay = document.getElementById('note-overlay');
const noteTitle = document.getElementById('note-title');
const noteBody = document.getElementById('note-body');
const closeButton = document.querySelector('.overlay-close');

function openNoteCard(card) {
  const title = card.dataset.noteTitle || 'Notitie';
  const note = card.dataset.note || 'Geen notities beschikbaar.';

  noteTitle.textContent = title;
  noteBody.textContent = note;
  overlay.classList.remove('hidden');
  overlay.setAttribute('aria-hidden', 'false');
}

function closeOverlay() {
  overlay.classList.add('hidden');
  overlay.setAttribute('aria-hidden', 'true');
}

noteList.forEach((card) => {
  const button = card.querySelector('button');
  button.addEventListener('click', () => openNoteCard(card));
});

closeButton.addEventListener('click', closeOverlay);
overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    closeOverlay();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !overlay.classList.contains('hidden')) {
    closeOverlay();
  }
});
