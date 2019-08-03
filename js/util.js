'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };

  window.util = {
    isEnterPressed: function (evt) {
      return evt.keyCode === KeyCode.ENTER;
    },

    isEscPressed: function (evt) {
      return evt.keyCode === KeyCode.ESC;
    },

    debounce: function (cb) {
      var lastTimeout = null;

      return function () {
        var parameters = arguments;
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          cb.apply(null, parameters);
        }, DEBOUNCE_INTERVAL);
      };
    }
  };
})();
