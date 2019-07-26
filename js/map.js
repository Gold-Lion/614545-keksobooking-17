'use strict';

(function () {
  var TOTAL_PINS = 8;
  var PIN_WIDTH = 64;
  var MAP_WIDTH = 1200;
  var MIN_X = 0;
  var MAX_X = MAP_WIDTH - PIN_WIDTH;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mainPin = mapPins.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var formFieldset = adForm.querySelectorAll('fieldset');
  var formFilters = document.querySelector('.map__filters');
  var formFiltersSelect = formFilters.querySelectorAll('select');
  var formFiltersFieldset = formFilters.querySelector('fieldset');
  var isDisabled = true;

  var activateMap = function () {
    map.classList.remove('map--faded');
  };

  var activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
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
  isDisabled = false;

  var activatePage = function () {
    activateMap();
    window.showAds(window.getRandomAds(TOTAL_PINS));
    activateForm();
    disableForm(formFieldset, isDisabled);
    disableForm(formFiltersSelect, isDisabled);
    disableElements(formFiltersFieldset, isDisabled);
  };

  var getCoord = function (offset, shift, min, max) {

    var coord = offset - shift;

    if (coord >= max) {
      coord = max;
    } else if (coord <= min) {
      coord = min;
    }

    return coord;
  };

  var getMainPinMouseMove = function (startPinCoords) {
    return function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startPinCoords.x - moveEvt.clientX,
        y: startPinCoords.y - moveEvt.clientY
      };

      startPinCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var coordX = getCoord(mainPin.offsetLeft, shift.x, MIN_X, MAX_X);
      var coordY = getCoord(mainPin.offsetTop, shift.y, MIN_Y, MAX_Y);

      mainPin.style.left = coordX + 'px';
      mainPin.style.top = coordY + 'px';
      window.setPinCoord(coordX, coordY);
    };
  };

  var getMainPinMouseUp = function (mouseMove, mouseUp) {
    return function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseup', mouseUp);

      if (!isRepeat) {
        activatePage();
        isRepeat = true;
      }
    };
  };

  var isRepeat = false;
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startPinCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMainPinMouseMove = getMainPinMouseMove(startPinCoords);
    var onMainPinMouseUp = getMainPinMouseUp(onMainPinMouseMove, onMainPinMouseUp);

    document.addEventListener('mousemove', onMainPinMouseMove);
    document.addEventListener('mouseup', onMainPinMouseUp);
  });
})();
