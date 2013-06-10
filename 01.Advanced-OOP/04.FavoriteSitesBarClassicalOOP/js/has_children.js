/* globals define */

define(['lib/oop'],
  function (OOP) {
    'use strict';

    return OOP.Object.create(
      Object.prototype,
      {
        itemListToElement: function () {
          var el = document.createElement('ul'),
            itemEl = document.createElement('li');

          this.items.forEach(function (item) {
            var itemElCloned = itemEl.cloneNode(true);
            itemElCloned.appendChild(item.toElement());
            el.appendChild(itemElCloned);
          });

          return el;
        },
        setItems: function (items) {
          this.items = items || [];
          return this;
        }
      }
    );
});
