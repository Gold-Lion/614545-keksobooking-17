var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TOTAL_PINS = 8;
var PIN_WIDTH = 40;
var PIN_HEIGHT = 84;
var MAP_WIDTH = 1200;
var MIN_X = 0;
var MAX_X = MAP_WIDTH - PIN_WIDTH / 2;
var MIN_Y = 130;
var MAX_Y = 630;
var map = document.querySelector(".map");

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
