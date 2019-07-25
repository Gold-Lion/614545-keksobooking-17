'use strict';

(function () {
  var HouseTypesPrices = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };
  var PIN_WIDTH = 64;
  var PIN_HEIGHT_MAIN = 82;
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
    var coordX = parseInt(left, 10) + PIN_WIDTH / 2;
    var coordY = parseInt(top, 10) + PIN_HEIGHT_MAIN;
    var coordPin = Math.round(coordX) + ',' + Math.round(coordY);

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
    var value = evt.target.value;
    if (value === 'palace') {
      priceInput.setAttribute('min', 10000);
    } else if (value === 'flat') {
      priceInput.setAttribute('min', 1000);
    } else if (value === 'house') {
      priceInput.setAttribute('min', 5000);
    } else if (value === 'bungalo') {
      priceInput.setAttribute('min', 0);
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
})();
