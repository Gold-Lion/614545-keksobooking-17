'use strict';

(function () {
  window.util = {
    getRandomElement: function (minValue, maxValue) {
      return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    },
    getRandomArrayElement: function (types) {
      return types[window.util.getRandomElement(0, types.length - 1)];
    },
  };
})();
