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

  var commentInput = document.querySelector('.text__description');

  commentInput.addEventListener('invalid', function () {
    if (commentInput.validity.tooLong) {
      commentInput.setCustomValidity('Длина комментария не должна превышать 140 символов');
    }
  });

  var hashtagInput = document.querySelector('.text__hashtags');

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

  uploadInput.addEventListener('change', onUploadInputChange);
  uploadCancelButton.addEventListener('click', closeUploadPreview);
})();
