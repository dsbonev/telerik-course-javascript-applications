/* global describe, it, beforeEach, expect, snakeGame */

describe('Food', function () {
  'use strict';

  var food,
    position = {x: 9, y: 9},
    size = 3,
    createFood = function (position, size) {
      return new snakeGame.Food(position, size);
    };

  beforeEach(function() {
    food = createFood(position, size);
  });

  describe('init', function() {
    it('should set correct values', function() {
      expect(food.position).toEqual(position);
      expect(food.size).toBe(size);
    });
  });

  describe('changePosition', function() {
    it('should change the position', function () {
      var newPosition = {x: 3, y: 5};
      food.changePosition(newPosition);
      expect(food.position).toEqual(newPosition);
    });
  });

});
