/* globals define */

define(['person', 'lib/oop'], function (Person, OOP) {
  'use strict';

  return OOP.Class.create(
    function Student(firstName, lastName, age, grade) {
      Person.apply(this, arguments);
      this.grade = grade;
      return this;
    },
    Person
  );
});
