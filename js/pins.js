'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  window.showAds = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      var pinElement = pinTemplate.cloneNode(true);
      var titleAds = document.querySelector('#title');

      var ad = ads[i];

      pinElement.style = 'left: ' + (ad.location.x) + 'px; top: ' + (ad.location.y) + 'px;';
      pinElement.querySelector('img').src = ad.author.avatar;
      pinElement.querySelector('img').alt = titleAds.placeholder;
      fragment.appendChild(pinElement);
    }
    mapPins.appendChild(fragment);
  };
})();
