const musicData = [
  {
    isim: "Hydelic - Yours Forever",
    music: "music/connected.m4a",
    resim: "img/forever.jpg",
    arkaplan: "img/ocean.jpg",
  },
  {
    isim: "SYML - Mr Sandman",
    music: "music/sandman.m4a",
    resim: "img/mrsandman.jpg",
    arkaplan: "img/sky4.jpg",
  },
  {
    isim: "Brand X Music - Into The Light",
    music: "music/light.m4a",
    resim: "img/intothelight.jpg",
    arkaplan: "img/sky2.jpg",
  },
  {
    isim: "NF - Hate Myself",
    music: "music/nf.m4a",
    resim: "img/nf.jpg",
    arkaplan: "img/black4.jpg",
  },
  {
    isim: "Secession Studios - Past in Flames",
    music: "music/flames.m4a",
    resim: "img/flames.jpg",
    arkaplan: "img/flames2.jpg",
  },
  {
    isim: "Tom Odell - Another Love",
    music: "music/another.mp3",
    resim: "img/another.jpg",
    arkaplan: "img/love2.jpg",
  },
  {
    isim: "Badfinger - Baby Blue",
    music: "music/blue.m4a",
    resim: "img/babyblue.jpg",
    arkaplan: "img/blue5.jpg",
  },
  {
    isim: "Eminem - Lose Yourself",
    music: "music/eminem.m4a",
    resim: "img/eminem-album.jpg",
    arkaplan: "img/lose5.jpg",
  },
];
let updateTrack;
let isPlayBtnClick = false;
let arrayCount = 0;
let playState = 0;
const music = document.getElementById("ses");
let currentMusic = document.getElementById("currentMusic");
let volumeSlider = document.getElementById("volume-slider");
let trackSlider = document.getElementById("track-slider");
const resim = document.getElementById("resim");
const isim = document.getElementById("isim");
const arkaplan = document.getElementById("container");
const play = document.getElementById("play");
const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");

// EVENT LISTENER
rightBtn.addEventListener("click", changeSong);
leftBtn.addEventListener("click", changeSong);
play.addEventListener("click", audioPlay);
volumeSlider.addEventListener("change", changeVolume);
trackSlider.addEventListener("change", changeTrack);
trackSlider.addEventListener("change", seekUpdate);
music.addEventListener("ended", autoSongChange);

// FUNCTION

function changeSong(e) {
  let way = e.target;
  swapBtn(way);
  changeSwapStyle();
  if (isPlayBtnClick) {
    music.play();
  }
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
  if (arrayCount >= musicData.length) {
    return (arrayCount = 0);
  } else if (arrayCount < 0) {
    return (arrayCount = Number(`${musicData.length - 1}`));
  }
}

function changeSwapStyle() {
  resim.style.background = `url(${musicData[arrayCount].resim}) no-repeat  center center`;
  resim.style.backgroundSize = "cover";
  arkaplan.style.background = `url(${musicData[arrayCount].arkaplan}) no-repeat  center center`;
  arkaplan.style.backgroundSize = "cover";
  isim.innerHTML = `${musicData[arrayCount].isim}`;
  music.src = `${musicData[arrayCount].music}`;
}

function audioPlay() {
  playState++;
  if (playState === 1) {
    isPlayBtnClick = true;
    play.src = "img/pause.webp";
    music.play();
  } else if (playState === 2) {
    isPlayBtnClick = false;
    play.src = "img/play2.webp";
    music.pause();
    playState = 0;
  }
  updateTrack = setInterval(seekUpdate, 1000);
}

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
  arrayCount++;
  if (arrayCount >= musicData.length - 1) {
    arrayCount = 0;
  }
  clearInterval(updateTrack);
  changeSwapStyle();
  updateTrack = setInterval(seekUpdate, 1000);
  music.play();
}
