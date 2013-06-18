/* globals requirejs */

requirejs.config({
  paths: {
    lib: '../../js/lib',
    jquery: [
      //'http://ajax.googleapis.com/ajax/libs/jquery/2.0.2/jquery.min',
      '../../js/lib/jquery.min'
    ]
  },
  packages: ['component/slider']
});

requirejs(
  ['component/slider', 'slide', 'jquery', 'lib/array_of'],
  function (Slider, Slide, $, arrayOf) {
    'use strict';

    var slides = arrayOf(6, function (index) {
      return new Slide(index);
    });

    $('#component_wrapper').append(new Slider(slides).toDom());
  }
);
