'use strict';

(function () {
  var MAX_SCALE_VALUE = '100%';
  var MIN_SCALE_VALUE = '25%';
  var SCALE_STEP = 25;

  var scaleControl = window.uploadWindow.querySelector('.scale__control--value');
  var scaleControlBigger = window.uploadWindow.querySelector('.scale__control--bigger');
  var scaleControlSmaller = window.uploadWindow.querySelector('.scale__control--smaller');
  var previewImage = window.uploadWindow.querySelector('.img-upload__preview');

  var increaseScaleValue = function () {
    var scaleStep = (scaleControl.value === MAX_SCALE_VALUE) ? 0 : SCALE_STEP;
    scaleControl.value = (parseInt(scaleControl.value, 10) + scaleStep) + '%';
  };

  var decreaseScaleValue = function () {
    var scaleStep = (scaleControl.value === MIN_SCALE_VALUE) ? 0 : SCALE_STEP;
    scaleControl.value = (parseInt(scaleControl.value, 10) - scaleStep) + '%';
  };

  var changeScale = function () {
    var currentScale = parseInt(scaleControl.value, 10);
    previewImage.style.transform = 'scale( ' + (currentScale / 100) + ')';
  };

  var onScaleBiggerClick = function () {
    increaseScaleValue();
    changeScale();
  };

  var onScaleSmallerClick = function () {
    decreaseScaleValue();
    changeScale();
  };

  scaleControlBigger.addEventListener('click', onScaleBiggerClick);
  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
})();
