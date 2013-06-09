/* globals define */

define(['base', 'has_children', 'folder', 'url', 'lib/oop'],
  function (Base, hasChildren, Folder, Url, OOP) {
    'use strict';

    return OOP.Class.create(
      function Bar() {
        Bar.prototype._superConstructor.apply(this, arguments);
        this._super = new this._superConstructor();
        this.items = [];
      },
      Base,
      OOP.mixin({
        toElement: function () {
          return this.itemListToElement();
        }
      },
      hasChildren)
    );
});
