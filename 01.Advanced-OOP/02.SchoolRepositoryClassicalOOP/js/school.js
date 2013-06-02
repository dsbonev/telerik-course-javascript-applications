/* global define */

define(['lib/oop'], function (OOP) {
  'use strict';

  return OOP.Class.create(
    function School(name, town, classList) {
      this.name = name;
      this.town = town;
      this.classList = classList;
      return this;
    },
    Object
  );
});
