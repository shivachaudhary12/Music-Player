# Modern Music Player

A stunning and fully functional music player web application with a modern UI, built using HTML, CSS, and JavaScript.

## Features

### Core Functionalities
- ✅ Play, Pause, Stop, and Seek Controls
- ✅ Next & Previous Track Navigation
- ✅ Volume Control & Mute Option
- ✅ Loop & Shuffle Modes
- ✅ Dynamic Playlist Management
- ✅ Song Progress Indicator
- ✅ Time Display
- ✅ Interactive Album Art
- ✅ Keyboard Shortcuts

### UI & Design
- 🎵 Sleek & Modern UI with Glassmorphism effects
- 🎵 Dark & Light Mode Toggle
- 🎵 Gradient & Animations
- 🎵 Waveform Visualizer
- 🎵 Smooth Transitions
- 🎵 Responsive Design

## Keyboard Shortcuts
- Space: Play/Pause
- Ctrl + ➡️: Next Track
- Ctrl + ⬅️: Previous Track
- Ctrl + ⬆️: Volume Up
- Ctrl + ⬇️: Volume Down

## Project Structure
```
music-player/
├── index.html
├── styles.css
├── js/
│   ├── player.js
│   └── songs.js
├── music/
│   └── [your music files]
└── images/
    └── [album artwork]
```

## Setup Instructions

1. Clone or download this repository
2. Add your music files to the `music` folder
3. Add album artwork to the `images` folder
4. Update the `songs.js` file with your music information
5. Open `index.html` in a web browser

## Adding Songs

To add new songs, edit the `js/songs.js` file and add entries in the following format:

```javascript
{
    title: "Song Title",
    artist: "Artist Name",
    src: "music/song-file.mp3",
    cover: "images/album-cover.jpg"
}
```

## Browser Support

The music player is compatible with all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available under the MIT License.
