class MusicPlayer {
    constructor() {
        this.audio = new Audio();
        this.isPlaying = false;
        this.isShuffled = false;
        this.isLooped = false;
        this.currentSongIndex = 0;
        this.volume = 1;
        this.shuffledPlaylist = [...songs];
        this.initializePlayer();
    }

    initializePlayer() {
        // DOM Elements
        this.albumArt = document.querySelector('#albumArt');
        this.songTitle = document.querySelector('#songTitle');
        this.artistName = document.querySelector('#artistName');
        this.progressBar = document.querySelector('.progress');
        this.progressArea = document.querySelector('.progress-bar');
        this.currentTimeEl = document.querySelector('#currentTime');
        this.totalDurationEl = document.querySelector('#totalDuration');
        this.playPauseBtn = document.querySelector('#playPauseBtn');
        this.nextBtn = document.querySelector('#nextBtn');
        this.prevBtn = document.querySelector('#prevBtn');
        this.shuffleBtn = document.querySelector('#shuffleBtn');
        this.loopBtn = document.querySelector('#loopBtn');
        this.muteBtn = document.querySelector('#muteBtn');
        this.volumeUpBtn = document.querySelector('#volumeUpBtn');
        this.volumeDownBtn = document.querySelector('#volumeDownBtn');
        this.volumeBar = document.querySelector('.volume-progress');
        this.volumeControls = document.querySelector('.volume-slider');
        this.playlistContainer = document.querySelector('#playlistItems');
        this.themeToggle = document.querySelector('.theme-toggle');

        // Initialize playlist
        this.renderPlaylist();
        
        // Event listeners
        this.setupEventListeners();
        
        // Load first song
        this.loadSong(0);
    }

    setupEventListeners() {
        // Playback controls
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        this.nextBtn.addEventListener('click', () => this.nextSong());
        this.prevBtn.addEventListener('click', () => this.prevSong());
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.loopBtn.addEventListener('click', () => this.toggleLoop());
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        this.volumeUpBtn.addEventListener('click', () => this.changeVolume(0.1));
        this.volumeDownBtn.addEventListener('click', () => this.changeVolume(-0.1));

        // Progress bar
        this.progressArea.addEventListener('click', (e) => this.setProgress(e));
        this.audio.addEventListener('timeupdate', () => this.updateProgress());
        this.audio.addEventListener('ended', () => this.handleSongEnd());

        // Volume control
        this.volumeControls.addEventListener('click', (e) => this.setVolume(e));

        // Theme toggle
        this.themeToggle.addEventListener('click', () => this.toggleTheme());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Audio events
        this.audio.addEventListener('loadedmetadata', () => {
            this.totalDurationEl.textContent = this.formatTime(this.audio.duration);
        });
    }

    loadSong(index) {
        const song = this.isShuffled ? this.shuffledPlaylist[index] : songs[index];
        this.currentSongIndex = index;
        this.audio.src = song.src;
        this.albumArt.src = song.cover;
        this.songTitle.textContent = song.title;
        this.artistName.textContent = song.artist;
        this.updatePlaylistHighlight();
    }

    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.isPlaying = true;
        this.audio.play();
        this.playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        this.startVisualizer();
    }

    pause() {
        this.isPlaying = false;
        this.audio.pause();
        this.playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        this.stopVisualizer();
    }

    nextSong() {
        const playlist = this.isShuffled ? this.shuffledPlaylist : songs;
        this.currentSongIndex = (this.currentSongIndex + 1) % playlist.length;
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) this.play();
    }

    prevSong() {
        const playlist = this.isShuffled ? this.shuffledPlaylist : songs;
        this.currentSongIndex = (this.currentSongIndex - 1 + playlist.length) % playlist.length;
        this.loadSong(this.currentSongIndex);
        if (this.isPlaying) this.play();
    }

    toggleShuffle() {
        this.isShuffled = !this.isShuffled;
        this.shuffleBtn.classList.toggle('active');
        if (this.isShuffled) {
            this.shuffledPlaylist = [...songs].sort(() => Math.random() - 0.5);
        }
    }

    toggleLoop() {
        this.isLooped = !this.isLooped;
        this.audio.loop = this.isLooped;
        this.loopBtn.classList.toggle('active');
    }

    toggleMute() {
        this.audio.muted = !this.audio.muted;
        this.muteBtn.innerHTML = this.audio.muted ? 
            '<i class="fas fa-volume-mute"></i>' : 
            '<i class="fas fa-volume-up"></i>';
    }

    setProgress(e) {
        const width = this.progressArea.clientWidth;
        const clickX = e.offsetX;
        const duration = this.audio.duration;
        this.audio.currentTime = (clickX / width) * duration;
    }

    updateProgress() {
        const duration = this.audio.duration;
        const currentTime = this.audio.currentTime;
        const progressPercent = (currentTime / duration) * 100;
        this.progressBar.style.width = `${progressPercent}%`;
        this.currentTimeEl.textContent = this.formatTime(currentTime);
    }

    setVolume(e) {
        const width = this.volumeControls.clientWidth;
        const clickX = e.offsetX;
        this.volume = clickX / width;
        this.audio.volume = this.volume;
        this.volumeBar.style.width = `${this.volume * 100}%`;
    }

    changeVolume(delta) {
        const newVolume = Math.max(0, Math.min(1, this.audio.volume + delta));
        this.volume = newVolume;  // Update the volume property
        this.audio.volume = newVolume;
        this.volumeBar.style.width = `${newVolume * 100}%`;
        
        // Update volume icon
        if (newVolume === 0) {
            this.muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else if (newVolume < 0.5) {
            this.muteBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
        } else {
            this.muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    }

    handleSongEnd() {
        if (this.isLooped) {
            this.play();
        } else {
            this.nextSong();
        }
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    renderPlaylist() {
        this.playlistContainer.innerHTML = songs.map((song, index) => `
            <li data-index="${index}" class="${index === this.currentSongIndex ? 'active' : ''}">
                <span>${song.title} - ${song.artist}</span>
                <span class="duration"></span>
            </li>
        `).join('');

        // Add click events to playlist items
        this.playlistContainer.querySelectorAll('li').forEach(item => {
            item.addEventListener('click', () => {
                const index = parseInt(item.dataset.index);
                this.loadSong(index);
                this.play();
            });
        });
    }

    updatePlaylistHighlight() {
        const items = this.playlistContainer.querySelectorAll('li');
        items.forEach(item => item.classList.remove('active'));
        items[this.currentSongIndex].classList.add('active');
    }

    startVisualizer() {
        const spans = document.querySelectorAll('.wave-visualizer span');
        spans.forEach(span => span.style.animationPlayState = 'running');
    }

    stopVisualizer() {
        const spans = document.querySelectorAll('.wave-visualizer span');
        spans.forEach(span => span.style.animationPlayState = 'paused');
    }

    toggleTheme() {
        document.body.dataset.theme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        this.themeToggle.innerHTML = document.body.dataset.theme === 'dark' ? 
            '<i class="fas fa-sun"></i>' : 
            '<i class="fas fa-moon"></i>';
    }

    handleKeyboard(e) {
        switch(e.code) {
            case 'Space':
                e.preventDefault();
                this.togglePlay();
                break;
            case 'ArrowRight':
                if (e.ctrlKey) this.nextSong();
                break;
            case 'ArrowLeft':
                if (e.ctrlKey) this.prevSong();
                break;
            case 'ArrowUp':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.audio.volume = Math.min(1, this.audio.volume + 0.1);
                    this.volumeBar.style.width = `${this.audio.volume * 100}%`;
                }
                break;
            case 'ArrowDown':
                if (e.ctrlKey) {
                    e.preventDefault();
                    this.audio.volume = Math.max(0, this.audio.volume - 0.1);
                    this.volumeBar.style.width = `${this.audio.volume * 100}%`;
                }
                break;
        }
    }
}

// Initialize player when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const player = new MusicPlayer();
});
