/* globals requirejs */

requirejs.config({
  paths: {
    lib: '../../js/lib'
  }
});

requirejs(
  ['image_slider', 'image', 'lib/oop', 'lib/array_of'],
  function (ImageSlider, Image, OOP, arrayOf) {
    'use strict';

    var imageList = arrayOf(10, function (index) {
      var oneBasedIndex = index + 1;
      
      return OOP.Object.create(Image).initialize(
        'Image ' + oneBasedIndex,
        'http://lorempixel.com/640/480/technics/' + oneBasedIndex + '/',
        'http://lorempixel.com/400/200/technics/' + oneBasedIndex + '/');
    });
    
    OOP.Object.create(ImageSlider).initialize(
      document.querySelector('#slider'),
      imageList);
  }
);
