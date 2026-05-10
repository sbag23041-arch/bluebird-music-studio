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

document.addEventListener('DOMContentLoaded', () => {

  const uploadInput =
  document.getElementById('music-upload');

  const audioPlayer =
  document.getElementById('audio-player');

  const songTitle =
  document.getElementById('song-title');

  const record =
  document.getElementById('record');

  if(uploadInput){

    uploadInput.addEventListener('change', function(){

      const file = this.files[0];

      if(file){

        const fileURL =
        URL.createObjectURL(file);

        audioPlayer.src = fileURL;

        audioPlayer.style.display = 'block';

        songTitle.textContent = file.name;

      }

    });

  }

  if(audioPlayer){

    audioPlayer.addEventListener('play', () => {

      if(record){
        record.style.animationPlayState = 'running';
      }

    });

    audioPlayer.addEventListener('pause', () => {

      if(record){
        record.style.animationPlayState = 'paused';
      }

    });

  }

});


















































































































































































