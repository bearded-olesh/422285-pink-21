(function (){
  const navToggle = document.querySelector('.nav-toggle'),
        pageHeader = document.querySelector('.page__header');

  navToggle.addEventListener('click', () => {
    pageHeader.classList.toggle('page__header--open-menu');
  })
})();
