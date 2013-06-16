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

    $('#component_wrapper').text('middle element');

    var el = document.createElement('div');
    el.textContent = 'div append';
    $('#component_wrapper').after(el);

    el = document.createElement('div');
    el.textContent = 'div prepend';
    $('#component_wrapper').before(el);
  }
);
