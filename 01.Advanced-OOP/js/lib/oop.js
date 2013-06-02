/* globals define */

define(function () {
  'use strict';

  function mixin(targetObject /* sourceObject1, sourceObject2, ... */) {
    for (var i = 1, length = arguments.length; i < length; i += 1) {
      var sourceObject = arguments[i];

      for (var property in sourceObject) {
        if (sourceObject.hasOwnProperty(property)) {
          targetObject[property] = sourceObject[property];
        }
      }
    }

    return targetObject;
  }

  function createClass(constructor, parentConstructor, prototypeProperties, constructorProperties) {
    constructor.prototype = createObject(parentConstructor.prototype, prototypeProperties);
    constructor.prototype.constructor = constructor;
    mixin(constructor, constructorProperties || {});
    return constructor;
  }

  function createObject(prototype, properties) {
    properties = properties || {};
    var newObject = window.Object.create(prototype);
    return mixin(newObject, properties);
  }

  return {
    Class: {
      create: createClass
    },
    Object: {
      create: createObject
    },
    mixin: mixin
  };
});
