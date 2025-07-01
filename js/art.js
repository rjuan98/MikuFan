const storage = firebase.storage();
let currentImgIndex = 0;
let currentArts = [];

document.getElementById('art-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('art-name').value.trim();
    const fileInput = document.getElementById('art-file');
    const file = fileInput.files[0];
    if (!name || !file) return;

    // Limite de tamanho (2MB)
    if (file.size > 2 * 1024 * 1024) {
        alert('File too large! Max 2MB.');
        return;
    }

    // Cria um nome único para o arquivo
    const storageRef = storage.ref('arts/' + Date.now() + '_' + file.name);
    // Faz upload
    const snapshot = await storageRef.put(file);
    const url = await snapshot.ref.getDownloadURL();

    // Salva no database
    firebase.database().ref('art-mural').push({
        name: name,
        imageUrl: url,
        timestamp: Date.now()
    }).then(() => {
        document.getElementById('art-form').reset();
        alert('Art sent! 💙');
    });
});

// Exibe as artes na galeria principal
firebase.database().ref('art-mural').limitToLast(20).on('value', function(snapshot) {
    const gallery = document.querySelector('.gallery-images');
    gallery.innerHTML = '';
    currentArts = [];
    snapshot.forEach(child => currentArts.push(child.val()));
    currentArts.sort((a, b) => b.timestamp - a.timestamp);
    currentArts.forEach((art, idx) => {
        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.alignItems = 'center';

        const img = document.createElement('img');
        img.src = art.imageUrl;
        img.alt = `Art by ${art.name}`;
        img.title = `${art.name} (${new Date(art.timestamp).toLocaleDateString()})`;

        // Evento para abrir no lightbox e salvar o índice
        img.addEventListener('click', function() {
            document.getElementById('lightbox-img').src = this.src;
            document.getElementById('lightbox').style.display = 'flex';
            currentImgIndex = idx;
        });

        const caption = document.createElement('span');
        caption.textContent = art.name;
        caption.style.fontSize = '0.95em';
        caption.style.color = '#555';

        wrapper.appendChild(img);
        wrapper.appendChild(caption);
        gallery.appendChild(wrapper);
    });
});


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

//     // mini game
//     function spawnNoteGameNote() {
//         const noteChars = ['🎵','🎶','💙','⭐','💖'];
//         const note = document.createElement('span');
//         note.className = 'note-game-note';
//         note.textContent = noteChars[Math.floor(Math.random() * noteChars.length)];

//         // Cantos da tela
//     const emojiSize = 48;
//     const corners = [
//     { left: '8px', top: '8px' },
//     { right: '8px', top: '8px' },
//     { left: '8px', bottom: '8px' },
//     { right: '8px', bottom: '8px' }
// ];
//         const pos = corners[Math.floor(Math.random() * corners.length)];
//         Object.assign(note.style, pos);

//         document.getElementById('note-game').appendChild(note);

//         note.addEventListener('click', function() {
//             note.remove();
//             // TOCA O SOM!
//             const audio = document.getElementById('note-sound');
//             if (audio) {
//                 audio.currentTime = 0;
//                 audio.play();
//             }
//         });

//         setTimeout(() => note.remove(), 2000);
//     }

//     // Spawna uma nota a cada 3.5s
//     setInterval(spawnNoteGameNote, 3500);

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
});

window.showPrevImg = function() {
    if (!currentArts.length) return;
    currentImgIndex = (currentImgIndex - 1 + currentArts.length) % currentArts.length;
    document.getElementById('lightbox-img').src = currentArts[currentImgIndex].imageUrl;
};
window.showNextImg = function() {
    if (!currentArts.length) return;
    currentImgIndex = (currentImgIndex + 1) % currentArts.length;
    document.getElementById('lightbox-img').src = currentArts[currentImgIndex].imageUrl;
};

(function particlesBG(){
    const bg = document.getElementById('particles-bg');
    for(let i=0;i<18;i++){
        const p = document.createElement('div');
        p.className = 'particle';
        p.style.left = (Math.random()*100)+'vw';
        p.style.animationDelay = (Math.random()*7)+'s';
        p.style.background = `rgba(57,197,187,${0.08+Math.random()*0.12})`;
        p.style.width = p.style.height = (6+Math.random()*10)+'px';
        bg.appendChild(p);
    }
})();