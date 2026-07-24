document.addEventListener("DOMContentLoaded", () => {
    const video = document.querySelector(".landscape-video-player");
    const playBtn = document.querySelector(".inline-toggle-play");
    const muteBtn = document.querySelector(".inline-toggle-mute");
    const progressFill = document.querySelector(".timeline-progress-fill");
    const fsBtn = document.querySelector(".trigger-fs");

    playBtn.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    muteBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        muteBtn.innerHTML = video.muted ? '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
    });

    video.addEventListener("timeupdate", () => {
        const percentage = (video.currentTime / video.duration) * 100;
        progressFill.style.width = `${percentage}%`;
    });

    fsBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => console.error(err.message));
        } else {
            document.exitFullscreen();
        }
    });
});
