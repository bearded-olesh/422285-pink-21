(function (){
  const navToggle = document.querySelector('.nav-toggle');

  navToggle.addEventListener('click', () => {
    let pageHeader = document.querySelector('.page__header');

    pageHeader.classList.toggle('page__header--open-menu');
  })
})();
