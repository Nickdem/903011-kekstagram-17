'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var HASHTAG_MAX_LENGTH = 20;
  var MAX_HASHTAGS = 5;

  var uploadWindow = document.querySelector('.img-upload');
  window.uploadWindow = uploadWindow;
  var uploadPreview = uploadWindow.querySelector('.img-upload__overlay');
  var uploadInput = uploadWindow.querySelector('#upload-file');
  var uploadCancelButton = uploadWindow.querySelector('#upload-cancel');
  var slider = document.querySelector('.effect-level');
  var previewImage = window.uploadWindow.querySelector('.img-upload__preview');
  var scaleControl = window.uploadWindow.querySelector('.scale__control--value');
  var imageInPreview = document.querySelector('.img-upload__preview img');
  var effectsPreview = document.querySelectorAll('.effects__preview');
  var form = document.querySelector('.img-upload__form');
  var commentInput = form.querySelector('.text__description');
  var hashtagInput = form.querySelector('.text__hashtags');
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error')
  .content;
  var successTemplate = document.querySelector('#success')
  .content;

  var onUploadPreviewEscPress = function (evt) {
    if (window.util.isEscPressed(evt) && !commentInput.matches(':focus') && !hashtagInput.matches(':focus')) {
      closeUploadPreview();
    }
  };

  var closeUploadPreview = function () {
    uploadPreview.classList.add('hidden');
    document.removeEventListener('keydown', onUploadPreviewEscPress);
    uploadInput.value = '';
  };

  var openUploadPreview = function () {
    uploadPreview.classList.remove('hidden');
    slider.style.visibility = 'hidden';
    document.addEventListener('keydown', onUploadPreviewEscPress);
    previewImage.style.transform = 'scale(1)';
    scaleControl.value = '100%';
    previewImage.style.filter = 'none';
    document.querySelector('#effect-none').checked = 'checked';
  };

  var onUploadInputChange = function () {
    openUploadPreview();
    var file = uploadInput.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        imageInPreview.src = reader.result;
        effectsPreview.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
        openUploadPreview();
      });

      reader.readAsDataURL(file);
    }
  };

  commentInput.addEventListener('invalid', function () {
    if (commentInput.validity.tooLong) {
      commentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
    }
  });

  hashtagInput.addEventListener('input', function () {
    var hashtagError = validateHashtags(hashtagInput.value);
    hashtagInput.setCustomValidity(hashtagError);
  });

  var validateHashtags = function (userInput) {
    if (userInput === '') {
      return '';
    }

    var arrayHashtags = userInput.toLowerCase().split(' ');

    if (arrayHashtags.length > MAX_HASHTAGS) {
      return 'Вы не можете использовать больше 5 хэштегов';
    }

    for (var i = 0; i < arrayHashtags.length; i++) {
      var hashtag = arrayHashtags[i];

      if (hashtag[0] !== '#') {
        return 'Вы забыли поставить знак #';
      }

      if (hashtag === '#') {
        return ' Вы не ввели текст хэштэга';
      }

      var cutHashtag = hashtag.slice(1);

      if (cutHashtag.indexOf('#') !== -1) {
        return 'Вы забыли поставить пробел между хэштегами';
      }

      if (arrayHashtags.indexOf(hashtag) !== i) {
        return 'Вы уже использовали данный хэштег';
      }

      if (hashtag.length > HASHTAG_MAX_LENGTH) {
        return 'Длина хэштега должна быть не больше 20 символов, включая решётку';
      }
    }

    return '';
  };

  form.addEventListener('submit', function (formEvt) {
    formEvt.preventDefault();

    window.data.save(new FormData(form), function () {
      resetForm();
      closeUploadPreview();
      openSuccess();
    }, errorHandler);
  });

  var errorHandler = function () {
    resetForm();
    closeUploadPreview();
    openError();
  };

  var resetForm = function () {
    document.querySelector('#effect-heat').checked = true;
    hashtagInput.value = '';
    commentInput.value = '';
  };

  var openSuccess = function () {
    var successPopup = successTemplate.cloneNode(true).firstElementChild;
    main.appendChild(successPopup);

    var successButton = document.querySelector('.success__button');

    var closeSuccess = function () {
      main.removeChild(successPopup);
      successButton.removeEventListener('click', closeSuccess);
      document.removeEventListener('keydown', escSuccessHandler);
    };

    successButton.addEventListener('click', closeSuccess);

    var escSuccessHandler = function (evt) {
      if (window.util.isEscPressed(evt)) {
        closeSuccess();
      }
    };

    document.addEventListener('keydown', escSuccessHandler);

    successPopup.addEventListener('click', function (evt) {
      if (evt.target === successPopup) {
        closeSuccess();
      }
    });
  };

  var openError = function () {
    var errorPopup = errorTemplate.cloneNode(true).firstElementChild;
    main.appendChild(errorPopup);

    var closeError = function () {
      main.removeChild(errorPopup);
      document.removeEventListener('keydown', escErrorHandler);
    };

    var escErrorHandler = function (evt) {
      if (window.util.isEscPressed(evt)) {
        closeError();
      }
    };

    document.addEventListener('keydown', escErrorHandler);

    errorPopup.addEventListener('click', function (evt) {
      if (evt.target === errorPopup || evt.target.matches('.error__button')) {
        closeError();
      }
    });
  };

  uploadInput.addEventListener('change', onUploadInputChange);
  uploadCancelButton.addEventListener('click', closeUploadPreview);
})();
