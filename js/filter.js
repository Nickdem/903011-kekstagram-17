'use strict';

(function () {

  var previewImage = document.querySelector('.img-upload__preview');

  var changeSaturation = function (intensityIndex) {

    var classToSaturation = {
      'effects__preview--chrome': 'grayscale(' + intensityIndex + ')',
      'effects__preview--sepia': 'sepia(' + intensityIndex + ')',
      'effects__preview--marvin': 'invert(' + (intensityIndex * 100) + '%)',
      'effects__preview--phobos': 'blur(' + (intensityIndex * 3) + 'px)',
      'effects__preview--heat': 'brightness(' + (1 + intensityIndex * 2) + ')',
      'effects__preview--none': 'none'
    };

    previewImage.classList.forEach(function (className) {
      var result = classToSaturation[className];

      if (result) {
        previewImage.style.filter = result;
      }
    });
  };

  window.filter = changeSaturation;
})();
