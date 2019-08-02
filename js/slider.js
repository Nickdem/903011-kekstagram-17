'use strict';

(function () {
  var slider = document.querySelector('.effect-level');
  var sliderLine = slider.querySelector('.effect-level__line');
  var sliderPin = slider.querySelector('.effect-level__pin');
  var sliderLevel = slider.querySelector('.effect-level__depth');
  var previewImage = document.querySelector('.img-upload__preview');
  var effectsList = document.querySelector('.effects__list');

  var initSlider = function () {
    effectsList.addEventListener('click', function (e) {
      sliderPin.style.left = '100%';
      sliderLevel.style.width = '100%';

      if (effectsList.querySelector('#effect-none').checked) {
        slider.style.visibility = 'hidden';
      } else {
        slider.style.visibility = 'visible';
      }

      if (e.target.classList.contains('effects__preview')) {
        previewImage.classList = 'img-upload__preview';
        previewImage.classList.add(e.target.classList[1]);
        window.filter(1);
      }
    });

    sliderPin.addEventListener('mousedown', function (e) {
      e.preventDefault();
      var startCoords = e.clientX;

      var onMouseMove = function (moveE) {
        moveE.preventDefault();

        var shift = startCoords - moveE.clientX;
        var sliderNumber = (sliderPin.offsetLeft / sliderLine.offsetWidth).toFixed(1);
        startCoords = moveE.clientX;

        if (sliderPin.offsetLeft - shift >= 0 && sliderPin.offsetLeft - shift <= sliderLine.offsetWidth) {
          sliderPin.style.left = (sliderPin.offsetLeft - shift) + 'px';
          sliderLevel.style.width = (sliderPin.offsetLeft) + 'px';
        }

        window.filter(sliderNumber);
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
