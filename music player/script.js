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
let isMixBtnClick, isRepeatBtnClick = false;
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
const menuCancelIcon = document.getElementById("cancel-icon")
const menu = document.querySelector("nav");
const allSongsParent = document.getElementById("all-songs")
const allSongContainer = document.getElementById("all-songs-container")
const addBtn = document.getElementById("add-song-btn");
const newSongContainer = document.getElementById("new-song-container");
const file = document.getElementById("file-picker")


// EVENT LISTENER

rightBtn.addEventListener("click", changeSong);
leftBtn.addEventListener("click", changeSong);
play.addEventListener("click", audioPlay);
volumeSlider.addEventListener("change", changeVolume);
trackSlider.addEventListener("change", changeTrack);
trackSlider.addEventListener("change", seekUpdate);
music.addEventListener("ended", autoSongChange);
mixBtn.addEventListener("click", mixModeActive);
repeatBtn.addEventListener("click", repeatModeActive);
menuIcon.addEventListener("click", openMenu);
menuCancelIcon.addEventListener("click", cancelMenu)
addBtn.addEventListener("click", newSongPage);


// FUNCTION

function local(){
  let newSongJson = localStorage.getItem("addedSongs")
   newSongJson = JSON.parse(newSongJson)
   SONG_LIST.push(newSongJson)
}

function changeSong(e) {
  let way = e.target;
  mixSongs();
  swapBtn(way);
  changeSwapStyle();
  if(play.textContent === "❚ ❚"){
    music.play()
  }
  console.log(arrayCount)
}

function mixSongs() {
  if (isMixBtnClick) {
    arrayCount = Math.floor(Math.random() * SONG_LIST.length);
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
  const icon = music.paused ? "❚ ❚" : "►";
  play.textContent = icon;
  music.paused ? music.play() : music.pause();
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
  updateTrack = setInterval(seekUpdate, 1000);
  mixModeSongChange();
  repeatModeSongChange();
  resetAutoChangeIfEnd(updateTrack);
  if(play.textContent === "❚ ❚"){
    music.play()
  }
  console.log(arrayCount)
}

//MİX & REPEAT MODE

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
    clearInterval(clear)
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

function openMenu() {
  menu.style.left = "0";
}

function cancelMenu(){
  menu.style.left = "-20rem"
}

//ALL SONG LIST
window.addEventListener("DOMContentLoaded", getAllSongList) 
allSongContainer.addEventListener("click", showAllSongList)


function getAllSongList(){
  for(let i = 0; i<SONG_LIST.length; i++){
    let li = document.createElement("li")
    li.innerHTML = SONG_LIST[i].songName
    li.classList.add("allSongsListElements")
    allSongAppend(li)
  }
  let chooseSong = Array.from(document.querySelectorAll(".allSongsListElements"))
  chooseSong.forEach(
    function(e){
      e.addEventListener("click", function(){
        let song = chooseSong.indexOf(e)
        console.log(song)
       arrayCount = song
       changeSwapStyle()
      })
      
    }  
  )
  console.log(arrayCount)
}
function allSongAppend(li){
  return allSongsParent.append(li)
}


function showAllSongList(){
allSongsParent.style.display === "block" ? 
allSongsParent.style.display = "none" : 
allSongsParent.style.display = "block"
}


//ADD NEW SONG (only work locally)

file.addEventListener("change", addNewSong, false)
window.addEventListener("DOMContentLoaded", local)

function newSongPage() {
newSongContainer.style.display === "block" ? 
newSongContainer.style.display = "none" : 
newSongContainer.style.display = "block"
}

function addNewSong(){
  for(let i = 0; i < this.files.length; i++){
    const newAudio = document.createElement("audio")
    newAudio.src = URL.createObjectURL(this.files[i])
    newAudio.onload = () => {
      URL.revokeObjectURL(newAudio.src)
    }
    const newSongObj = {
      music : newAudio.src,
      songName : "deneme",
      background : "img/sample.jpg",
      album : "img/album-sample.jpg"
    }
    SONG_LIST.push(newSongObj) 
    localStorage.setItem("addedSongs", JSON.stringify(newSongObj))
  }
}
