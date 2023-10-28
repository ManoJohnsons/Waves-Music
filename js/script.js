const player = document.querySelector("#player");
const musicName = document.querySelector("#musicName");
const musicImage = document.querySelector("#picture")
const playPauseButton = document.querySelector("#play");
const previousButton = document.querySelector("#previous");
const nextButton = document.querySelector("#next");
const currentTime = document.querySelector("#currentTime");
const duration = document.querySelector("#duration");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");

import songs from "./songs.js";

const textButtonPlay = "<i class='fas fa-3x fa-play-circle'></i>";
const textButtonPause = "<i class='fas fa-3x fa-pause-circle'></i>";

let index = 0;

previousButton.onclick = () => prevNextMusic("prev");
nextButton.onclick = () => prevNextMusic();

playPauseButton.onclick = () => playPause();

const playPause = () => {
    if (player.paused) {
        player.play();
        playPauseButton.innerHTML = textButtonPause;
    } else {
        player.pause();
        playPauseButton.innerHTML = textButtonPlay;
    }
};

player.ontimeupdate = () => updateTime();

const updateTime = () => {
    const currentMinutes = Math.floor(player.currentTime / 60);
    const currentSeconds = Math.floor(player.currentTime % 60);
    currentTime.textContent = currentMinutes + ":" + formatZero(currentSeconds);

    const durationFormatted = isNaN(player.duration) ? 0 : player.duration;
    const durationMinutes = Math.floor(durationFormatted / 60);
    const durationSeconds = Math.floor(durationFormatted % 60);
    duration.textContent = durationMinutes + ":" + formatZero(durationSeconds);

    const progressWidth = durationFormatted
        ? (player.currentTime / durationFormatted) * 100
        : 0;
    
    progress.style.width = progressWidth + "%";
};

const formatZero = (n) => (n < 10 ? "0" + n : n);

progressBar.onclick = (e) => {
    const newTime = (e.offsetX / progressBar.offsetWidth) * player.duration;
    player.currentTime = newTime;
};

const prevNextMusic = (type = "next") => {
    if ((type == "next" && index + 1 === songs.length) ||
    type === "init") {
        index = 0;
    } else if (type == "prev" && index === 0) {
        index = songs.length;
    } else {
        index = type === "prev" && index ? index - 1 : index + 1;
    }

    player.src = songs[index].src;
    musicName.innerHTML = songs[index].name;
    musicImage.src = songs[index].image;
    if (type !== "init") playPause();

    updateTime();
};

prevNextMusic("init");