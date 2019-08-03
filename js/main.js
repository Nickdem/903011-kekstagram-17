'use strict';

(function () {
  var pictureTemplate = document.querySelector('#picture')
    .content.querySelector('.picture');
  var pictures = document.querySelector('.pictures');
  var pictureFilter = document.querySelector('.img-filters');
  var popular = pictureFilter.querySelector('#filter-popular');
  var news = pictureFilter.querySelector('#filter-new');
  var discussed = pictureFilter.querySelector('#filter-discussed');

  var createPicturesDOM = function (image) {
    var picture = pictureTemplate.cloneNode(true);
    picture.querySelector('.picture__img').src = image.url;
    picture.querySelector('.picture__comments').textContent = image.comments.length;
    picture.querySelector('.picture__likes').textContent = image.likes;

    var pictureImg = picture.querySelector('.picture__img');

    pictureImg.addEventListener('load', function () {
      loadImages += 1;
      if (totalImages === loadImages) {
        activateFilter();
      }
    });

    pictureImg.addEventListener('click', function () {
      window.bigsize(image);
    });

    return picture;
  };

  var totalImages = 0;
  var loadImages = 0;

  var activateFilter = function () {
    pictureFilter.classList.remove('img-filters--inactive');
  };

  var successHandler = function (images) {
    var fragment = document.createDocumentFragment();
    var picture = null;

    images.forEach(function (item) {
      picture = createPicturesDOM(item);
      fragment.appendChild(picture);
      totalImages += 1;
    });

    var photosRemoved = pictures.querySelectorAll('.picture');

    photosRemoved.forEach(function (el) {
      el.remove();
    });

    pictures.appendChild(fragment);
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

  window.data.load(successHandler, errorHandler);

  popular.addEventListener('click', window.util.debounce(function () {
    window.data.load(successHandler, errorHandler);
    popular.classList.add('img-filters__button--active');
    news.classList.remove('img-filters__button--active');
    discussed.classList.remove('img-filters__button--active');
  }

  ));

  news.addEventListener('click', window.util.debounce(function () {
    window.data.load(function (images) {
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

  discussed.addEventListener('click', window.util.debounce(function () {
    window.data.load(function (images) {
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
