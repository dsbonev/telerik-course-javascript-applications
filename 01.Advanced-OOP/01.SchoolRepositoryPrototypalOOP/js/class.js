/* global define */

define(['lib/oop'], function (OOP) {
  'use strict';

  return OOP.Object.create({}, {
    initialize: function (name, capacity, studentList, formTeacher) {
      this.name = name;
      this.capacity = capacity;
      this.studentList = studentList;
      this.formTeacher = formTeacher;
      return this;
    }
  });
});
