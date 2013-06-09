/* globals define */

define(['item', 'has_children', 'url', 'lib/oop'],
  function (Item, hasChildren, Url, OOP) {
  'use strict';

  return OOP.Class.create(
    function Folder(title) {
      Folder.prototype._superConstructor.apply(this, arguments);
      this._super = new this._superConstructor(title);
      this.items = [];
    },
    Item,
    OOP.mixin({
      toElement: function () {
        var el = document.createElement('div');
        el.classList.add('folder_wrapper');
        if (this.items.length === 0) {
          el.classList.add('empty');
        }
        el.appendChild(this._super.toElement());
        el.appendChild(this.itemListToElement());
        return el;
      }
    }, hasChildren)
  );
});
