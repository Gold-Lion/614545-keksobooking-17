'use strict';

(function () {
  var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var TOTAL_PINS = 8;
  var PIN_WIDTH = 65;
  var MAP_WIDTH = 1200;
  var MIN_X = 0;
  var MAX_X = MAP_WIDTH - PIN_WIDTH;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var getAvatar = function (number) {
    if (number > TOTAL_PINS || number < 1) {
      number = TOTAL_PINS;
    }
    return 'img/avatars/user' + (number < 10 ? '0' + number : number) + '.png';
  };

  var getRandomAd = function (number) {
    var ad = {
      author: {
        avatar: getAvatar(number)
      },
      offer: {
        type: window.util.getRandomArrayElement(HOUSE_TYPES)
      },
      location: {
        x: window.util.getRandomElement(MIN_X, MAX_X),
        y: window.util.getRandomElement(MIN_Y, MAX_Y)
      }
    };
    return ad;
  };

  window.getRandomAds = function (count) {
    var ads = [];

    for (var i = 0; i < count; i++) {
      ads[i] = getRandomAd(i + 1);
    }
    return ads;
  };
})();
