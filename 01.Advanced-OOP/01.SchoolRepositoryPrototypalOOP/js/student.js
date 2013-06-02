/* globals define */

define(['person', 'lib/oop'], function (Person, OOP) {
  'use strict';

  return OOP.Object.create(Person, {
    initialize: function (firstName, lastName, age, grade) {
      Person.initialize.apply(this, arguments);
      this.grade = grade;
      return this;
    }
  });
});
