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




















































































































































































