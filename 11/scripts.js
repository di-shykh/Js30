var player=document.querySelector('.player');
var video =player.querySelector('.viewer');
var progress = player.querySelector('.progress');
var progressBar = player.querySelector('.progress__filled');
var toggle = player.querySelector('.toggle');
var fullscreen=player.querySelector('.fullscreen');
var skipButtons = player.querySelectorAll('[data-skip]');
var ranges = player.querySelectorAll('.player__slider');

function togglePlay(){
    if(video.paused){
        video.play();
    } else{
        video.pause();
    }
}

function updateButton(){
    var icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon;
}

function skip(){
    video.currentTime+=parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
    video[this.name]=this.value;
}

function handleProgress(){
    var percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e){
    var scrubTime=(e.offsetX/progress.offsetWidth)*video.duration;
    video.currentTime=scrubTime;
}

function fullCsr(){
    if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) {
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen();
      }
}

video.addEventListener('click',togglePlay);
toggle.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
skipButtons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));

var mousedown=false;
progress.addEventListener('mousedown', ()=>mousedown=true);
progress.addEventListener('mouseup', ()=>mousedown=false);
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e)=>{
    if(mousedown)
        scrub(e);
});
fullscreen.addEventListener('click',fullCsr);
