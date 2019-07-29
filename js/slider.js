'use strict';

(function () {
  var sliderElement = document.querySelector('.effect-level');
  var sliderLineElement = sliderElement.querySelector('.effect-level__line');
  var sliderPinElement = sliderElement.querySelector('.effect-level__pin');
  var sliderLevelElement = sliderElement.querySelector('.effect-level__depth');
  var imageUploadElement = document.querySelector('.img-upload__preview');
  var effectsListElement = document.querySelector('.effects__list');

  var initSlider = function () {

    effectsListElement.addEventListener('click', function (e) {
      sliderPinElement.style.left = '100%';
      sliderLevelElement.style.width = '100%';

      if (effectsListElement.querySelector('#effect-none').checked) {
        sliderElement.style.visibility = 'hidden';
      } else {
        sliderElement.style.visibility = 'visible';
      }

      if (e.target.classList.contains('effects__preview')) {
        imageUploadElement.classList = 'img-upload__preview';
        imageUploadElement.classList.add(e.target.classList[1]);
        window.changeSaturation(1);
      }
    });

    sliderPinElement.addEventListener('mousedown', function (e) {
      e.preventDefault();
      var startCoords = e.clientX;

      var onMouseMove = function (moveE) {
        moveE.preventDefault();

        var shift = startCoords - moveE.clientX;
        var sliderNumber = (sliderPinElement.offsetLeft / sliderLineElement.offsetWidth).toFixed(1);
        startCoords = moveE.clientX;

        if (sliderPinElement.offsetLeft - shift >= 0 && sliderPinElement.offsetLeft - shift <= sliderLineElement.offsetWidth) {
          sliderPinElement.style.left = (sliderPinElement.offsetLeft - shift) + 'px';
          sliderLevelElement.style.width = (sliderPinElement.offsetLeft) + 'px';
        }

        window.changeSaturation(sliderNumber);
      };

      var onMouseUp = function (upE) {
        upE.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

  initSlider();
})();
