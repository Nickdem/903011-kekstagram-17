'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var uploadWindow = document.querySelector('.img-upload');
  window.uploadWindow = uploadWindow;
  var uploadPreview = uploadWindow.querySelector('.img-upload__overlay');
  var uploadInput = uploadWindow.querySelector('#upload-file');
  var uploadCancelButton = uploadWindow.querySelector('#upload-cancel');
  var slider = document.querySelector('.effect-level');
  var previewImage = window.uploadWindow.querySelector('.img-upload__preview');

  var onUploadPreviewEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE && !commentInput.matches(':focus') && !hashtagInput.matches(':focus')) {
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
    previewImage.style.filter = 'none';
  };

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var imageInPreviewElement = document.querySelector('.img-upload__preview img');
  var effectsPreviewElement = document.querySelectorAll('.effects__preview');

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
        imageInPreviewElement.src = reader.result;
        effectsPreviewElement.forEach(function (item) {
          item.style.backgroundImage = 'url(' + reader.result + ')';
        });
        openUploadPreview();
      });

      reader.readAsDataURL(file);
    }
  };

  var form = document.querySelector('.img-upload__form');
  var commentInput = form.querySelector('.text__description');

  commentInput.addEventListener('invalid', function () {
    if (commentInput.validity.tooLong) {
      commentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
    }
  });

  var hashtagInput = form.querySelector('.text__hashtags');

  hashtagInput.addEventListener('input', function () {
    var hashtagError = validateHashtags(hashtagInput.value);
    hashtagInput.setCustomValidity(hashtagError);
  });

  var validateHashtags = function (userInput) {
    if (userInput === '') {
      return '';
    }

    var arrayHashtags = userInput.toLowerCase().split(' ');

    if (arrayHashtags.length > 5) {
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

      if (hashtag.length > 20) {
        return 'Длина хэштега должна быть не больше 20 символов, включая решётку';
      }
    }

    return '';
  };

  form.addEventListener('submit', function (formEvt) {
    formEvt.preventDefault();

    window.save(new FormData(form), function () {
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
    var successTemplate = document.querySelector('#success')
      .content;

    var successPopup = successTemplate.cloneNode(true).firstElementChild;
    var main = document.querySelector('main');

    main.appendChild(successPopup);

    var successButton = document.querySelector('.success__button');

    var closeSuccess = function () {
      main.removeChild(successPopup);
      successButton.removeEventListener('click', closeSuccess);
      document.removeEventListener('keydown', EscSuccessHandler);
    };

    successButton.addEventListener('click', closeSuccess);

    var EscSuccessHandler = function (evt) {
      if (evt.keyCode === window.ESC_KEYCODE) {
        closeSuccess();
      }
    };

    document.addEventListener('keydown', EscSuccessHandler);

    successPopup.addEventListener('click', function (evt) {
      if (evt.target === successPopup) {
        closeSuccess();
      }
    });
  };

  var openError = function () {
    var errorTemplate = document.querySelector('#error')
      .content;

    var errorPopup = errorTemplate.cloneNode(true).firstElementChild;
    var main = document.querySelector('main');

    main.appendChild(errorPopup);

    var closeError = function () {
      main.removeChild(errorPopup);
      document.removeEventListener('keydown', EscErrorHandler);
    };

    var EscErrorHandler = function (evt) {
      if (evt.keyCode === 27) {
        closeError();
      }
    };

    document.addEventListener('keydown', EscErrorHandler);

    errorPopup.addEventListener('click', function (evt) {
      if (evt.target === errorPopup || evt.target.matches('.error__button')) {
        closeError();
      }
    });
  };

  uploadInput.addEventListener('change', onUploadInputChange);
  uploadCancelButton.addEventListener('click', closeUploadPreview);
})();
