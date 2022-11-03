const SONG_LIST = [
  {
    songName: "Hydelic - Yours Forever",
    music: "music/connected.m4a",
    album: "img/forever.jpg",
    background: "img/ocean.jpg",
  },
  {
    songName: "SYML - Mr Sandman",
    music: "music/sandman.m4a",
    album: "img/mrsandman.jpg",
    background: "img/sky4.jpg",
  },
  {
    songName: "Brand X Music - Into The Light",
    music: "music/light.m4a",
    album: "img/intothelight.jpg",
    background: "img/sky2.jpg",
  },
  {
    songName: "NF - Hate Myself",
    music: "music/nf.m4a",
    album: "img/nf.jpg",
    background: "img/black4.jpg",
  },
  {
    songName: "Secession Studios - Past in Flames",
    music: "music/flames.m4a",
    album: "img/flames.jpg",
    background: "img/flames2.jpg",
  },
  {
    songName: "Tom Odell - Another Love",
    music: "music/another.mp3",
    album: "img/another.jpg",
    background: "img/love2.jpg",
  },
  {
    songName: "Badfinger - Baby Blue",
    music: "music/blue.m4a",
    album: "img/babyblue.jpg",
    background: "img/blue5.jpg",
  },
  {
    songName: "Eminem - Lose Yourself",
    music: "music/eminem.m4a",
    album: "img/eminem-album.jpg",
    background: "img/lose5.jpg",
  },
];
let updateTrack;
let isPlayBtnClick = false;
let isMixBtnClick = false ;
let isRepeatBtnClick = false;
let mixModeTxt = "Mix all"
let repeatModeTxt = "Repeat"
let arrayCount = 0;
let playState = false;
let changeWarningText = document.getElementById("change-warning")
const music = document.getElementById("music");
let currentMusic = document.getElementById("currentMusic");
let volumeSlider = document.getElementById("volume-slider");
let trackSlider = document.getElementById("track-slider");
const albumImg = document.getElementById("album-img");
const currentSongName = document.getElementById("current-song-name");
const backgroundImg = document.getElementById("container");
const play = document.getElementById("play");
const rightBtn = document.getElementById("right");
const leftBtn = document.getElementById("left");
const mixBtn = document.getElementById("mix");
const repeatBtn = document.getElementById("repeat")
// EVENT LISTENER

rightBtn.addEventListener("click", changeSong);
leftBtn.addEventListener("click", changeSong);
play.addEventListener("click", audioPlay);
volumeSlider.addEventListener("change", changeVolume);
trackSlider.addEventListener("change", changeTrack);
trackSlider.addEventListener("change", seekUpdate);
music.addEventListener("ended", autoSongChange);
mixBtn.addEventListener("click", mixModeActive)
repeatBtn.addEventListener("click", repeatModeActive)

// FUNCTION

function changeSong(e) {
  let way = e.target;
  mixSongs()
  swapBtn(way);
  changeSwapStyle();
  if (isPlayBtnClick) {
    music.play();
  }
  console.log(arrayCount)
}

function mixSongs(){
  if(isMixBtnClick){
    arrayCount = Math.floor(Math.random() * SONG_LIST.length)
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
  if (arrayCount >= SONG_LIST.length) {
    return (arrayCount = 0);
  } else if (arrayCount < 0) {
    return (arrayCount = Number(`${SONG_LIST.length - 1}`));
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
  if (!playState) {
    playState = true
    isPlayBtnClick = true;
    play.src = "img/pause.png";
    music.play();
  } 
  else{
    playState = false
    isPlayBtnClick = false;
    play.src = "img/play2.webp";
    music.pause();
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
  mixModeSongChange()
  repeatModeSongChange()
  resetAutoChangeIfEnd()
  updateTrack = setInterval(seekUpdate, 1000);
  playState ? music.play() : music.pause()
}

function mixModeSongChange(){
  if(isMixBtnClick){
    mixSongs()
  }
  else if(isRepeatBtnClick){
    return
  }
  else{
    arrayCount++
  }
}

function repeatModeSongChange(){
  isRepeatBtnClick ? clearInterval(updateTrack) : changeSwapStyle()
}

function resetAutoChangeIfEnd(){
  if (arrayCount >= SONG_LIST.length - 1) {
    arrayCount = 0;
  }
}

function mixModeActive(){
  if(isRepeatBtnClick){
    return
  }
  else if(!isMixBtnClick){
    ifModeActive(mixBtn, mixModeTxt)
    isMixBtnClick = true
  }
  else if(isMixBtnClick){
    mixBtn.style.transform = "scale(1)"
    isMixBtnClick = false
    changeWarning("")
  }
}

function repeatModeActive(){
  if(isMixBtnClick){
    return 
  }
  else if(!isRepeatBtnClick){
    isRepeatBtnClick = true
    ifModeActive(repeatBtn, repeatModeTxt)
  }
  else if(isRepeatBtnClick){
    isRepeatBtnClick = false
    repeatBtn.style.transform = "scale(1)"
    changeWarning("")
  }
}

function ifModeActive(button, text){
  button.style.transform = "scale(1.3)"
  changeWarningText.innerText = text
}

function changeWarning(text){
  return changeWarningText.innerText = text
}
