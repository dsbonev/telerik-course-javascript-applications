/* global define */

define(['lib/oop'], function (OOP) {
  'use strict';

  var storageKey = 'school_repository';

  return OOP.Object.create({}, {
    add: function (school) {
      var schoolList = this.get();
      schoolList.push(school);
      this.set(schoolList);
    },
    remove: function (school) {
      var schoolList = this.get(),
        removed = schoolList.some(function (item, index, array) {
          if (item.name === school.name) {
            array.splice(index, 1);
            var stopIteration = true;
            return stopIteration;
          }
        });

      if (removed) {
        this.set(schoolList);
      }

      return this;
    },
    get: function () {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    },
    set: function (schoolList) {
      schoolList = schoolList || [];
      localStorage.setItem(storageKey, JSON.stringify(schoolList));
      return this;
    }
  });
});
