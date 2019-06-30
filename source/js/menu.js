'use strict';

window.addEventListener('load', function () {

var TIME = 400;
var PX = 48;
var ESC_KEYCODE = 27;
var SPACE_KEYCODE = 32;
var ONE_KEYCODE = 49;
var TWO_KEYCODE = 50;
var THREE_KEYCODE = 51;
var FOUR_KEYCODE = 52;
var FIVE_KEYCODE = 53;
var UP_KEYCODE = 38;
var DOWN_KEYCODE = 40;
var DEBOUNCE_INTERVAL = 500; // ms
var body = document.querySelector('body');
var war = body.querySelector('.war');
var wrapper = body.querySelector('.wrapper');
var wrapperChildren = wrapper.querySelectorAll('.header, .main');
var header = wrapperChildren[0];
var headerChildren = header.querySelectorAll('.nav, .header__wrap, .header__button-wrap');
var nav = headerChildren[0];
var navItems = nav.querySelectorAll('.nav__item');
var headerWrap = headerChildren[1];
var headerWrapChildren = headerWrap.querySelectorAll('.header__avatar, .header__text-wrap');
var headerAvatar = headerWrapChildren[0];
var headerTextWrap = headerWrapChildren[1];
var headerButtonWrap = headerChildren[2];
var headerButton = headerButtonWrap.querySelector('.header__button');
var main = wrapperChildren[1];
var sectionWrap = main.querySelector('.section-wrap');
var sectionWrapChildren = sectionWrap.querySelectorAll('.section-wrap__button-wrap, .sidebar');
var sectionWrapButtonWrap = sectionWrapChildren[0];
var sectionWrapButton = sectionWrapButtonWrap.querySelector('.section-wrap__button');
var sidebar = sectionWrapChildren[1];
var sidebarChildren = sidebar.querySelectorAll('.sidebar__button, .sidebar__wrap');
var sidebarButton = sidebarChildren[0];
var sidebarWrap = sidebarChildren[1];
var images = sectionWrap.querySelectorAll('.works__img-wrap');
var inputName = sectionWrap.querySelector('#form-name');

var debounce = function (fun) {
  var lastTimeout = null;
  return function () {
    var args = arguments;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      fun.apply(null, args);
    }, TIME);
  };
};

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

var imagesTop = [];

var displayImages = function () {
  for (var i = 1; i < images.length; i++) {
    if (body.getBoundingClientRect().height < images[i].getBoundingClientRect().top + images[i].getBoundingClientRect().height) {
      imagesTop.push([i, images[i].getBoundingClientRect().top - images[0].getBoundingClientRect().top + images[i].getBoundingClientRect().height]);
      images[i].style.display = 'none';
    }
  }
};

var onWorksScroll = function () {
  for (var i = 0; i < imagesTop.length; i++) {
    if (body.getBoundingClientRect().height > imagesTop[i][1] + images[0].getBoundingClientRect().top && images[imagesTop[i][0]].style.display === 'none') {
      images[imagesTop[i][0]].style.display = 'block';
    }
  }
};

var addWheelEvent = function (elem) {
  if (elem.addEventListener) {
    if ('onwheel' in document) {
      // IE9+, FF17+, Ch31+
      elem.addEventListener("wheel", onWheel);
    } else if ('onmousewheel' in document) {
      // устаревший вариант события
      elem.addEventListener("mousewheel", onWheel);
    } else {
      // Firefox < 17
      elem.addEventListener("MozMousePixelScroll", onWheel);
    }
  } else { // IE8-
    elem.attachEvent("onmousewheel", onWheel);
  }
};

var isEscEvent = function (evt, action) {
  if (evt.keyCode === ESC_KEYCODE) {
    action(evt);
  }
};

var onMainSpacePress = function (evt) {
  isSpaceEvent(evt, onHeaderButtonClick);
};

var onMenuKeyPress = function (evt) {
  isNumEvent(evt, onNavItemClick);
};

var onEscPress = function (evt) {
  isEscEvent(evt, onSectionWrapButtonClick);
};

var onUpDownKeyPress = function (evt) {
  evt.preventDefault();
  isUpDownKeyEvent(evt, onUpDownKey);
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

var onElemTouch = function (evt) {
  evt.preventDefault();
  var element = evt.currentTarget;
  var startY = evt.changedTouches[0].pageY;
  var beginY = startY;
  var moveTime;
  var endTime;
  var onTouchMove = function (moveEvt) {
    var shift = startY - moveEvt.changedTouches[0].pageY;
    startY = moveEvt.changedTouches[0].pageY;
    transformElement(element, shift, 'none');
    moveTime = moveEvt.timeStamp;
    //moveEvt.preventDefault();
  };
  var onTouchEnd = function (endEvt) {
    endEvt.preventDefault();
    var endY = endEvt.changedTouches[0].pageY;
    var shift = beginY - endY;
    endTime = endEvt.timeStamp;
    if (endTime - moveTime < 100) {
      transformElement(element, shift * 2, '0.8s ease-out');
    }
    //transformElement(element, shift * 2, '0.8s ease-out');
    document.removeEventListener('touchmove', onTouchMove);
    document.removeEventListener('touchend', onTouchEnd);
  };
  document.addEventListener('touchmove', onTouchMove);
  document.addEventListener('touchend', onTouchEnd);
};

var transformElement = function (element, delta, transition) {
  var sectionWrapTop = getComputedStyle(sectionWrap).paddingTop.slice(0, -2);
  var parentTop = element.parentElement.getBoundingClientRect().top;
  var sectionWrapHeight = sectionWrap.getBoundingClientRect().height;
  var elemHeight = element.getBoundingClientRect().height;
  var elemStart = getComputedStyle(element).transform;
  if (elemStart === 'none') {
    elemStart = 0;
  } else {
    elemStart = elemStart.slice(22, -1);
  }
  var transformValue = elemStart - delta;
  if (transformValue < -elemHeight + sectionWrapHeight - sectionWrapTop - parentTop) {
    transformValue = -elemHeight + sectionWrapHeight - sectionWrapTop - parentTop;
  }
  if (transformValue > 0) {
    transformValue = 0;
  }
  element.style.transform = 'translateY(' + transformValue + 'px)';
  element.style.transition = transition;
  if (element.parentElement.classList.contains('works')) {
    onWorksScroll();
  }
};

// var transformElement = function (element, delta, transition) {
//   var sectionWrapTop = getComputedStyle(sectionWrap).paddingTop.slice(0, -2);
//   var parentTop = element.parentElement.getBoundingClientRect().top;
//   var sectionWrapHeight = sectionWrap.getBoundingClientRect().height;
//   var elemHeight = element.getBoundingClientRect().height;
//   var elemStart = getComputedStyle(element).transform;
//   var OVER = 30;
//   var endElement = function (tv) {
//     element.style.transform = 'translateY(' + tv + 'px)';
//     element.style.transition = '0.4s ease 0.4s';
//   };
//   if (elemStart === 'none') {
//     elemStart = 0;
//   } else {
//     elemStart = elemStart.slice(22, -1);
//   }
//   var transformValue = elemStart - delta;
//   if (transformValue < -elemHeight + sectionWrapHeight - sectionWrapTop - parentTop && elemStart <= -elemHeight + sectionWrapHeight - sectionWrapTop - parentTop) {
//     transformValue = -elemHeight + sectionWrapHeight - sectionWrapTop - parentTop - OVER;
//     element.style.transform = 'translateY(' + transformValue + 'px)';
//     element.style.transition = '0.4s ease';
//     transformValue = -elemHeight + sectionWrapHeight - sectionWrapTop - parentTop;
//     window.setTimeout(endElement, TIME, transformValue);
//   } else if (transformValue > 0 && elemStart >= 0) {
//     transformValue = OVER;
//     element.style.transform = 'translateY(' + transformValue + 'px)';
//     element.style.transition = '0.4s ease';
//     transformValue = 0;
//     window.setTimeout(endElement, TIME, transformValue);
//   } else {
//     element.style.transform = 'translateY(' + transformValue + 'px)';
//     element.style.transition = transition;
//   }
//   if (element.parentElement.classList.contains('works')) {
//     onWorksScroll();
//   }
// };

var onUpDownKey = function (evt, flag) {
  var DELTA = -150;
  if (flag === 2) {
    DELTA = 150;
  }
  if (evt.altKey) {
    transformElement(sidebarWrap, DELTA, '0.2s ease');
  } else {
    var dataLink = sectionWrapButton.dataset.link;
    var element = sectionWrap.querySelector('.' + dataLink).lastChild;
    transformElement(element, DELTA, '0.2s ease');
  }
};

var onWheel = function (evt) {
  evt = evt || window.event;
  evt.preventDefault ? evt.preventDefault() : (evt.returnValue = false);
  var delta = evt.deltaY || evt.detail || evt.wheelDelta;
  transformElement(evt.currentTarget, delta, 'none');
};

var showHideHeaderText = function () {
  headerButton.classList.toggle('header__button--hide');
  window.setTimeout(toggleClass, TIME, headerTextWrap, 'header__text-wrap--hide');
  window.setTimeout(toggleClass, TIME / 2, headerAvatar, 'header__avatar--hide');
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
  sectionWrapButton.removeEventListener('click', onSectionWrapButtonClick);
  sidebarButton.removeEventListener('click', onSidebarButtonClick);
  document.removeEventListener('keydown', onUpDownKeyPress);
  document.removeEventListener('keydown', onEscPress);
  sectionWrapButton.focus();
  var dataLink = sectionWrapButton.dataset.link;
  var hideElement = sectionWrap.querySelector('.' + dataLink);
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
  sidebarWrap.style.transform = 'none';
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
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].removeEventListener('click', onNavItemClick);
    if (navItems[i] !== clickedElement) {
      navItems[i].classList.remove('nav__item--show');
    }
    window.setTimeout(removeClass, TIME, clickedElement, 'nav__item--show');
    window.setTimeout(setWillChange, TIME * 4, navItems, 'auto');
  }
  clickedElement.firstElementChild.focus();
  if (clickedElement === navItems[0]) {
    headerButton.addEventListener('click', onHeaderButtonClick);
    window.setTimeout(removeClass, TIME, headerButtonWrap, 'header__button-wrap--hide');
    window.setTimeout(removeClass, TIME, headerWrap, 'header__wrap--hide');
    window.setTimeout(removeClass, TIME * 2, nav, 'nav--show');
    window.setTimeout(showHideHeaderText, TIME * 2);
    window.setTimeout(addListener, TIME * 3, document, onMainSpacePress, 'keydown');
  } else {
    var dataLink = clickedElement.dataset.link;
    var showElement = sectionWrap.querySelector('.' + dataLink);
    showElement.classList.add(dataLink + '--show');
    if (dataLink === 'works') {
      window.setTimeout(displayImages, TIME * 3);
    }
    if (dataLink === 'contacts') {
      var addFocus = function () {
        inputName.focus();
      };
      window.setTimeout(addFocus, TIME * 5);
    }
    sectionWrapButtonWrap.classList.add('section-wrap__button-wrap--show');
    addWheelEvent(sidebarWrap);
    addWheelEvent(showElement.lastChild);
    sidebarWrap.style.transform = 'none';
    showElement.lastChild.style.transform = 'none';
    window.setTimeout(addClass, TIME * 2, header, 'header--hide');
    window.setTimeout(removeClass, TIME * 2, main, 'main--hide');
    window.setTimeout(toggleClass, TIME, wrapper, 'wrapper--anim');
    window.setTimeout(toggleClass, TIME, wrapper, 'wrapper--open');
    window.setTimeout(addClass, TIME * 3, sectionWrap, 'section-wrap--show');
    window.setTimeout(addClass, TIME * 4, sectionWrapButton, 'section-wrap__button--show');
    window.setTimeout(addClass, TIME * 5, sectionWrapButton, 'section-wrap__button--anim');
    sectionWrapButton.dataset.link = dataLink;
    sectionWrapButton.addEventListener('click', onSectionWrapButtonClick);
    sectionWrapButton.addEventListener('mouseenter', function () {
      setWillChange(navItems, 'transform, opacity');
    });
    sectionWrapButton.addEventListener('focus', function () {
      setWillChange(navItems, 'transform, opacity');
    });
    sidebarButton.addEventListener('click', onSidebarButtonClick);
    window.setTimeout(addListener, TIME * 5, document, onEscPress, 'keydown');
    window.setTimeout(addListener, TIME * 5, document, onUpDownKeyPress, 'keydown');
    window.setTimeout(addListener, TIME * 5, sidebarWrap, onElemTouch, 'touchstart');
    window.setTimeout(addListener, TIME * 5, showElement.lastChild, onElemTouch, 'touchstart');
  }
};

war.classList.remove("war--nojs");
headerButton.addEventListener('click', onHeaderButtonClick);
headerButton.addEventListener('focus', function () {
  setWillChange(navItems, 'transform, opacity');
});
headerButton.addEventListener('mouseenter', function () {
  setWillChange(navItems, 'transform, opacity');
});
document.addEventListener('keydown', onMainSpacePress);
window.addEventListener('resize', function () {
  sidebarWrap.style.transform = 'none';
  var sections = sectionWrap.querySelectorAll('.about, .resume, .works, .contacts');
  for (var i = 0; i < sections.length; i++) {
    sections[i].lastChild.style.transform = 'none';
  }
});


}, false);
