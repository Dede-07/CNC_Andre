const audios = document.querySelectorAll('audio');

audios.forEach((audio, index) => {
    // Quando um áudio começa, pausa todos os outros
    audio.addEventListener('play', () => {
        audios.forEach((otherAudio) => {
            if (otherAudio !== audio) {
                otherAudio.pause();
            }
        });
    });

    // Quando termina, toca o próximo
    audio.addEventListener('ended', () => {
        if (index + 1 < audios.length) {
            audios[index + 1].play();
        }
    });
});

// Dark Mode Toggle
const toggleBtn = document.getElementById('toggleMode');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    toggleBtn.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// Filtro de busca
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', () => {
    const value = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('#audio-list .card');

    cards.forEach(card => {
        const title = card.querySelector('h5').textContent.toLowerCase();
        card.parentElement.style.display = title.includes(value) ? 'block' : 'none';
    });
});

// Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(
            registration => console.log('ServiceWorker registrado:', registration.scope),
            err => console.log('Erro no ServiceWorker:', err)
        );
    });
}