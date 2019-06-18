'use strict';

var COMMENT_PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.'
];

var NAMES = [
  'Алексей',
  'Кирилл',
  'Георгий',
  'Анна',
  'Валерия',
];

var LIKES_MIN_NUMBER = 15;
var LIKES_MAX_NUMBER = 200;
var NUMBER_OF_PICTURES = 25;

var pictureTemplate = document.querySelector('#picture')
  .content.querySelector('.picture');
var picturesElement = document.querySelector('.pictures');

var getRandomInt = function (min, max) {
  var randomInt = Math.round(Math.random() * (max - min));
  return randomInt;
};

function generateObject(number) {
  var photo;
  photo = {
    url: 'photos/' + (number + 1) + '.jpg',
    likes: getRandomInt(LIKES_MIN_NUMBER, LIKES_MAX_NUMBER),
    comments: generateComments(getRandomInt(0, 2))
  };

  return photo;
}

function generateComments(amount) {
  var comments = [];
  for (var i = 0; i < amount; i++) {
    comments[i] = {
      avatar: 'img/avatar-' + getRandomInt(1, 6) + '.svg',
      message: COMMENT_PHRASES[getRandomInt(0, COMMENT_PHRASES.length - 1)],
      name: NAMES[getRandomInt(0, NAMES.length)]
    };
  }

  return comments;
}

function createPicturesDOM(image) {
  var picture = pictureTemplate.cloneNode(true);
  picture.querySelector('.picture__img').src = image.url;
  picture.querySelector('.picture__comments').textContent = image.comments.length;
  picture.querySelector('.picture__likes').textContent = image.likes;

  return picture;
}

var fragment = document.createDocumentFragment();

for (var i = 0; i < NUMBER_OF_PICTURES; i++) {
  fragment.appendChild(createPicturesDOM(generateObject(i)));
}

picturesElement.appendChild(fragment);
