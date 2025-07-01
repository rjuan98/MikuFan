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
