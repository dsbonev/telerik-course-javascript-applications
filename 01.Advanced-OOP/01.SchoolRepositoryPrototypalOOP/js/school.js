/* global define */

define(['lib/oop'], function (OOP) {
  'use strict';

  return OOP.Object.create({}, {
    initialize: function (name, town, classList) {
      this.name = name;
      this.town = town;
      this.classList = classList;
      return this;
    }
  });
});
