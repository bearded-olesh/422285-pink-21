(function (){
  const navToggle = document.querySelector('.nav-toggle'),
        pageHeader = document.querySelector('.header');

  navToggle.addEventListener('click', () => {
    pageHeader.classList.toggle('header--open-menu');
  })
})();
