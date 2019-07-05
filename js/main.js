'use strict';

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var HouseTypesPrices = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALO: 0
};
var TOTAL_PINS = 8;
var PIN_WIDTH = 50;
var PIN_WIDTH_MAIN = 65;
var PIN_HEIGHT_MAIN = 82;
var MAP_WIDTH = 1200;
var MIN_X = 0;
var MAX_X = MAP_WIDTH - PIN_WIDTH;
var MIN_Y = 130;
var MAX_Y = 630;
var map = document.querySelector('.map');
var mapPins = map.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mainPin = mapPins.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var formFieldset = adForm.querySelectorAll('fieldset');
var formFilters = document.querySelector('.map__filters');
var formFiltersSelect = formFilters.querySelectorAll('select');
var formFiltersFieldset = formFilters.querySelector('fieldset');
var addressInput = adForm.querySelector('#address');
var priceInput = adForm.querySelector('#price');
var typeInput = adForm.querySelector('#type');
var timeInInput = adForm.querySelector('#timein');
var timeOutInput = adForm.querySelector('#timeout');
var isDisabled = true;

var activateMap = function () {
  map.classList.remove('map--faded');
};

var activateForm = function () {
  adForm.classList.remove('ad-form--disabled');
};

var getAvatar = function (number) {
  if (number > TOTAL_PINS || number < 1) {
    number = TOTAL_PINS;
  }
  return 'img/avatars/user' + (number < 10 ? '0' + number : number) + '.png';
};

// Получаем случайные координаты для элементов
var getRandomElement = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// Получаем случайные элемент из массива с типом жилья
var getRandomArrayElement = function (types) {
  return types[getRandomElement(0, types.length - 1)];
};

// Получаем случайные объявления
var getRandomAd = function (number) {
  var ad = {
    author: {
      avatar: getAvatar(number)
    },
    offer: {
      type: getRandomArrayElement(HOUSE_TYPES)
    },
    location: {
      x: getRandomElement(MIN_X, MAX_X),
      y: getRandomElement(MIN_Y, MAX_Y)
    }
  };
  return ad;
};

var getRandomAds = function (count) {
  var ads = [];

  for (var i = 0; i < count; i++) {
    ads[i] = getRandomAd(i + 1);
  }
  return ads;
};

var showAds = function (ads) {
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

var disabledForm = function (elements, bool) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = bool;
  }
};

var disabledElements = function (elements, bool) {
  elements.disabled = bool;
};

disabledForm(formFieldset, isDisabled);
disabledForm(formFiltersSelect, isDisabled);
disabledElements(formFiltersFieldset, isDisabled);

var addPinCoord = function () {
  var coordX = parseInt(mainPin.style.left, 10) + PIN_WIDTH_MAIN / 2;
  var coordY = parseInt(mainPin.style.top, 10) + PIN_HEIGHT_MAIN;
  var coordPin = Math.round(coordX) + ',' + Math.round(coordY);

  addressInput.value = coordPin;
};

addPinCoord();

var isRepeat = false;
mainPin.addEventListener('mouseup', function () {
  isDisabled = false;

  if (isRepeat) {
    return;
  }
  activateMap();
  showAds(getRandomAds(TOTAL_PINS));
  activateForm();
  disabledForm(formFieldset, isDisabled);
  disabledForm(formFiltersSelect, isDisabled);
  disabledElements(formFiltersFieldset, isDisabled);
  isRepeat = true;
});

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
