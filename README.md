# MIRROR.CACHE Cici Site

Static GitHub Pages site for Cici and the `MIRROR.CACHE` album.

## Files

```text
index.html
social.html
styles.css
script.js
lyrics.md
debut-stream-script.md
assets/images/
assets/audio-mp3/
```

Open `index.html` locally or publish this folder with GitHub Pages. `social.html` is Cici's social/profile page, and `index.html#player` is the album player with cover art, playlist switching, MP3 playback, and lyrics.

## GitHub Pages Setup

1. Create a repository, for example `cici-mirror-cache`.
2. Add the contents of this folder to the repository root.
3. Commit and push.
4. In GitHub, go to `Settings -> Pages`.
5. Set `Source` to `Deploy from a branch`.
6. Set branch to `main` and folder to `/root`.
7. Save.

## Audio Note

The local MP3 files are included so the page works as a self-contained album player. They were encoded from the original WAV files at 192 kbps for a much lighter GitHub Pages deploy.

For an even lighter repo, remove `assets/audio-mp3/`, remove the `<audio>` player from `index.html`, and rely on the YouTube playlist button instead:

```text
https://www.youtube.com/playlist?list=PL7NolO6GeT1DRbNExZtBVM4HUYzlJeGBe
```

## Local Preview

From this folder:

```powershell
python -m http.server 8787 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:8787/
```
