'use strict';

var slider = document.querySelector('.effect-level');
var sliderLine = slider.querySelector('.effect-level__line');
var sliderPin = slider.querySelector('.effect-level__pin');
var sliderLevel = slider.querySelector('.effect-level__depth');
var imageWrap = document.querySelector('.img-upload__preview');
var effects = document.querySelector('.effects__list');

var effectsListener = function (evt) {
  sliderPin.style.left = '100%';
  sliderLevel.style.width = '100%';

  if (effects.querySelector('#effect-none').checked) {
    slider.style.visibility = 'hidden';
  } else {
    slider.style.visibility = 'visible';
  }

  if (evt.target.classList.contains('effects__preview')) {
    imageWrap.classList = 'img-upload__preview';
    imageWrap.classList.add(evt.target.classList[1]);
    changeSaturation(1);
  }
};

var sliderPinListener = function (evt) {
  evt.preventDefault();
  var startCoords = evt.clientX;

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = startCoords - moveEvt.clientX;
    var sliderNumber = (sliderPin.offsetLeft / sliderLine.offsetWidth).toFixed(1);

    startCoords = moveEvt.clientX;

    if (sliderPin.offsetLeft - shift >= 0 && sliderPin.offsetLeft - shift <= sliderLine.offsetWidth) {
      sliderPin.style.left = (sliderPin.offsetLeft - shift) + 'px';
      sliderLevel.style.width = (sliderPin.offsetLeft) + 'px';
    }

    changeSaturation(sliderNumber);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

window.initSlider = function () {
  effects.addEventListener('click', effectsListener);
  sliderPin.addEventListener('mousedown', sliderPinListener);
};

var classList = imageWrap.classList;

var changeSaturation = function (intensityIndex) {
  if (classList.contains('effects__preview--chrome')) {
    imageWrap.style.filter = 'grayscale(' + intensityIndex + ')';
  } else if (classList.contains('effects__preview--sepia')) {
    imageWrap.style.filter = 'sepia(' + intensityIndex + ')';
  } else if (classList.contains('effects__preview--marvin')) {
    imageWrap.style.filter = 'invert(' + (intensityIndex * 100) + '%)';
  } else if (classList.contains('effects__preview--phobos')) {
    imageWrap.style.filter = 'blur(' + (intensityIndex * 3) + 'px)';
  } else if (classList.contains('effects__preview--heat')) {
    imageWrap.style.filter = 'brightness(' + (1 + intensityIndex * 2) + ')';
  } else if (classList.contains('effects__preview--none')) {
    imageWrap.style.filter = '';
  }
};

window.initSlider(changeSaturation);
