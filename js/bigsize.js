'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var pictureUrl = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var socComments = document.querySelector('.social__comments');
  var description = document.querySelector('.social__caption');
  var socCommentsCount = document.querySelector('.social__comment-count');
  var commentsLoad = document.querySelector('.comments-loader');
  var pictureCancel = document.querySelector('#picture-cancel');

  var getBigPic = function (photo) {
    bigPicture.classList.remove('hidden');
    pictureUrl.src = photo.url;
    likesCount.textContent = photo.likes;
    commentsCount.textContent = photo.comments.length;

    var renderComments = function (comments, count) {
      socComments.innerHTML = '';

      for (var i = 0; i < comments.length && i < count; i++) {
        socComments.innerHTML +=
        '<li class="social__comment">'
        + '<img class="social__picture" src="img/avatar-' + Math.floor(Math.random() * 6 + 1) + '.svg"'
        + 'alt="Аватар комментатора фото"'
        + 'width="35" height="35">'
        + '<p class="social__text">' + comments[i].message + '</p>'
        + '</li>';
      }

      if (count > comments.length) {
        commentsLoad.classList.add('visually-hidden');
      } else {
        commentsLoad.classList.remove('visually-hidden');
      }
    };

    var commentCounter = 5;

    renderComments(photo.comments, commentCounter);

    commentsLoad.addEventListener('click', function () {
      commentCounter += 5;
      renderComments(photo.comments, commentCounter);
    });

    description.textContent = photo.description;

    socCommentsCount.classList.add('visually-hidden');

    var closeWindow = function () {
      bigPicture.classList.add('hidden');
      document.removeEventListener('keydown', escPressHandler);
    };

    var escPressHandler = function (evt) {
      if (evt.keyCode === 27) {
        closeWindow();
      }
    };

    document.addEventListener('keydown', escPressHandler);

    pictureCancel.addEventListener('click', function () {
      closeWindow();
    });

    pictureCancel.addEventListener('keydown', function (evt) {
      if (evt.keyCode === 13) {
        closeWindow();
      }
    });
  };

  window.bigsize = getBigPic;
})();
