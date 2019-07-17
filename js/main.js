'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');
  var picturesElement = document.querySelector('.pictures');

  var createPicturesDOM = function (image) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = image.url;
    picture.querySelector('.picture__comments').textContent = image.comments.length;
    picture.querySelector('.picture__likes').textContent = image.likes;

    var picImg = picture.querySelector('.picture__img');

    picImg.addEventListener('load', function () {
      loadImages += 1;
      if (totalImages === loadImages) {
        activateFilter();
      }
    });

    return picture;
  };

  var totalImages = 0;
  var loadImages = 0;
  var picFilter = document.querySelector('.img-filters');

  var activateFilter = function () {
    picFilter.classList.remove('img-filters--inactive');
  };

  var successHandler = function (images) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < images.length; i++) {
      fragment.appendChild(createPicturesDOM(images[i]));
      totalImages += 1;
    }
    var photosRemoved = picturesElement.querySelectorAll('.picture');

    for (i = 0; i < photosRemoved.length; i++) {
      picturesElement.removeChild(photosRemoved[i]);
    }
    picturesElement.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 10; margin: 0 auto; text-align: center; background-color: yellow; color: red;';
    node.style.position = 'absolute';
    node.style.left = '0';
    node.style.right = '0';
    node.style.fontSize = '18px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);
  var popular = picFilter.querySelector('#filter-popular');
  var news = picFilter.querySelector('#filter-new');
  var discussed = picFilter.querySelector('#filter-discussed');

  popular.addEventListener('click', window.debounce(function () {
    window.load(successHandler, errorHandler);
    popular.classList.add('img-filters__button--active');
    news.classList.remove('img-filters__button--active');
    discussed.classList.remove('img-filters__button--active');
  }

  ));

  news.addEventListener('click', window.debounce(function () {
    window.load(function (images) {
      var compareRandom = function () {
        return Math.random() - 0.5;
      };

      images.sort(compareRandom);

      var removed = images.splice(0, 10);

      successHandler(removed);
      popular.classList.remove('img-filters__button--active');
      news.classList.add('img-filters__button--active');
      discussed.classList.remove('img-filters__button--active');
    }, errorHandler);
  }));

  discussed.addEventListener('click', window.debounce(function () {
    window.load(function (images) {
      images.sort(function (first, second) {
        if (first.comments.length < second.comments.length) {
          return 1;
        } else if (first.comments.length > second.comments.length) {
          return -1;
        } else {
          return 0;
        }
      });

      successHandler(images);
      popular.classList.remove('img-filters__button--active');
      news.classList.remove('img-filters__button--active');
      discussed.classList.add('img-filters__button--active');
    }, errorHandler);
  }));
})();
