/* globals define */

define(['item', 'lib/oop'], function (Item, OOP) {
  'use strict';

  return OOP.Class.create(
    function Url(title, url) {
      Url.prototype._superConstructor.apply(this, arguments);
      this._super = new this._superConstructor(title);
      this.url = url;
    },
    Item,
    {
      toElement: function () {
        var el = this._super.toElement();
        el.href = this.url;
        el.target = '_blank';
        return el;
      }
    }
  );
});
