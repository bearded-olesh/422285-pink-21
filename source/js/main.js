(function (){
  const navToggle = document.querySelector('.nav-toggle'),
        pageHeader = document.querySelector('.header');

  pageHeader.classList.remove('header--no-js');
  navToggle.addEventListener('click', () => {
    pageHeader.classList.toggle('header--open-menu');
  })
})();
