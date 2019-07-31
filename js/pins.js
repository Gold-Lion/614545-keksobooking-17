'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT_MAIN = 70;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var titleAds = document.querySelector('#title');

  window.showAds = function () {
    window.server.load(function (ads) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < ads.length; i++) {
        var pinElement = pinTemplate.cloneNode(true);
        var ad = ads[i];

        pinElement.style.left = (ad.location.x - PIN_WIDTH / 2) + 'px';
        pinElement.style.top = (ad.location.y - PIN_HEIGHT_MAIN) + 'px';
        pinElement.querySelector('img').src = ad.author.avatar;
        pinElement.querySelector('img').alt = titleAds.placeholder;
        fragment.appendChild(pinElement);
      }
      mapPins.appendChild(fragment);
    });
  };
})();
