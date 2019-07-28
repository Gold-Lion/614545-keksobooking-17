'use strict';

(function () {
  var HouseTypesPrices = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };
  var minPriceMap = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };
  var PIN_WIDTH_MAIN = 65;
  var PIN_HEIGHT_MAIN = 87;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var priceInput = adForm.querySelector('#price');
  var typeInput = adForm.querySelector('#type');
  var timeInInput = adForm.querySelector('#timein');
  var timeOutInput = adForm.querySelector('#timeout');

  window.setPinCoord = function (left, top) {
    var coordX = parseInt(left, 10) + PIN_WIDTH_MAIN / 2;
    var coordY = parseInt(top, 10) + PIN_HEIGHT_MAIN;
    var coordPin = Math.round(coordX) + ', ' + Math.round(coordY);

    addressInput.value = coordPin;
  };

  window.setPinCoord(mainPin.style.left, mainPin.style.top);

  var compareTypeAndPrice = function (typeHouse) {
    priceInput.min = HouseTypesPrices[typeHouse];
    priceInput.placeholder = HouseTypesPrices[typeHouse];
  };

  typeInput.addEventListener('input', function (evt) {
    compareTypeAndPrice(evt.target.value.toUpperCase());
  });

  typeInput.addEventListener('change', function (evt) {
    var min = minPriceMap[value];

    var value = evt.target.value;
    if (value === 'palace') {
      priceInput.min = min[value];
    } else if (value === 'flat') {
      priceInput.min = min[value];
    } else if (value === 'house') {
      priceInput.min = min[value];
    } else if (value === 'bungalo') {
      priceInput.min = min[value];
    }
  });

  var setInOutTime = function (time) {
    timeInInput.value = time;
    timeOutInput.value = time;
  };

  timeInInput.addEventListener('input', function (evt) {
    setInOutTime(evt.target.value);
  });

  timeOutInput.addEventListener('input', function (evt) {
    setInOutTime(evt.target.value);
  });

  var successHandler = function () {
    window.result.showSuccess();
  };

  var errorHandler = function () {
    window.result.showError();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.server.upload(new FormData(adForm), successHandler, errorHandler);
  });
})();
