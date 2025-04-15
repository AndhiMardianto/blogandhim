const popupMenu = document.getElementById('popupMenu');
const menuTrigger = document.getElementById('menuTrigger');
const shortcutHelp = document.getElementById('shortcutHelp');
const mainContent = document.getElementById('mainContent');

let speechRate = 1.0;

// Toggle Menu Andhim
menuTrigger.addEventListener('click', () => {
  const isOpen = popupMenu.style.display === 'block';
  popupMenu.style.display = isOpen ? 'none' : 'block';
  popupMenu.setAttribute('aria-expanded', !isOpen);
  if (!isOpen) {
    popupMenu.focus(); // fokus pembaca layar
  }
});

// Toggle Shortcut Help
function toggleShortcutHelp() {
  shortcutHelp.style.display = shortcutHelp.style.display === 'none' ? 'block' : 'none';
  if (shortcutHelp.style.display === 'block') {
    shortcutHelp.focus();
  }
}

// Baca isi halaman
function speakPage() {
  const text = mainContent.innerText;
  const utter = new SpeechSynthesisUtterance(text);
  utter.rate = speechRate;
  speechSynthesis.speak(utter);
}

// KEYBOARD SHORTCUTS
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.code === 'Space') {
    e.preventDefault();
    menuTrigger.click();
  }

  if (e.ctrlKey && e.key.toLowerCase() === 'b') {
    e.preventDefault();
    speakPage();
  }

  if (e.ctrlKey && e.key === '+') {
    speechRate = Math.min(speechRate + 0.1, 3.0);
    alert(`Kecepatan baca: ${speechRate.toFixed(1)}`);
  }

  if (e.ctrlKey && e.key === '-') {
    speechRate = Math.max(speechRate - 0.1, 0.5);
    alert(`Kecepatan baca: ${speechRate.toFixed(1)}`);
  }
});
