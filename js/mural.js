document.addEventListener("DOMContentLoaded", function() {
    const letras = ['M', 'I', 'K', 'U'];
    const estilos = ['solid', 'outline', 'dotted', 'transparent'];
    const cores = ['#23272f', '#1ca9c9', '#fff', '#b2f7ef'];
    const quantidade = 20;
    for (let i = 0; i < quantidade; i++) {
    const span = document.createElement('span');
    span.className = 'miku-bg-word miku-' + estilos[Math.floor(Math.random() * estilos.length)];
    span.textContent = letras[Math.floor(Math.random() * letras.length)];
    span.style.top = (Math.random() * 110 - 10) + '%';
    span.style.left = (Math.random() * 110 - 10) + '%';
    span.style.fontSize = (8 + Math.random() * 18) + 'vw';
    span.style.opacity = (0.08 + Math.random() * 0.25).toFixed(2);
    span.style.color = cores[Math.floor(Math.random() * cores.length)];
    if (Math.random() > 0.5) {
        // Só metade gira
        const isCW = Math.random() > 0.5;
        span.style.animationName = isCW ? 'mikuRotateCW' : 'mikuRotateCCW';
        span.style.animationDuration = (20 + Math.random() * 20) + 's'; // Mais devagar
        span.style.animationTimingFunction = 'linear';
        span.style.animationIterationCount = 'infinite';
        span.style.transform = `rotate(${Math.floor(Math.random()*360)}deg)`;
    }
    document.body.appendChild(span);
}})

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.expo-header');
  const layers = document.querySelectorAll('.parallax-layer');
  
  // Efeito parallax com movimento do mouse
  header.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth - e.pageX * 2) / 50;
    const y = (window.innerHeight - e.pageY * 2) / 50;
    
    layers.forEach((layer, index) => {
      const speed = 0.05 * (index + 1);
      layer.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
  
  // Adaptar altura do header
  function setHeaderHeight() {
    header.style.height = `${window.innerHeight}px`;
  }
  
  window.addEventListener('resize', setHeaderHeight);
  setHeaderHeight();
});

const cores = ['#39c5bb', '#1ca9c9', '#b2f7ef', '#e6fcff'];

async function hasBadWords(text) {
    const res = await fetch(`https://www.purgomalum.com/service/containsprofanity?text=${encodeURIComponent(text)}`);
    return await res.text() === 'true';
}

span.style.setProperty('--angle', `${Math.floor(Math.random()*360)}deg`);

document.getElementById('mural-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('mural-name').value.trim();
    const message = document.getElementById('mural-message').value.trim();

    const lastSent = localStorage.getItem('lastMuralSent');
    if (lastSent && Date.now() - lastSent < 300000) {
        alert('HEY!! Wait some seconds to another message!');
        return;
    }

    if (await hasBadWords(name) || await hasBadWords(message)) {
        alert('WHAT?? T^T DO YOU HATE ME?!');
        return;
    }

    if (name && message) {
    database.ref('mural').push({
        name: name,
        message: message,
        timestamp: Date.now()
    }).then(() => {
        document.getElementById('mural-form').reset();
        localStorage.setItem('lastMuralSent', Date.now());
        showMuralFeedback('Message sent! ✨');
        showConfetti();
    });
}

let lastKey = null;

function renderMuralMessages(snapshot, append = false) {
    const muralDiv = document.getElementById('mural-messages');
    const messages = [];
    snapshot.forEach(child => {
        messages.push({ id: child.key, ...child.val() });
    });
    messages.sort((a, b) => b.timestamp - a.timestamp);
    if (!append) muralDiv.innerHTML = '';
    messages.forEach(msg => {
        const el = document.createElement('div');
        el.className = 'mural-message';

        // Avatar com a primeira letra do nome
        const avatar = document.createElement('span');
        avatar.className = 'mural-avatar';
        avatar.textContent = msg.name ? msg.name[0].toUpperCase() : '?';
        avatar.style.background = `hsl(${(msg.name.charCodeAt(0) * 39) % 360}, 70%, 70%)`;

        // Formata a data/hora
        const date = new Date(msg.timestamp);
        const dateStr = date.toLocaleString('en-GB', {
            day: '2-digit', month: '2-digit', year: '2-digit',
            hour: '2-digit', minute: '2-digit'
        });

        el.innerHTML = `<strong>${msg.name}</strong> <span class="mural-date">${dateStr}</span>: ${msg.message}`;
        el.prepend(avatar);

        // Botão de apagar
      //  const delBtn = document.createElement('button');
        //delBtn.textContent = '🗑️';
 //       delBtn.title = 'Delete message';
   //     delBtn.setAttribute('aria-label', 'Delete message');
     //   delBtn.onclick = () => {
       //     if (confirm('Delete this message?')) {
         //       database.ref('mural/' + msg.id).remove().then(() => {
           //         showMuralFeedback('Message deleted!');
             //   });
   //         }
     //   };
       // el.appendChild(delBtn);
        muralDiv.appendChild(el);
    });
    if (messages.length) lastKey = messages[messages.length - 1].id;
}

// Função de feedback visual (fora de renderMuralMessages)
function showMuralFeedback(msg) {
    let fb = document.getElementById('mural-feedback');
    if (!fb) {
        fb = document.createElement('div');
        fb.id = 'mural-feedback';
        fb.className = 'mural-feedback';
        document.getElementById('mural-messages').before(fb);
    }
    fb.textContent = msg;
    fb.style.display = 'block';
    setTimeout(() => { fb.style.display = 'none'; }, 2000);
}

// Carrega as 20 mais recentes ao iniciar
database.ref('mural').orderByKey().limitToLast(20).on('value', snapshot => renderMuralMessages(snapshot));

// Botão "Carregar mais"
const loadMoreBtn = document.createElement('button');
loadMoreBtn.textContent = 'Load more messages';
loadMoreBtn.onclick = function() {
    if (!lastKey) return;
    database.ref('mural')
        .orderByKey()
        .endAt(lastKey)
        .limitToLast(21)
        .once('value', function(snapshot) {
            const messages = [];
            snapshot.forEach(child => {
                messages.push({ id: child.key, ...child.val() });
            });
            messages.pop();
            if (messages.length) {
                renderMuralMessages({ forEach: cb => messages.forEach(cb) }, true);
            }
            if (messages.length < 20) {
                loadMoreBtn.style.display = 'none';
            }
        });
};

document.getElementById('mural-messages').after(loadMoreBtn);

function showMuralFeedback(msg) {
    let fb = document.getElementById('mural-feedback');
    if (!fb) {
        fb = document.createElement('div');
        fb.id = 'mural-feedback';
        fb.className = 'mural-feedback';
        document.getElementById('mural-messages').before(fb);
    }
    fb.textContent = msg;
    fb.style.display = 'block';
    fb.classList.add('show');
    setTimeout(() => {
        fb.classList.remove('show');
        fb.style.display = 'none';
    }, 2000);
}
})

function showConfetti() {
    for (let i = 0; i < 24; i++) {
        const confetti = document.createElement('span');
        confetti.textContent = ['🎉','✨','💙','🎶','⭐','💖'][Math.floor(Math.random()*6)];
        confetti.className = 'mural-confetti';
        confetti.style.left = Math.random() * 90 + '%';
        confetti.style.animationDelay = (Math.random() * 0.7) + 's';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1500);
    }
}

function playSendSound() {
    const audio = new Audio('assets/musics/sucess.mp3');
    audio.volume = 0.3;
    audio.play();
}

showConfetti();
playSendSound();