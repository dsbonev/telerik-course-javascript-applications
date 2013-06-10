/* globals define */

define(['base', 'lib/oop'], function (Base, OOP) {
  'use strict';

  return OOP.Class.create(
    function Item(title) {
      Item.prototype._superConstructor.apply(this, arguments);
      this._super = new this._superConstructor(title);
      this.title = title;
    },
    Base,
    {
      toElement: function () {
        var el = this._super.toElement('a', this.constructor);
        el.title = this.title;
        el.textContent = this.title;
        el.href = '#';
        return el;
      }
    }
  );
});
