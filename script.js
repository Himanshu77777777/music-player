const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const totalTimeEl = document.getElementById('total-time');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playlistSection = document.querySelector('.playlist-section');
const togglePlaylistBtn = document.getElementById('toggle-playlist');
const closePlaylistBtn = document.getElementById('close-playlist');
const songListEl = document.getElementById('song-list');

const songs = [
    { title: "enna sona", artist: "Artist 1", src: "song1.mp3", cover: "enna.jpeg" },
    { title: " femous naan khatayi", artist: "Artist 2", src: "song2.mp3", cover: "enna.jpeg" },
    { title: "mujhe to naan khatayi kkhani h ", artist: "Artist 3", src: "song3.mp3", cover: "enna.jpeg" }
];

let songIndex = 0;

function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
    audio.addEventListener("loadedmetadata", updateTotalTime);
}

function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = '⏸';
    } else {
        audio.pause();
        playBtn.textContent = '▶';
    }
}

function nextSong() {
    songIndex = (songIndex + 1) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

function prevSong() {
    songIndex = (songIndex - 1 + songs.length) % songs.length;
    loadSong(songs[songIndex]);
    audio.play();
}

// Update progress bar in real time
function updateProgress() {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent || 0;

    currentTimeEl.textContent = formatTime(audio.currentTime);
}

// Seek song when dragging slider
function setProgress() {
    const seekTime = (progress.value / 100) * audio.duration;
    audio.currentTime = seekTime;
}

// Update total time on song load
function updateTotalTime() {
    totalTimeEl.textContent = formatTime(audio.duration);
}

// Format time as MM:SS
function formatTime(seconds) {
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// Playlist toggle
function togglePlaylist() {
    playlistSection.classList.toggle('show-playlist');
}

// Create song list
function createSongList() {
    songListEl.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.addEventListener('click', () => {
            songIndex = index;
            loadSong(songs[songIndex]);
            audio.play();
        });
        songListEl.appendChild(li);
    });
}

togglePlaylistBtn.addEventListener('click', togglePlaylist);
closePlaylistBtn.addEventListener('click', togglePlaylist);
playBtn.addEventListener('click', playPause);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', prevSong);
audio.addEventListener('timeupdate', updateProgress);
progress.addEventListener('input', setProgress);

// Load first song and create song list
loadSong(songs[songIndex]);
createSongList();
