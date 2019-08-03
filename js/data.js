'use strict';

(function () {
  var SUCCESS_CODE = 200;
  var TIME_OUT = 10000;
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_SAVE = 'https://js.dump.academy/kekstagram';

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SUCCESS_CODE) {
        onLoad(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мc');
    });

    xhr.timeout = TIME_OUT;

    return xhr;
  };

  window.data = {
    load: function (onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('GET', URL_LOAD);
      xhr.send();
    },

    save: function (data, onLoad, onError) {
      var xhr = createRequest(onLoad, onError);
      xhr.open('POST', URL_SAVE);
      xhr.send(data);
    }
  };
})();
