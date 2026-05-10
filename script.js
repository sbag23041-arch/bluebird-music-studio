const buttons = document.querySelectorAll('.menu-btn');
const pages = document.querySelectorAll('.page');

buttons.forEach(button => {

  button.addEventListener('click', () => {

    const target = button.dataset.target;

    pages.forEach(page => {
      page.classList.remove('active-page');
    });

    buttons.forEach(btn => {
      btn.classList.remove('active-btn');
    });

    document.getElementById(target).classList.add('active-page');

    button.classList.add('active-btn');

  });

});
/* INTRO */

window.addEventListener('load',()=>{

  setTimeout(()=>{

    document.getElementById('intro')
    .classList.add('hide');

  },2500);

});
/* MUSIC PLAYER */

const uploadInput =
document.getElementById('music-upload');

const audioPlayer =
document.getElementById('audio-player');

const songTitle =
document.getElementById('song-title');

const record =
document.getElementById('record');

if(uploadInput){

  uploadInput.addEventListener('change',(e)=>{

    const file = e.target.files[0];

    if(file){

      const audioURL =
      URL.createObjectURL(file);

      audioPlayer.src = audioURL;

      songTitle.textContent = file.name;

      audioPlayer.play();

    }

  });

}

/* RECORD ANIMATION */

if(audioPlayer){

  audioPlayer.addEventListener('play',()=>{

    record.style.animationPlayState = 'running';

  });

  audioPlayer.addEventListener('pause',()=>{

    record.style.animationPlayState = 'paused';

  });

}



















































































































































































