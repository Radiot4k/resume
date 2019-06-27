'use strict';

(function() {
  var lang = document.querySelector('html');
  var f = document.querySelector('.contacts__form');
  var textarea = f.querySelector('#form-text');
  var notification = f.querySelector('.form__notification');
  var URL = 'https://spyrydonov.top/contact-form.php';

  var okMess = 'Thank you! Your message has been sent.';
  var errMess = 'Sorry. Your message could not be sent.';

  if (lang.lang === 'ru') {
    okMess = 'Спасибо! Ваше сообщение успешно отправлено.';
    errMess = 'Произошла ошибка. Ваше сообщение не было отправлено.';
  }

  var getRequest = function (url, method, data) {
    var xhr = new XMLHttpRequest();

    //xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        notification.textContent = okMess;
        notification.style.color = 'green';
        textarea.value = '';
      } else {
        notification.textContent = errMess;
        notification.style.color = 'tomato';
      }
    });

    xhr.addEventListener('error', function () {
      notification.textContent = errMess;
      notification.style.color = 'tomato';
    });

    xhr.open(method, url);
    xhr.send(data);

    notification.classList.add('form__notification--show');
    var hideNotif = function () {
      notification.classList.remove('form__notification--show');
    };
    window.setTimeout(hideNotif, 5000);
  };

  f.addEventListener('submit', function(evt) {
    evt.preventDefault();
    getRequest(URL, 'POST', new FormData(f));
  });
})();
