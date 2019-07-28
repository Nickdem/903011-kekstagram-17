'use strict';

(function () {
  window.bigsize = function (photo) {
  var bigPic = document.querySelector('.big-picture');
  var picUrl = bigPic.querySelector('.big-picture__img img');
  var likesCount = bigPic.querySelector('.likes-count');
  var commentsCount = bigPic.querySelector('.comments-count');
  var socComments = document.querySelector('.social__comments');
  var description = document.querySelector('.social__caption');
  var socCommentsCount = document.querySelector('.social__comment-count');
  var commentsLoad = document.querySelector('.comments-loader');

  bigPic.classList.remove('hidden');
  picUrl.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;

  socComments.innerHTML = '';

  for (var i = 0; i < photo.comments.length; i++) {
    socComments.innerHTML +=
    '<li class="social__comment">'
    + '<img class="social__picture" src="img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg"'
    + 'alt="Аватар комментатора фотографии"'
    + 'width="35" height="35">'
    + '<p class="social__text">' + photo.comments[i].message + '</p>'
    + '</li>';
  }

  description.textContent = photo.description;

  socCommentsCount.classList.add('visually-hidden');
  commentsLoad.classList.add('visually-hidden');

  var picCancel = document.querySelector('#picture-cancel');

  var closeWindow = function () {
    bigPic.classList.add('hidden');
    document.removeEventListener('keydown', EscPressHandler);
  };

  var EscPressHandler = function (evt) {
    if (evt.keyCode === 27) {
      closeWindow();
    }
  };

  document.addEventListener('keydown', EscPressHandler);

  picCancel.addEventListener('click', function () {
    closeWindow();
  });

  picCancel.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      closeWindow();
    }
  });
};
})();
