/* globals define */

define(function () {
  'use strict';

  return function arrayOf(itemCount, itemCallback) {
    var result = [];

    for (var i = 0; i < itemCount; i += 1) {
      result[i] = itemCallback(i);
    }

    return result;
  };
});
