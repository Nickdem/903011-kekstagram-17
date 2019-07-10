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

    return picture;
  };

  var successHandler = function (images) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < images.length; i++) {
      fragment.appendChild(createPicturesDOM(images[i]));
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
})();
