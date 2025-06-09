document.addEventListener('DOMContentLoaded', function() {
    // Lightbox
    const galleryImgs = Array.from(document.querySelectorAll('.gallery-images img'));
    let currentImgIndex = 0;

    galleryImgs.forEach((img, idx) => {
        img.addEventListener('click', function() {
            document.getElementById('lightbox-img').src = this.src;
            document.getElementById('lightbox').style.display = 'flex';
            currentImgIndex = idx;
        });
    });

    window.showPrevImg = function() {
        currentImgIndex = (currentImgIndex - 1 + galleryImgs.length) % galleryImgs.length;
        document.getElementById('lightbox-img').src = galleryImgs[currentImgIndex].src;
    };
    window.showNextImg = function() {
        currentImgIndex = (currentImgIndex + 1) % galleryImgs.length;
        document.getElementById('lightbox-img').src = galleryImgs[currentImgIndex].src;
    };

    document.getElementById('lightbox').addEventListener('click', function() {
        this.style.display = 'none';
    });

    // Easter egg tocar música
    let logoClickCount = 0;
    let audioStarted = false;

    const logo = document.querySelector('.navbar__logo');
    if (logo) {
        logo.addEventListener('click', function(e) {
            e.preventDefault();
            if (audioStarted) return;
            logoClickCount++;
            if (logoClickCount === 7) {
                audioStarted = true;
                const yt = document.createElement('iframe');
                yt.style.display = 'none';
                yt.src = "https://www.youtube.com/embed/8zCfZ4Cqh7Y?autoplay=1";
                yt.allow = "autoplay";
                yt.setAttribute('title', 'Hatsune Miku - Oblivion');
                document.body.appendChild(yt);
                alert('Easter Egg: WORLD IS MINE! 🎶');
            }
        });
    }

    // animação de seções
    document.querySelectorAll('.about-section, .gallery-section, .music-section, .contact-section').forEach(section => {
        section.classList.add('section-animate');
    });

    function revealSectionsOnScroll() {
        document.querySelectorAll('.section-animate').forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight - 80) {
                section.classList.add('visible');
            }
        });
    }
    window.addEventListener('scroll', revealSectionsOnScroll);
    window.addEventListener('load', revealSectionsOnScroll);

    // botão scroll top
    const scrollBtn = document.getElementById('scrollTopBtn');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // mini game
    function spawnNoteGameNote() {
        const noteChars = ['🎵','🎶','💙','⭐','💖'];
        const note = document.createElement('span');
        note.className = 'note-game-note';
        note.textContent = noteChars[Math.floor(Math.random() * noteChars.length)];

        // Cantos da tela
    const emojiSize = 48;
    const corners = [
    { left: '8px', top: '8px' },
    { right: '8px', top: '8px' },
    { left: '8px', bottom: '8px' },
    { right: '8px', bottom: '8px' }
];
        const pos = corners[Math.floor(Math.random() * corners.length)];
        Object.assign(note.style, pos);

        document.getElementById('note-game').appendChild(note);

        note.addEventListener('click', function() {
            note.remove();
            // TOCA O SOM!
            const audio = document.getElementById('note-sound');
            if (audio) {
                audio.currentTime = 0;
                audio.play();
            }
        });

        setTimeout(() => note.remove(), 2000);
    }

    // Spawna uma nota a cada 3.5s
    setInterval(spawnNoteGameNote, 3500);

    // menu hamburguer responsivo
    const toggle = document.getElementById('navbarToggle');
    const menu = document.querySelector('.navbar__menu');
    if (toggle && menu) {
        toggle.addEventListener('click', function() {
            menu.classList.toggle('open');
            const expanded = menu.classList.contains('open');
            toggle.setAttribute('aria-expanded', expanded);
        });
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                toggle.setAttribute('aria-expanded', false);
            });
        });
        toggle.setAttribute('aria-expanded', false);
    }
    //noturno
const botaoDarkMode = document.getElementById('dark-mode-btn');
if (botaoDarkMode) {
    botaoDarkMode.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
    });
}
//mural de recados
const muralForm = document.getElementById('mural-form');
const muralMessages = document.getElementById('mural-messages');
if (muralForm && muralMessages) {
  muralForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('mural-name').value.trim();
    const message = document.getElementById('mural-message').value.trim();
    if (!name || !message) return;

    // Cria o elemento do recado
    const msgDiv = document.createElement('div');
    msgDiv.className = 'mural-message';
    msgDiv.innerHTML = `<strong>${name}:</strong> ${message}`;

    // Adiciona ao mural
    muralMessages.prepend(msgDiv);

    // Limpa o formulário
    muralForm.reset();
});
    }

//player de música
const musicAudio = document.getElementById('custom-audio');
const playBtn = document.getElementById('player-play');
const progress = document.getElementById('player-progress');
const time = document.getElementById('player-time');
const volume = document.getElementById('player-volume');
const musicList = document.querySelectorAll('#music-list li');

if (musicAudio && playBtn && progress && time && volume && musicList.length) {
  // Monta a playlist a partir do HTML
  const playlist = Array.from(musicList).map(li => ({
    src: li.getAttribute('data-src'),
    title: li.textContent
  }));
  let currentTrack = 0;

  function updatePlayBtn(){
    playBtn.textContent = musicAudio.paused ? '▶️' : '⏸️';
  }
  function updateProgress(){
    const percent = (musicAudio.currentTime / musicAudio.duration) * 100 || 0;
    progress.value = percent;
    function fmt(sec) {
      if (isNaN(sec)) return '0:00';
      const m = Math.floor(sec / 60);
      const s = Math.floor(sec % 60).toString().padStart(2, '0');
      return `${m}:${s}`;
    }
    time.textContent = `${fmt(musicAudio.currentTime)} / ${fmt(musicAudio.duration)}`;
  }
  function loadTrack(index) {
    musicAudio.src = playlist[index].src;
    document.getElementById('player-title').textContent = playlist[index].title;
    musicAudio.load();
    musicAudio.volume = volume.value;
    updatePlayBtn();
    updateProgress();
    // Destaca a música atual na lista
    musicList.forEach((li, i) => {
      li.classList.toggle('active', i === index);
    });
  }
const toggleBtn = document.getElementById('toggle-music-list');
const musicListEl = document.getElementById('music-list');
toggleBtn.addEventListener('click', () => {
    musicListEl.classList.toggle('open');
});
  playBtn.addEventListener('click', () => {
    if (musicAudio.paused) musicAudio.play();
    else musicAudio.pause();
  });
  musicAudio.addEventListener('play', updatePlayBtn);
  musicAudio.addEventListener('pause', updatePlayBtn);
  musicAudio.addEventListener('timeupdate', updateProgress);
  musicAudio.addEventListener('loadedmetadata', updateProgress);
  progress.addEventListener('input', () => {
    if (musicAudio.duration) {
      musicAudio.currentTime = (progress.value / 100) * musicAudio.duration;
    }
  });
  volume.addEventListener('input', () => {
    musicAudio.volume = volume.value;
  });
  document.getElementById('player-prev').addEventListener('click', () => {
    currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrack);
  });
  document.getElementById('player-next').addEventListener('click', () => {
    currentTrack = (currentTrack + 1) % playlist.length;
    loadTrack(currentTrack);
  });
  musicList.forEach((li, i) => {
    li.addEventListener('click', () => {
      currentTrack = i;
      loadTrack(currentTrack);
      musicAudio.play();
    });
  });
  // Carrega a primeira música ao iniciar
  loadTrack(currentTrack);
}
}
);