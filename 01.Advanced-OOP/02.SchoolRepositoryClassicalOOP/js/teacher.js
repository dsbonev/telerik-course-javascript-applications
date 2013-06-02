/* globals define */

define(['person', 'lib/oop'], function (Person, OOP) {
  'use strict';

  return OOP.Class.create(
    function Teacher(firstName, lastName, age, speciality) {
      Person.apply(this, arguments);
      this.speciality = speciality;
      return this;
    },
    Person
  );
});
