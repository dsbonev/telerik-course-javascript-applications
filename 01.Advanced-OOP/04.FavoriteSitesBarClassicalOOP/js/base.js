/* globals define */

define(['lib/oop'], function (OOP) {
  'use strict';

  return OOP.Class.create(
    function Base() {
      this._el = null;
    },
    Object,
    {
      toElement: function (tagName, constructor) {
        var el = document.createElement(tagName);
        el.classList.add(constructor.name.toLowerCase());
        return el;
      }
    }
  );
});
