/* globals define */

define(['person', 'lib/oop'], function (Person, OOP) {
  'use strict';

  return OOP.Object.create(Person, {
    initialize: function (firstName, lastName, age, speciality) {
      Person.initialize.apply(this, arguments);
      this.speciality = speciality;
      return this;
    }
  });
});
