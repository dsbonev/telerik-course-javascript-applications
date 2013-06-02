/* globals define */

define(['lib/oop'], function (OOP) {
  'use strict';

  return OOP.Object.create({}, {
    initialize: function (firstName, lastName, age) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
      return this;
    },
    introduce: function () {
      var newObject = OOP.mixin({
        name: [this.firstName, this.lastName].join(' ')
      }, this);

      return JSON.stringify(newObject, function (key, value) {
        var skipKeyValuePair = undefined;

        if (['firstName', 'lastName'].indexOf(key) >= 0) {
          return skipKeyValuePair;
        } else {
          return value;
        }
      });
    }
  });
});
