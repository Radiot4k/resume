'use strict';

var TIME = 400;
var PX = 48;
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;
var SPACE_KEYCODE = 32;
var ONE_KEYCODE = 49;
var TWO_KEYCODE = 50;
var THREE_KEYCODE = 51;
var FOUR_KEYCODE = 52;
var FIVE_KEYCODE = 53;
var BACKSPACE_KEYCODE = 8;
var UP_KEYCODE = 38;
var DOWN_KEYCODE = 40;
var body = document.querySelector('body');
var header = document.querySelector('.header');
var nav = document.querySelector('.nav');
var about = document.querySelector('.about');
var resume = document.querySelector('.resume');
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
var sidebarWrap = sidebar.querySelector('.sidebar__wrap');
var sidebarButton = document.querySelector('.sidebar__button');
var images = document.querySelectorAll('.works__img-wrap');
var headerTextWrap = document.querySelector('.header__text-wrap');
var headerAvatar =document.querySelector('.header__avatar');

var isUpDownKeyEvent = function (evt, action) {
  if (evt.keyCode === UP_KEYCODE) {
    action(evt, 1);
  }
  if (evt.keyCode === DOWN_KEYCODE) {
    action(evt, 2);
  }
};

var isSpaceEvent = function (evt, action) {
  if (evt.keyCode === SPACE_KEYCODE) {
    action(evt);
  }
};

var isNumEvent = function (evt, action) {
  if (evt.keyCode === ONE_KEYCODE) {
    action(evt, 1);
  }
  if (evt.keyCode === TWO_KEYCODE) {
    action(evt, 2);
  }
  if (evt.keyCode === THREE_KEYCODE) {
    action(evt, 3);
  }
  if (evt.keyCode === FOUR_KEYCODE) {
    action(evt, 4);
  }
  if (evt.keyCode === FIVE_KEYCODE) {
    action(evt, 5);
  }
};

var isBackSpaceEvent = function (evt, action) {
  if (evt.keyCode === BACKSPACE_KEYCODE || evt.keyCode === ESC_KEYCODE) {
    action(evt);
  }
};

var onMainSpacePress = function (evt) {
  isSpaceEvent(evt, onHeaderButtonClick);
};

var onMenuKeyPress = function (evt) {
  isNumEvent(evt, onNavItemClick);
};

var onBackSpacePress = function (evt) {
  isBackSpaceEvent(evt, onSectionWrapButtonClick);
};

var onUpDownKeyPress = function (evt) {
  isUpDownKeyEvent(evt, onMainUpDownPress);
};

var addClass = function (element, className) {
  element.classList.add(className);
};

var removeClass = function(element, className) {
  element.classList.remove(className);
};

var toggleClass = function (element, className) {
  element.classList.toggle(className);
};

var addListener = function(element, listener, evt) {
  element.addEventListener(evt, listener);
};

var onMainUpDownPress = function (evt, flag) {
  evt.preventDefault();
  var dataLink = sectionWrapButton.dataset.link;
  var scrollElement = document.querySelector('.' + dataLink);
  switch (flag) {
    case 1:
      if (evt.shiftKey) {
        sidebarWrap.scrollTo(0, sidebarWrap.scrollTop - 200);
      } else {
        scrollElement.scrollTo(0, scrollElement.scrollTop - 200);
      }
      break;
    case 2:
      if (evt.shiftKey) {
        sidebarWrap.scrollTo(0, sidebarWrap.scrollTop + 200);
      } else {
        scrollElement.scrollTo(0, scrollElement.scrollTop + 200);
      }
  }
};

var showHideHeaderText = function () {
  var avatar = document.querySelector('.header__avatar');
  headerButton.classList.toggle('header__button--hide');
  window.setTimeout(toggleClass, TIME, headerTextWrap, 'header__text-wrap--hide');
  window.setTimeout(toggleClass, TIME / 2, avatar, 'header__avatar--hide');
  window.setTimeout(toggleClass, TIME + TIME / 2, wrapper, 'wrapper--anim');
};

var onHeaderButtonClick = function (evt) {
  evt.preventDefault();
  headerButton.removeEventListener('click', onHeaderButtonClick);
  document.removeEventListener('keydown', onMainSpacePress);
  headerButton.focus();
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].style.willChange = 'transform, opacity';
    navItems[i].addEventListener('click', onNavItemClick);
    window.setTimeout(addClass, TIME * 2, navItems[i], 'nav__item--show');
  }
  nav.classList.add('nav--show');
  showHideHeaderText();
  window.setTimeout(addClass, TIME * 2, headerButtonWrap, 'header__button-wrap--hide');
  window.setTimeout(addClass, TIME * 2, headerWrap, 'header__wrap--hide');
  window.setTimeout(addListener, TIME * 5, document, onMenuKeyPress, 'keydown');
};

var onSectionWrapButtonClick = function (evt) {
  evt.preventDefault();
  sectionWrapButton.focus();
  var dataLink = sectionWrapButton.dataset.link;
  var hideElement = document.querySelector('.' + dataLink);
  sectionWrapButton.removeEventListener('click', onSectionWrapButtonClick);
  document.removeEventListener('keydown', onUpDownKeyPress);
  sidebarButton.removeEventListener('click', onSidebarButtonClick);
  document.removeEventListener('keydown', onBackSpacePress);
  sectionWrapButton.classList.remove('section-wrap__button--show');
  for (var i = 0; i < images.length; i++) {
    images[i].style.display = '';
  }
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
  window.setTimeout(addListener, TIME * 5, document, onMenuKeyPress, 'keydown');
};

var onSidebarButtonClick = function (evt) {
  evt.preventDefault();
  sidebar.classList.toggle('sidebar--show');
  sidebarWrap.scrollTo(0, 0);
  sidebarButton.blur();
  window.setTimeout(toggleClass, TIME, sectionWrapButtonWrap, 'section-wrap__button-wrap--show');
  window.setTimeout(toggleClass, TIME * 2, sectionWrapButton, 'section-wrap__button--show');
};

var setWillChange = function (elements, value) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].style.willChange = value;
  }
};

var onNavItemClick = function (evt, num) {
  evt.preventDefault();
  document.removeEventListener('keydown', onMenuKeyPress);
  var findAncestor = function (el) {
    while ((el = el.parentElement) && !el.classList.contains('nav__item'));
    if (num) {
      el = navItems[num - 1];
    }
    return el;
  };
  var clickedElement = findAncestor(evt.target);
  clickedElement.firstElementChild.focus();
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].removeEventListener('click', onNavItemClick);
    if (navItems[i] !== clickedElement) {
      navItems[i].classList.remove('nav__item--show');
    }
    window.setTimeout(removeClass, TIME, navItems[i], 'nav__item--show');
    window.setTimeout(setWillChange, TIME * 2, navItems, 'auto');
  }
  if (clickedElement === navItems[0]) {
    headerButton.addEventListener('click', onHeaderButtonClick);
    window.setTimeout(removeClass, TIME, headerButtonWrap, 'header__button-wrap--hide');
    window.setTimeout(removeClass, TIME, headerWrap, 'header__wrap--hide');
    window.setTimeout(removeClass, TIME * 2, nav, 'nav--show');
    window.setTimeout(showHideHeaderText, TIME * 2);
    window.setTimeout(addListener, TIME * 3, document, onMainSpacePress, 'keydown');
  } else {
    var dataLink = clickedElement.dataset.link;
    var showElement = document.querySelector('.' + dataLink);
    showElement.classList.add(dataLink + '--show');
    var imagesTop = [];
    if (dataLink === 'works') {
      var onWorksScroll = function () {
        for (var i = 0; i < imagesTop.length; i++) {
          if (body.getBoundingClientRect().height > imagesTop[i][1] + images[0].getBoundingClientRect().top && images[imagesTop[i][0]].style.display === 'none') {
            images[imagesTop[i][0]].style.display = '';
            if (images[images.length - 1].style.display === 'block') {
              showElement.removeEventListener('scroll', onWorksScroll);
            }
          }
        }
      };
      var displayImges = function () {
        for (var i = 1; i < images.length; i++) {
          if (body.getBoundingClientRect().height < images[i].getBoundingClientRect().top + images[i].getBoundingClientRect().height) {
            imagesTop.push([i, images[i].getBoundingClientRect().top - images[0].getBoundingClientRect().top + images[i].getBoundingClientRect().height]);
            images[i].style.display = 'none';
          }
        }
      };
      window.setTimeout(displayImges, TIME * 3);
      showElement.addEventListener('scroll', onWorksScroll);
    }
    var scrollElement = function (elem, x, y) {
      elem.scrollTo(x, y);
    };
    sectionWrapButtonWrap.classList.add('section-wrap__button-wrap--show');
    window.setTimeout(addClass, TIME * 2, header, 'header--hide');
    window.setTimeout(removeClass, TIME * 2, main, 'main--hide');
    window.setTimeout(toggleClass, TIME, wrapper, 'wrapper--anim');
    window.setTimeout(toggleClass, TIME, wrapper, 'wrapper--open');
    window.setTimeout(addClass, TIME * 3, sectionWrap, 'section-wrap--show');
    window.setTimeout(scrollElement, TIME * 2, showElement, 0, 0);
    window.setTimeout(scrollElement, TIME * 2, sidebarWrap, 0, 0);
    window.setTimeout(addClass, TIME * 4, sectionWrapButton, 'section-wrap__button--show');
    window.setTimeout(addClass, TIME * 5, sectionWrapButton, 'section-wrap__button--anim');
    sectionWrapButton.dataset.link = dataLink;
    sectionWrapButton.addEventListener('click', onSectionWrapButtonClick);
    sectionWrapButton.addEventListener('mouseenter', function () {
      for (var i = 0; i < navItems.length; i++) {
        navItems[i].style.willChange = 'transform, opacity';
      }
    });
    sidebarButton.addEventListener('click', onSidebarButtonClick);
    window.setTimeout(addListener, TIME * 5, document, onBackSpacePress, 'keydown');
    window.setTimeout(addListener, TIME * 5, document, onUpDownKeyPress, 'keydown');
  }
};

headerButton.addEventListener('click', onHeaderButtonClick);

document.addEventListener('keydown', onMainSpacePress);
