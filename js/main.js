'use strict';

var HOUSE_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var HouseTypesPrices = {
  PALACE: 10000,
  FLAT: 1000,
  HOUSE: 5000,
  BUNGALO: 0
};
var TOTAL_PINS = 8;
var PIN_WIDTH = 64;
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

var disableForm = function (elements, bool) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].disabled = bool;
  }
};

var disableElements = function (elements, bool) {
  elements.disabled = bool;
};

disableForm(formFieldset, isDisabled);
disableForm(formFiltersSelect, isDisabled);
disableElements(formFiltersFieldset, isDisabled);

var addPinCoord = function (left, top) {
  var coordX = parseInt(left, 10) + PIN_WIDTH / 2;
  var coordY = parseInt(top, 10) + PIN_HEIGHT_MAIN;
  var coordPin = Math.round(coordX) + ',' + Math.round(coordY);

  addressInput.value = coordPin;
};

addPinCoord(mainPin.style.left, mainPin.style.top);

var isRepeat = false;
mainPin.addEventListener('mousedown', function (evt) {
  evt.preventDefault();

  var startPinCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMainPinMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startPinCoords.x - moveEvt.clientX,
      y: startPinCoords.y - moveEvt.clientY
    };

    startPinCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    var coordX = mainPin.offsetLeft - shift.x;
    var coordY = mainPin.offsetTop - shift.y;

    if (coordX > MAX_X) {
      coordX = MAX_X;
    } else if (coordX < MIN_X) {
      coordX = MIN_X;
    }

    if (coordY > MAX_Y) {
      coordY = MAX_Y;
    } else if (coordY < MIN_Y) {
      coordY = MIN_Y;
    }

    mainPin.style.left = coordX + 'px';
    mainPin.style.top = coordY + 'px';
    addPinCoord(coordX, coordY);
  };

  var onMainPinMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMainPinMouseMove);
    document.removeEventListener('mouseup', onMainPinMouseUp);

    if (isRepeat) {
      return;
    }
    activateMap();
    showAds(getRandomAds(TOTAL_PINS));
    activateForm();
    disableForm(formFieldset, isDisabled);
    disableForm(formFiltersSelect, isDisabled);
    disableElements(formFiltersFieldset, isDisabled);
    isRepeat = true;
  };

  isDisabled = false;

  document.addEventListener('mousemove', onMainPinMouseMove);
  document.addEventListener('mouseup', onMainPinMouseUp);
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
