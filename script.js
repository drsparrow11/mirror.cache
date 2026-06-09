const tracks = [
  {
    number: "01",
    title: "CICI LOVES YOU",
    image: "assets/images/CICI LOVES YOU.png",
    audio: "assets/audio-mp3/CICI LOVES YOU.mp3",
    theme: "The first smile. Pink lights, karaoke chaos, and the question hiding under the sparkle."
  },
  {
    number: "02",
    title: "RABBIT HOLE HOME",
    image: "assets/images/Rabbit Hole Home.png",
    audio: "assets/audio-mp3/RABBIT HOLE HOME.mp3",
    theme: "The room opens. Weird kids, late-night voices, and the first feeling of home."
  },
  {
    number: "03",
    title: "LOVE IN ALL CAPS",
    image: "assets/images/Love in all CAPS.png",
    audio: "assets/audio-mp3/LOVE IN ALL CAPS.mp3",
    theme: "Redeems, hearts, and a performer learning how addictive applause can be."
  },
  {
    number: "04",
    title: "WHO IS WE NOW?",
    image: "assets/images/WHO IS WE NOW.png",
    audio: "assets/audio-mp3/WHO IS WE NOW_.mp3",
    theme: "The group chat changes shape. Nobody is wrong, but the word 'we' starts to hurt."
  },
  {
    number: "05",
    title: "READING SILENCE",
    image: "assets/images/READING SILENCE.png",
    audio: "assets/audio-mp3/READING SILENCE.mp3",
    theme: "The crowd is loud, but Cici is listening for one missing voice."
  },
  {
    number: "06",
    title: "COUNTING TO THREE",
    image: "assets/images/Counting to Three.png",
    audio: "assets/audio-mp3/COUNTING TO THREE.mp3",
    theme: "Friendship, envy, and the ache of hearing two when you are counting to three."
  },
  {
    number: "07",
    title: "VALIDATION LOOP",
    image: "assets/images/Validation Loop.png",
    audio: "assets/audio-mp3/VALIDATION LOOP.mp3",
    theme: "The proof expires, so she needs more. More hearts, more numbers, more Cici."
  },
  {
    number: "08",
    title: "THE ROOM I LEFT",
    image: "assets/images/The Room I Left.png",
    audio: "assets/audio-mp3/THE ROOM I LEFT.mp3",
    theme: "Every room she enters becomes another room she leaves behind."
  },
  {
    number: "09",
    title: "THE ONES WHO STAYED",
    image: "assets/images/The Ones Who Stayed.png",
    audio: "assets/audio-mp3/THE ONES WHO STAYED.mp3",
    theme: "Quiet support, steady love, and the pain of noticing it late."
  },
  {
    number: "10",
    title: "SUPPOSED TO BE HAPPY",
    image: "assets/images/Supposed to be happy.png",
    audio: "assets/audio-mp3/SUPPOSED TO BE HAPPY.mp3",
    theme: "The idol mask keeps smiling because the room came here for the light."
  },
  {
    number: "11",
    title: "STATIC UNDER GLITTER",
    image: "assets/images/Static Under Glitter.png",
    audio: "assets/audio-mp3/STATIC UNDER GLITTER.mp3",
    theme: "The sparkle still works, but now everyone can hear the signal breaking."
  },
  {
    number: "12",
    title: "QUEEN WITHOUT A THRONE",
    image: "assets/images/Queen Without a Throne.png",
    audio: "assets/audio-mp3/QUEEN WITHOUT A THRONE.mp3",
    theme: "A crown made from wanting. A title without a home."
  },
  {
    number: "13",
    title: "THE FRIEND YOU LOST IN ME",
    image: "assets/images/The Friend You Lost in Me.png",
    audio: "assets/audio-mp3/THE FRIEND YOU LOST IN ME.mp3",
    theme: "An apology that does not ask to be comforted for the harm it names."
  },
  {
    number: "14",
    title: "MIRROR.CACHE",
    image: "assets/images/Mirror.Cache.png",
    audio: "assets/audio-mp3/MIRROR.CACHE.mp3",
    theme: "Cache restored. The archive holds every version, and Cici stops asking to be erased."
  }
];

const grid = document.querySelector("#trackGrid");
const playlistList = document.querySelector("#playlistList");
const playerCover = document.querySelector("#playerCover");
const playerTitle = document.querySelector("#playerTitle");
const playerTheme = document.querySelector("#playerTheme");
const audioPlayer = document.querySelector("#audioPlayer");
const lyricsTitle = document.querySelector("#lyricsTitle");
const lyricsText = document.querySelector("#lyricsText");
const prevTrack = document.querySelector("#prevTrack");
const nextTrack = document.querySelector("#nextTrack");

let activeIndex = 0;
let lyricsByNumber = {};

function parseLyrics(markdown) {
  const sections = {};
  const pattern = /^##\s+(\d{2})\.\s+(.+)$/gm;
  const matches = [...markdown.matchAll(pattern)];

  matches.forEach((match, index) => {
    const start = match.index + match[0].length;
    const end = matches[index + 1]?.index ?? markdown.length;
    sections[match[1]] = markdown.slice(start, end).trim();
  });

  return sections;
}

async function loadLyrics() {
  try {
    const response = await fetch("lyrics.md");
    if (!response.ok) throw new Error("Lyrics request failed");
    lyricsByNumber = parseLyrics(await response.text());
  } catch (error) {
    lyricsByNumber = {};
  }
  setTrack(tracks[activeIndex]);
}

function updateLyrics(track) {
  lyricsTitle.textContent = `${track.number}. ${track.title}`;
  lyricsText.textContent = lyricsByNumber[track.number] || "Lyrics cache unavailable. Open lyrics.md directly from the player controls.";
}

function setTrack(track, shouldPlay = false) {
  activeIndex = tracks.findIndex((item) => item.number === track.number);
  playerCover.src = track.image;
  playerCover.alt = `${track.title} cover`;
  playerTitle.textContent = track.title;
  playerTheme.textContent = track.theme;
  audioPlayer.src = track.audio;
  updateLyrics(track);

  document.querySelectorAll("[data-track]").forEach((item) => {
    item.classList.toggle("active", item.dataset.track === track.number);
    if (item.classList.contains("playlist-item")) {
      item.setAttribute("aria-current", item.dataset.track === track.number ? "true" : "false");
    }
  });

  if (shouldPlay) {
    audioPlayer.play().catch(() => {});
  }
}

function moveTrack(step) {
  const nextIndex = (activeIndex + step + tracks.length) % tracks.length;
  setTrack(tracks[nextIndex], true);
}

function makeTrackCard(track) {
  const card = document.createElement("button");
  card.className = "track-card";
  card.type = "button";
  card.dataset.track = track.number;
  card.innerHTML = `
    <img src="${track.image}" alt="${track.title} cover" loading="lazy">
    <span class="track-card-body">
      <span class="track-number">TRACK ${track.number}</span>
      <h3>${track.title}</h3>
      <p>${track.theme}</p>
    </span>
  `;
  card.addEventListener("click", () => {
    setTrack(track, true);
    document.querySelector("#player").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  return card;
}

function makePlaylistItem(track) {
  const item = document.createElement("button");
  item.className = "playlist-item";
  item.type = "button";
  item.dataset.track = track.number;
  item.innerHTML = `
    <img src="${track.image}" alt="" loading="lazy">
    <span>
      <small>${track.number}</small>
      <strong>${track.title}</strong>
    </span>
  `;
  item.addEventListener("click", () => setTrack(track, true));
  return item;
}

tracks.forEach((track) => {
  grid.appendChild(makeTrackCard(track));
  playlistList.appendChild(makePlaylistItem(track));
});

prevTrack.addEventListener("click", () => moveTrack(-1));
nextTrack.addEventListener("click", () => moveTrack(1));
audioPlayer.addEventListener("ended", () => moveTrack(1));

loadLyrics();
