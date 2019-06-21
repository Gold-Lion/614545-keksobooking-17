var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TOTAL_PINS = 8;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 40;
var MAP_WIDTH = 1200;
var MIN_X = 0;
var MAX_X = MAP_WIDTH - PIN_WIDTH / 2;
var MIN_Y = 130;
var MAX_Y = 630;
var map = document.querySelector(".map");
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

map.classList.remove("map--faded");

var getRandomAvatar = function (array) {
  for (var i = 1; i <= array.length; i++) {
    var imageSrc = 'img/avatars/user' + (i < 10 ? '0' + i : i) + '.png';
  }
  return imageSrc;
};

var getRandomElement = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue)) + minValue;
};

var getRandomArrayElement = function (types) {
  return types[getRandomElement(0, types.length)];
};

var addAds = function () {
  var ads = {
    author: {
      avatar: getRandomAvatar(TOTAL_PINS)
    },
    offer: {
      type: getRandomArrayElement(HOUSE_TYPES)
    },
    location: {
      x: getRandomElement(MIN_X, MAX_X + 1),
      y: getRandomElement(MIN_Y, MAX_Y + 1)
    }
  };
  return ads;
};

var renderPin = function (adsd) {
  var pinElement = pinTemplate.cloneNode(true);
  // var titleAds = document.querySelector('#title');

  pinElement.style = 'left: ' + (adsd.location.x - PIN_WIDTH / 2) + 'px; top: ' + (adsd.location.y - PIN_HEIGHT);
  pinElement.querySelector('img').src = adsd.author.avatar;
  // pinElement.querySelector('img').alt = titleAds.placeholder;

  return pinElement;
};

var showAds = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < TOTAL_PINS; i++) {
    fragment.appendChild(renderPin(addAds[i]));
  }

  pinTemplate.appendChild(fragment);
};

showAds();
/*
<template id="pin">
  <button type="button" class="map__pin" style="left: 200px; top: 400px;">
    <img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления">
  </button>
</template>
*/
