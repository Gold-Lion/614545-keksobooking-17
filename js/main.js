'use strict';

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
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

var disabledForm = function () {
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = true;
  }
  for (var j = 0; j < formFiltersSelect.length; j++) {
    formFiltersSelect[j].disabled = true;
  }
  formFiltersFieldset.disabled = true;
};

var enableForm = function () {
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = false;
  }
  for (var j = 0; j < formFiltersSelect.length; j++) {
    formFiltersSelect[j].disabled = false;
  }
  formFiltersFieldset.disabled = false;
};

disabledForm();

var addPinCoord = function () {
  var coordX = parseInt(mainPin.style.left, 10) + PIN_WIDTH_MAIN / 2;
  var coordY = parseInt(mainPin.style.top, 10) + PIN_HEIGHT_MAIN;
  var coordPin = Math.round(coordX) + ',' + Math.round(coordY);

  addressInput.value = coordPin;
};

addPinCoord();

var isRepeat = false;
mainPin.addEventListener('mouseup', function () {
  if (isRepeat) {
    return;
  }
  activateMap();
  showAds(getRandomAds(TOTAL_PINS));
  activateForm();
  enableForm();
  isRepeat = true;
});
