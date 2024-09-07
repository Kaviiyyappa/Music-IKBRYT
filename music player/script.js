const SONG_LIST = [
  {
    songName: "EPISODE 1",
    music: "/music player/music/EP 1.m4a",
    album: "img/VIP.jpg",
    background: "img/VIP.jpg",
  },
  {
    songName: "EPISODE 2",
    music: "/music player/music/EP 2.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 3",
    music: "/music player/music/EP 3.m4a",
    album: "img/intothelight.jpg",
    background: "img/sky2.jpg",
  },
  {
    songName: "EPISODE 4",
    music: "/music player/music/EP 4.m4a",
    album: "img/nf.jpg",
    background: "img/black4.jpg",
  },
  {
    songName: "EPISODE 5",
    music: "/music player/music/EP 5.m4a",
    album: "img/flames.jpg",
    background: "img/flames2.jpg",
  },
  {
    songName: "EPISODE 6",
    music: "/music player/music/EP 6.m4a",
    album: "img/another.jpg",
    background: "img/love2.jpg",
  },
  {
    songName: "EPISODE 7",
    music: "/music player/music/EP 7.m4a",
    album: "img/babyblue.jpg",
    background: "img/blue5.jpg",
  },
  {
    songName: "EPISODE 8",
    music: "/music player/music/EP 8.m4a",
    album: "img/eminem-album.jpg",
    background: "img/lose5.jpg",
  },
   {
    songName: "EPISODE 9",
    music: "/music player/music/EP 9.m4a",
    album: "img/eminem-album.jpg",
    background: "img/lose5.jpg",
  },
 {
    songName: "EPISODE 10",
    music: "/music player/music/EP 10.m4a",
    album: "img/VIP.jpg",
    background: "img/VIP.jpg",
  },
  {
    songName: "EPISODE 11",
    music: "/music player/music/EP 11.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 12",
    music: "/music player/music/EP 12.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 13",
    music: "/music player/music/EP 13.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 14",
    music: "/music player/music/EP 14.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 15",
    music: "/music player/music/EP 15.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 16",
    music: "/music player/music/EP 16.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 17",
    music: "/music player/music/EP 17.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 18",
    music: "/music player/music/EP 18.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 19",
    music: "/music player/music/EP 19.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 20",
    music: "/music player/music/EP 20.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 21",
    music: "/music player/music/EP 21.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 22",
    music: "/music player/music/EP 22.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 23",
    music: "/music player/music/EP 23.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 24",
    music: "/music player/music/EP 24.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "EPISODE 25",
    music: "/music player/music/EP 25.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  }
];
let updateTrack;
let isMixBtnClick,
  isRepeatBtnClick = false;
let mixModeTxt = "Mix all";
let repeatModeTxt = "Repeat";
let arrayCount = 0;
let changeWarningText = document.getElementById("change-warning");
let currentMusic = document.getElementById("currentMusic");
let volumeSlider = document.getElementById("volume-slider");
let trackSlider = document.getElementById("track-slider");
const music = document.getElementById("music");
const albumImg = document.getElementById("album-img");
const currentSongName = document.getElementById("current-song-name");
const backgroundImg = document.getElementById("container");
const play = document.getElementById("play");
const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const mixBtn = document.getElementById("mix");
const repeatBtn = document.getElementById("repeat");
const menuIcon = document.getElementById("menu-icon");
const menuCancelIcon = document.getElementById("cancel-icon");
const menu = document.querySelector("nav");
const allSongsParent = document.getElementById("all-songs");
const allSongContainer = document.getElementById("all-songs-container");
const addBtn = document.getElementById("add-song-btn");
const newSongContainer = document.getElementById("new-song-container");
const file = document.getElementById("file-picker");

// Event listeners

rightBtn.addEventListener("click", changeSong);
leftBtn.addEventListener("click", changeSong);
play.addEventListener("click", audioPlay);

function changeSong(e) {
  let way = e.target;
  swapBtn(way);
  changeSwapStyle();
  playState();
  mixSongs();
  console.log(arrayCount);
}

function swapBtn(way) {
  if (way === rightBtn) {
    arrayCount++;
  } else if (way === leftBtn) {
    arrayCount--;
  }
  disableSwap();
}

function disableSwap() {
  if (arrayCount >= SONG_LIST.length) {
    return (arrayCount = 0);
  } else if (arrayCount < 0) {
    return (arrayCount = Number(`${SONG_LIST.length - 1}`));
  }
}

function playState() {
  if (play.textContent === "❚ ❚") {
    music.play();
  }
}

function mixSongs() {
  if (isMixBtnClick) {
    arrayCount = Math.floor(Math.random() * SONG_LIST.length);
  }
}

function changeSwapStyle() {
  albumImg.style.background = `url(${SONG_LIST[arrayCount].album}) no-repeat  center center`;
  albumImg.style.backgroundSize = "cover";
  backgroundImg.style.background = `url(${SONG_LIST[arrayCount].background}) no-repeat  center center`;
  backgroundImg.style.backgroundSize = "cover";
  currentSongName.innerHTML = `${SONG_LIST[arrayCount].songName}`;
  music.src = `${SONG_LIST[arrayCount].music}`;
}

function audioPlay() {
  const icon = music.paused ? "❚ ❚" : "►";
  play.textContent = icon;
  music.paused ? music.play() : music.pause();
  updateTrack = setInterval(seekUpdate, 1000);
}

//Slider events

volumeSlider.addEventListener("change", changeVolume);
trackSlider.addEventListener("change", changeTrack);
trackSlider.addEventListener("change", seekUpdate);
music.addEventListener("ended", autoSongChange);

function changeVolume() {
  music.volume = volumeSlider.value / 100;
}
function changeTrack() {
  time = music.duration * (trackSlider.value / 100);
  music.currentTime = time;
}

function seekUpdate() {
  let seekPosition = 0;
  if (!isNaN(music.duration)) {
    seekPosition = music.currentTime * (100 / music.duration);
    trackSlider.value = seekPosition;
  }
}

function autoSongChange() {
  updateTrack = setInterval(seekUpdate, 1000);
  mixModeSongChange();
  repeatModeSongChange();
  resetAutoChangeIfEnd(updateTrack);
  playState();
  console.log(arrayCount);
}

//Mix & Repeat mode

mixBtn.addEventListener("click", mixModeActive);
repeatBtn.addEventListener("click", repeatModeActive);

function mixModeSongChange() {
  if (isMixBtnClick) {
    mixSongs();
  } else if (isRepeatBtnClick) {
    return;
  } else {
    arrayCount++;
  }
}

function repeatModeSongChange() {
  isRepeatBtnClick ? clearInterval(updateTrack) : changeSwapStyle();
}

function resetAutoChangeIfEnd(clear) {
  if (arrayCount >= SONG_LIST.length - 1) {
    arrayCount = 0;
    clearInterval(clear);
  }
}

function mixModeActive() {
  if (isRepeatBtnClick) {
    return;
  } else if (!isMixBtnClick) {
    ifModeActive(mixBtn, mixModeTxt);
    isMixBtnClick = true;
  } else if (isMixBtnClick) {
    mixBtn.style.transform = "scale(1)";
    isMixBtnClick = false;
    changeWarning("");
  }
}

function repeatModeActive() {
  if (isMixBtnClick) {
    return;
  } else if (!isRepeatBtnClick) {
    isRepeatBtnClick = true;
    ifModeActive(repeatBtn, repeatModeTxt);
  } else if (isRepeatBtnClick) {
    isRepeatBtnClick = false;
    repeatBtn.style.transform = "scale(1)";
    changeWarning("");
  }
}

function ifModeActive(button, text) {
  button.style.transform = "scale(1.3)";
  changeWarning(text);
}

function changeWarning(text) {
  return (changeWarningText.innerText = text);
}

//Menu

menuIcon.addEventListener("click", openMenu);
menuCancelIcon.addEventListener("click", cancelMenu);

function openMenu() {
  menu.style.left = "0";
}

function cancelMenu() {
  menu.style.left = "-20rem";
}

function styleChange(element) {
  element.style.display === "block"
    ? (element.style.display = "none")
    : (element.style.display = "block");
}

//All song list

window.addEventListener("DOMContentLoaded", getAllSongList);
allSongContainer.addEventListener("click", showAllSongList);

function getAllSongList() {
  for (let i = 0; i < SONG_LIST.length; i++) {
    let li = document.createElement("li");
    li.innerHTML = SONG_LIST[i].songName;
    li.classList.add("allSongsListElements");
    allSongAppend(li);
  }
  let chooseSong = Array.from(
    document.querySelectorAll(".allSongsListElements")
  );
  chooseSong.forEach(function (e) {
    e.addEventListener("click", function () {
      let song = chooseSong.indexOf(e);
      arrayCount = song;
      changeSwapStyle();
      playState()
    });
  });
}
function allSongAppend(li) {
  return allSongsParent.append(li);
}

function showAllSongList() {
  styleChange(allSongsParent);
}

//Add new song (only work locally)

addBtn.addEventListener("click", newSongPage);
file.addEventListener("change", addNewSong, false);
window.addEventListener("DOMContentLoaded", local);

function local() {
  let newSongJson = localStorage.getItem("addedSongs");
  newSongJson = JSON.parse(newSongJson);
  SONG_LIST.push(newSongJson);
}

function newSongPage() {
  styleChange(newSongContainer);
}

function addNewSong() {
  for (let i = 0; i < this.files.length; i++) {
    const newAudio = document.createElement("audio");
    newAudio.src = URL.createObjectURL(this.files[i]);
    newAudio.onload = () => {
      URL.revokeObjectURL(newAudio.src);
    };
    const newSongObj = {
      music: newAudio.src,
      songName: "deneme",
      background: "img/sample.jpg",
      album: "img/album-sample.jpg",
    };
    SONG_LIST.push(newSongObj);
    localStorage.setItem("addedSongs", JSON.stringify(newSongObj));
    
    functi

  }
}