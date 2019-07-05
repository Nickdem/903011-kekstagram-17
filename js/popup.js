'use strict';

var ESC_KEYCODE = 27;
var MAX_SCALE_VALUE = '100%';
var MIN_SCALE_VALUE = '25%';
var SCALE_STEP = 25;

var uploadWindow = document.querySelector('.img-upload');
var uploadPreview = uploadWindow.querySelector('.img-upload__overlay');
var uploadInput = uploadWindow.querySelector('#upload-file');
var uploadCancelButton = uploadWindow.querySelector('#upload-cancel');
var scaleControl = uploadWindow.querySelector('.scale__control--value');
var scaleControlBigger = uploadWindow.querySelector('.scale__control--bigger');
var scaleControlSmaller = uploadWindow.querySelector('.scale__control--smaller');
var previewImage = uploadWindow.querySelector('.img-upload__preview');
var slider = document.querySelector('.effect-level');

var openUploadPreview = function () {
  uploadPreview.classList.remove('hidden');
  slider.style.visibility = 'hidden';
  document.addEventListener('keydown', onUploadPreviewEscPress);
};

var onUploadInputChange = function () {
  openUploadPreview();
};

var textDescription = document.querySelector('.text__description');

var onUploadPreviewEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && textDescription !== document.activeElement) {
    closeUploadPreview();
  }
};

var closeUploadPreview = function () {
  uploadPreview.classList.add('hidden');
  document.removeEventListener('keydown', onUploadPreviewEscPress);
  uploadInput.value = '';
};

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
uploadInput.addEventListener('change', onUploadInputChange);
uploadCancelButton.addEventListener('click', closeUploadPreview);
