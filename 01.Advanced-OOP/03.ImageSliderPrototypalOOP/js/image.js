/* globals define */

define(['lib/oop'], function (OOP) {
  'use strict';

  return OOP.Object.create(Object.prototype, {
    initialize: function (title, url, thumbnailUrl) {
      this.title = title;
      this.url = url;
      this.thumbnailUrl = thumbnailUrl;
      return this;
    }
  });
});
