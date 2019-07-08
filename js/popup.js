'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var uploadWindow = document.querySelector('.img-upload');
  window.uploadWindow = uploadWindow;
  var uploadPreview = uploadWindow.querySelector('.img-upload__overlay');
  var uploadInput = uploadWindow.querySelector('#upload-file');
  var uploadCancelButton = uploadWindow.querySelector('#upload-cancel');
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

  uploadInput.addEventListener('change', onUploadInputChange);
  uploadCancelButton.addEventListener('click', closeUploadPreview);
})();
