/* global define */

define(['lib/oop'], function (OOP) {
  'use strict';

  return OOP.Class.create(
    function Class(name, capacity, studentList, formTeacher) {
      this.name = name;
      this.capacity = capacity;
      this.studentList = studentList;
      this.formTeacher = formTeacher;
      return this;
    },
    Object
  );
});
