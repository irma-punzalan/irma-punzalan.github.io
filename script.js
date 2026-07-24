document.addEventListener("DOMContentLoaded", () => {
    // Select elements from the updated HTML structure
    const video = document.querySelector(".landscape-video-player");
    const playBtn = document.querySelector(".inline-toggle-play");
    const muteBtn = document.querySelector(".inline-toggle-mute");
    const progressFill = document.querySelector(".timeline-progress-fill");
    const timelineBar = document.querySelector(".timeline-bar-wrapper");
    const fsBtn = document.querySelector(".trigger-fs");

    // 1. Play / Pause Click Handler
    playBtn.addEventListener("click", () => {
        if (video.paused) {
            video.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            video.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // 2. Mute / Unmute Click Handler (Browser safe autoplay begins muted)
    muteBtn.addEventListener("click", () => {
        video.muted = !video.muted;
        if (video.muted) {
            muteBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
    });

    // 3. Update Red Progress Tracking Bar Dynamically
    video.addEventListener("timeupdate", () => {
        if (video.duration) {
            const percentage = (video.currentTime / video.duration) * 100;
            progressFill.style.width = `${percentage}%`;
        }
    });

    // 4. Interactive Timeline Scrubbing (Clicking the bar jumps to that video time)
    timelineBar.addEventListener("click", (e) => {
        const rect = timelineBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * video.duration;
        video.currentTime = newTime;
    });

    // 5. Native Widescreen Fullscreen Trigger Handler
    fsBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            video.requestFullscreen().catch(err => {
                console.error(`Fullscreen request rejected: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    });
});
