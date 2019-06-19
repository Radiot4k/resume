var TIME = 400;
var body = document.querySelector('body');
var header = document.querySelector('.header');
var nav = document.querySelector('.nav');
var about = document.querySelector('.about');
var resume = document.querySelector('.resume');
var works = document.querySelector('.works');
var sectionWrapButtonWrap = document.querySelector('.section-wrap__button-wrap');
var sectionWrapButton = document.querySelector('.section-wrap__button');
var wrapper = document.querySelector('.wrapper');
var headerButtonWrap = document.querySelector('.header__button-wrap');
var headerButton = document.querySelector('.header__button');
var headerWrap = document.querySelector('.header__wrap');
var navItems = document.querySelectorAll('.nav__item');
var main = document.querySelector('.main');
var sectionWrap = document.querySelector('.section-wrap');
var sidebar = document.querySelector('.sidebar');
var sidebarButton = document.querySelector('.sidebar__button');

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
  headerButton.classList.toggle('header__button--hide');
  window.setTimeout(toggleClass, TIME, headerTextWrap, 'header__text-wrap--hide');
  window.setTimeout(toggleClass, TIME / 2, avatar, 'header__avatar--hide');
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
    window.setTimeout(addClass, TIME * 2, navItems[i], 'nav__item--show');
  }
  showHideHeaderText();
  window.setTimeout(addClass, TIME * 2, headerButtonWrap, 'header__button-wrap--hide');
  window.setTimeout(addClass, TIME * 2, headerWrap, 'header__wrap--hide');
};

var onSectionWrapButtonClick = function(evt) {
  evt.preventDefault();
  var dataLink = sectionWrapButton.dataset.link;
  var hideElement = document.querySelector('.' + dataLink);
  sectionWrapButton.removeEventListener('click', onSectionWrapButtonClick);
  sidebarButton.removeEventListener('click', onSidebarButtonClick);
  sectionWrapButton.classList.remove('section-wrap__button--show');
  window.setTimeout(removeClass, TIME, sectionWrapButtonWrap, 'section-wrap__button-wrap--show');
  window.setTimeout(removeClass, TIME, sectionWrap, 'section-wrap--show');
  window.setTimeout(removeClass, TIME * 2, hideElement, dataLink + '--show');
  window.setTimeout(removeClass, TIME * 3, header, 'header--hide');
  for (var i = 0; i < navItems.length; i++) {
    window.setTimeout(addClass, TIME * 3, navItems[i], 'nav__item--show');
    navItems[i].addEventListener('click', onNavItemClick);
  }
  window.setTimeout(addClass, TIME * 3, main, 'main--hide');
  window.setTimeout(toggleClass, TIME * 3, wrapper, 'wrapper--anim');
  window.setTimeout(toggleClass, TIME * 3, wrapper, 'wrapper--open');
};

var onSidebarButtonClick = function(evt) {
  evt.preventDefault();
  sidebar.classList.toggle('sidebar--show');
  sidebarButton.blur();
  // var blur = function() {
  //   sidebarButton.blur();
  // };
  //sectionWrapButtonWrap.classList.toggle('section-wrap__button-wrap--show');
  //window.setTimeout(blur, TIME*5);
  window.setTimeout(toggleClass, TIME, sectionWrapButtonWrap, 'section-wrap__button-wrap--show');
  window.setTimeout(toggleClass, TIME * 2, sectionWrapButton, 'section-wrap__button--show');
  //window.setTimeout(toggleClass, TIME * 2, sectionWrapButton, 'section-wrap__button--anim');
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
    showElement.classList.add(dataLink + '--show');
    sectionWrapButtonWrap.classList.add('section-wrap__button-wrap--show');
    window.setTimeout(addClass, TIME * 2, header, 'header--hide');
    window.setTimeout(removeClass, TIME * 2, main, 'main--hide');
    window.setTimeout(toggleClass, TIME, wrapper, 'wrapper--anim');
    window.setTimeout(toggleClass, TIME, wrapper, 'wrapper--open');
    window.setTimeout(addClass, TIME * 3, sectionWrap, 'section-wrap--show');
    window.setTimeout(addClass, TIME * 4, sectionWrapButton, 'section-wrap__button--show');
    window.setTimeout(addClass, TIME * 5, sectionWrapButton, 'section-wrap__button--anim');
    sectionWrapButton.dataset.link = dataLink;
    sectionWrapButton.addEventListener('click', onSectionWrapButtonClick);
    sidebarButton.addEventListener('click', onSidebarButtonClick);
  }
};

headerButton.addEventListener('click', onHeaderButtonClick);

// sectionWrap.addEventListener('scroll', function () {
//   console.log('getBoundingClientRect' + sidebar.getBoundingClientRect().top);
// });
