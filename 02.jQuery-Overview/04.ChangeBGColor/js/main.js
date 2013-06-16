/* globals requirejs */

requirejs.config({
  paths: {
    lib: '../../js/lib',
    jquery: [
      //'http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min',
      '../../js/lib/jquery.min'
    ]
  }
});

requirejs(
  ['jquery'],
  function ($) {
    'use strict';

    $('#component_wrapper').on('change', 'input[type=color]', function (event) {
      $('body').css('backgroundColor', event.target.value);
    });
  }
);
