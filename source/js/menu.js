var TIME = 400;
var header = document.querySelector('.header');
var nav = document.querySelector('.nav');
var about = document.querySelector('.about');
var resume = document.querySelector('.resume');
var works = document.querySelector('.works');
var mainButton = document.querySelector('.main__button');
var wrapper = document.querySelector('.wrapper');
var headerButtonWrap = document.querySelector('.header__button-wrap');
var headerButton = document.querySelector('.header__button');
var headerWrap = document.querySelector('.header__wrap');
var navItems = document.querySelectorAll('.nav__item');
var main = document.querySelector('.main');

//nav.classList.remove('nav--nojs');

var addClass = function (element, className) {
  element.classList.add(className);
};

var removeClass = function(element, className) {
  element.classList.remove(className);
};

var toggleClass = function(element, className) {
  element.classList.toggle(className);
};

var showHideHeaderText = function() {
  var avatar = document.querySelector('.header__avatar');
  var headerTextWrap = document.querySelector('.header__text-wrap');
  avatar.classList.toggle('header__avatar--hide');
  window.setTimeout(toggleClass, TIME / 2, headerTextWrap, 'header__text-wrap--hide');
  window.setTimeout(toggleClass, TIME, headerButton, 'header__button--hide');
  window.setTimeout(toggleClass, TIME + TIME / 2, wrapper, 'wrapper--anim');
};

var onHeaderButtonClick = function(evt) {
  evt.preventDefault();
  headerButton.removeEventListener('click', onHeaderButtonClick);
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', onNavItemClick);
  }
  nav.classList.add('nav--show');
  for (var i = 0; i < navItems.length; i++) {
    window.setTimeout(addClass, TIME, navItems[i], 'nav__item--show');
  }
  showHideHeaderText();
  window.setTimeout(addClass, TIME * 2, headerButtonWrap, 'header__button-wrap--hide');
  window.setTimeout(addClass, TIME * 2, headerWrap, 'header__wrap--hide');
};

var onMainButtonClick = function(evt) {
  evt.preventDefault();
  var dataLink = mainButton.dataset.link;
  var hideElement = document.querySelector('.' + dataLink);
  mainButton.removeEventListener('click', onMainButtonClick);
  mainButton.classList.remove('main__button--anim');
  window.setTimeout(removeClass, TIME, mainButton, 'main__button--show');
  window.setTimeout(removeClass, TIME, hideElement, dataLink + '--show');
  window.setTimeout(removeClass, TIME, header, 'header--hide');
  for (var i = 0; i < navItems.length; i++) {
    window.setTimeout(addClass, TIME, navItems[i], 'nav__item--show');
    navItems[i].addEventListener('click', onNavItemClick);
  }
  window.setTimeout(addClass, TIME * 2, main, 'main--hide');
};

var onNavItemClick = function(evt) {
  evt.preventDefault();
  var findAncestor = function (el) {
    while ((el = el.parentElement) && !el.classList.contains('nav__item'));
    return el;
  };
  var clickedElement = findAncestor(evt.target);
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].removeEventListener('click', onNavItemClick);
    if (navItems[i] !== clickedElement) {
      navItems[i].classList.remove('nav__item--show');
    }
    window.setTimeout(removeClass, TIME, clickedElement, 'nav__item--show');
  }
  if (clickedElement === navItems[0]) {
    headerButton.addEventListener('click', onHeaderButtonClick);
    window.setTimeout(removeClass, TIME, headerButtonWrap, 'header__button-wrap--hide');
    window.setTimeout(removeClass, TIME, headerWrap, 'header__wrap--hide');
    window.setTimeout(removeClass, TIME * 2, nav, 'nav--show');
    window.setTimeout(showHideHeaderText, TIME * 2);
  } else {
    var dataLink = clickedElement.dataset.link;
    var showElement = document.querySelector('.' + dataLink);
    window.setTimeout(addClass, TIME * 2, header, 'header--hide');
    window.setTimeout(removeClass, TIME * 2, main, 'main--hide');
    window.setTimeout(addClass, TIME * 3, showElement, dataLink + '--show');
    window.setTimeout(addClass, TIME * 4, mainButton, 'main__button--show');
    window.setTimeout(addClass, TIME * 5, mainButton, 'main__button--anim');
    mainButton.dataset.link = dataLink;
    mainButton.addEventListener('click', onMainButtonClick);
  }
};
// navItems[0].addEventListener('click', function(evt) {
//   evt.preventDefault();
//   for (var i = 1; i < navItems.length; i++) {
//     navItems[i].classList.remove('nav__item--show');
//   }
//   window.setTimeout(removeClass, TIME, navItems[0], 'nav__item--show');
//   window.setTimeout(showHideHeaderText, TIME * 2);
//   window.setTimeout(removeClass, TIME * 2, nav, 'nav--show');
//   window.setTimeout(removeClass, TIME * 2, headerButtonWrap, 'header__button-wrap--hide');
//   headerButton.addEventListener('click', onHeaderButtonClick);
// });
//
// navItems[1].addEventListener('click', function(evt) {
//   evt.preventDefault();
//   for (var i = 0; i < navItems.length; i++) {
//     if (i !== 1) {
//       navItems[i].classList.remove('nav__item--show');
//     }
//   }
//   window.setTimeout(removeClass, TIME, navItems[1], 'nav__item--show');
//   window.setTimeout(removeClass, TIME * 2, nav, 'nav--show');
//   window.setTimeout(removeClass, TIME * 2, main, 'main--hide');
//   window.setTimeout(addClass, TIME * 3, about, 'about--show');
//   window.setTimeout(addClass, TIME * 4, mainButton, 'main__button--show');
//   window.setTimeout(addClass, TIME * 5, mainButton, 'main__button--anim');
//
//   mainButton.addEventListener('click', onMainButtonClick);
// });
//
// navItems[2].addEventListener('click', function(evt) {
//   evt.preventDefault();
//   for (var i = 0; i < navItems.length; i++) {
//     navItems[i].classList.remove('nav__item--show');
//   }
//   window.setTimeout(removeClass, TIME, nav, 'nav--show');
//   window.setTimeout(addClass, TIME, resume, 'resume--show');
//   window.setTimeout(addClass, TIME * 2, mainButton, 'main__button--show');
//
//   mainButton.addEventListener('click', onMainButtonClick);
// });
//
// navItems[3].addEventListener('click', function(evt) {
//   evt.preventDefault();
//   mainButton.addEventListener('click', onMainButtonClick);
//   for (var i = 0; i < navItems.length; i++) {
//     navItems[i].classList.remove('nav__item--show');
//   }
//   window.setTimeout(removeClass, TIME, nav, 'nav--show');
//   window.setTimeout(addClass, TIME, works, 'works--show');
//   window.setTimeout(addClass, TIME * 2, mainButton, 'main__button--show');
// });

headerButton.addEventListener('click', onHeaderButtonClick);
