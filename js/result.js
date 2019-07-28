'use strict';

(function () {
  var main = document.querySelector('main');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var showSuccess = function () {
    var successPage = successTemplate.cloneNode(true);
    main.appendChild(successPage);
  };

  var showError = function () {
    var errorPage = errorTemplate.cloneNode(true);
    main.appendChild(errorPage);
  };

  window.result = {
    showSuccess: showSuccess,
    showError: showError
  };
})();
