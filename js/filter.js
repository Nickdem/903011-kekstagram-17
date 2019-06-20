'use strict';
var DEFOLT_FILTER_VALUE = 100;
var currentScaleValue = DEFOLT_FILTER_VALUE;

var slider = uploadWindow.querySelector('.effect-level__pin');
var levelLine = uploadWindow.querySelector('.effect-level__line');
var effectLevel = uploadWindow.querySelector('.effect-level');
var effectValueElement = effectLevel.querySelector('.effect-level__value');
var effectsList = document.querySelector('.effects__list');
var effectsRadioElements = effectsList.querySelectorAll('.effects__radio');

var img = previewImage.querySelector('img');

var changeEffects = function (evt) {
  previewImage.className = '';
  if (evt.target.value !== 'none') {
    effectLevel.classList.remove('hidden');
    previewImage.classList.add(
        'effects__preview--' + evt.target.value
    );
  }

  if (evt.target.value === 'none') {
    previewImage.style.filter = '';
    effectLevel.classList.add('hidden');
  }
  if (evt.target.value === 'chrome') {
    previewImage.style.filter = 'grayscale(1)';
  }
  if (evt.target.value === 'sepia') {
    previewImage.style.filter = 'sepia(1)';
  }
  if (evt.target.value === 'marvin') {
    previewImage.style.filter = 'invert(100%)';
  }
  if (evt.target.value === 'phobos') {
    previewImage.style.filter = 'blur(3px)';
  }
  if (evt.target.value === 'heat') {
    previewImage.style.filter = 'brightness(3)';
  }
};

effectsRadioElements.forEach(function (item) {
  item.addEventListener('change', function (evt) {
    changeEffects(evt);
  });
});

var changeIntensityEffect = function () {
  effectValueElement.value = (
    slider.offsetLeft / levelLine.clientWidth).toFixed(1);

  if (previewImage.classList[0] === 'none') {
    previewImage.style.filter = 'none';
  }

  if (previewImage.classList[0] === 'chrome') {
    previewImage.style.filter = 'grayscale(' + effectValueElement.value + ')';
  }
  if (previewImage.classList[0] === 'sepia') {
    previewImage.style.filter = 'sepia(' + effectValueElement.value + ')';
  }
  if (previewImage.classList[0] === 'marvin') {
    previewImage.style.filter = 'invert(' + effectValueElement.value * 100 + '%)';
  }
  if (previewImage.classList[0] === 'phobos') {
    previewImage.style.filter = 'blur(' + (effectValueElement.value * 3) + 'px)';
  }
  if (previewImage.classList[0] === 'heat') {
    previewImage.style.filter = 'brightness(' + (effectValueElement.value * 3 + ')');
  }
};

slider.addEventListener('mouseup', function () {
  changeIntensityEffect();
});
