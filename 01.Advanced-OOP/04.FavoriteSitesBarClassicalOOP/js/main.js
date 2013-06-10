/* globals requirejs */

requirejs.config({
  paths: {
    lib: '../../js/lib'
  }
});

requirejs(
  ['bar', 'folder', 'url', 'lib/oop', 'lib/array_of'],
  function (Bar, Folder, Url, OOP, arrayOf) {
    'use strict';

    document.querySelector('#component_wrapper').
      appendChild(new Bar().setItems([
        new Url('Телерик Академия', 'http://telerikacademy.com/'),
        new Folder('JavaScript').setItems([
          new Folder('Empty'),
          new Url('ECMAScript® Language Specification', 'http://www.ecma-international.org/ecma-262/5.1/'),
          new Folder('Libraries').setItems([
            new Url('jQuery', 'http://jquery.com'),
            new Url('Lodash', 'http://lodash.com'),
          ]),
          new Url('MDN', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript')
        ]),
        new Url('Дончо Минков', 'http://minkov.it/'),
        new Folder('Empty')
      ]).toElement());
  }
);
