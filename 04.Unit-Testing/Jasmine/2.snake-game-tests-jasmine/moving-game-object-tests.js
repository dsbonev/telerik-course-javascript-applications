/* global describe, it, beforeEach, expect, snakeGame */

describe('MovingGameObject', function () {
  'use strict';

  var movingGameObject,
    position = {x: 9, y: 9},
    size = 3,
    fcolor = '#123456',
    scolor = '#234567',
    speed = 5,
    direction = snakeGame.Direction.RIGHT,
    createMovingGameObject = function (direction) {
      return new snakeGame.MovingGameObject(
        position, size, fcolor, scolor, speed, direction);
    };

  describe('init', function() {
    beforeEach(function() {
      movingGameObject = createMovingGameObject(direction);
    });

    it('should set correct values', function() {
      expect(movingGameObject.position).toEqual(position);
      expect(movingGameObject.size).toBe(size);
      expect(movingGameObject.fcolor).toBe(fcolor);
      expect(movingGameObject.scolor).toBe(scolor);
      expect(movingGameObject.speed).toBe(speed);
      expect(movingGameObject.direction).toBe(direction);
    });
  });

  describe('changeDirection', function() {

    describe('when direction is Left', function() {
      beforeEach(function() {
        movingGameObject = createMovingGameObject(snakeGame.Direction.LEFT);
      });

      it('new direction is Left, should set direction to Left', function() {
        movingGameObject.changeDirection(snakeGame.Direction.LEFT);
        expect(movingGameObject.direction).toBe(snakeGame.Direction.LEFT);
      });

      it('new direction is Up, should set direction to Up', function() {
        movingGameObject.changeDirection(1);
        expect(movingGameObject.direction).toBe(1);
      });

      it('new direction is Right, should keep direction unchanged', function() {
        movingGameObject.changeDirection(2);
        expect(movingGameObject.direction).toBe(0);
      });

      it('new direction is Down, should set direction to Down', function() {
        movingGameObject.changeDirection(3);
        expect(movingGameObject.direction).toBe(3);
      });
    });

    describe('when direction is Up', function() {
      beforeEach(function() {
        movingGameObject = createMovingGameObject(snakeGame.Direction.UP);
      });

      it('new direction is Left, should set direction to Left', function() {
        movingGameObject.changeDirection(0);
        expect(movingGameObject.direction).toBe(0);
      });

      it('new direction is Up, should set direction to Up', function() {
        movingGameObject.changeDirection(1);
        expect(movingGameObject.direction).toBe(1);
      });

      it('new direction is Right, should set direction to Right', function() {
        movingGameObject.changeDirection(2);
        expect(movingGameObject.direction).toBe(2);
      });

      it('new direction is Down, should keep direction unchanged', function() {
        movingGameObject.changeDirection(3);
        expect(movingGameObject.direction).toBe(1);
      });
    });

    describe('when direction is Right', function() {
      beforeEach(function() {
        movingGameObject = createMovingGameObject(snakeGame.Direction.RIGHT);
      });

      it('new direction is Left, should keep direction unchanged', function() {
        movingGameObject.changeDirection(0);
        expect(movingGameObject.direction).toBe(2);
      });

      it('new direction is Up, should set direction to Up', function() {
        movingGameObject.changeDirection(1);
        expect(movingGameObject.direction).toBe(1);
      });

      it('new direction is Right, should set direction to Right', function() {
        movingGameObject.changeDirection(2);
        expect(movingGameObject.direction).toBe(2);
      });

      it('new direction is Down, should set direction to Down', function() {
        movingGameObject.changeDirection(3);
        expect(movingGameObject.direction).toBe(3);
      });
    });

    describe('when direction is Down', function() {
      beforeEach(function() {
        movingGameObject = createMovingGameObject(snakeGame.Direction.DOWN);
      });

      it('new direction is Left, should set direction to Left', function() {
        movingGameObject.changeDirection(0);
        expect(movingGameObject.direction).toBe(0);
      });

      it('new direction is Up, should keep direction unchanged', function() {
        movingGameObject.changeDirection(1);
        expect(movingGameObject.direction).toBe(3);
      });

      it('new direction is Right, should set direction to Right', function() {
        movingGameObject.changeDirection(2);
        expect(movingGameObject.direction).toBe(2);
      });

      it('new direction is Down, should set direction to Down', function() {
        movingGameObject.changeDirection(3);
        expect(movingGameObject.direction).toBe(3);
      });
    });
  });

  describe('move', function() {
    it('should decrease x when direction is Left', function() {
      movingGameObject = createMovingGameObject(snakeGame.Direction.LEFT);
      movingGameObject.move();
      expect(movingGameObject.position.x).toBe(position.x - speed);
      expect(movingGameObject.position.y).toBe(position.y);
    });

    it('should decrease y when direction is Up', function() {
      movingGameObject = createMovingGameObject(snakeGame.Direction.UP);
      movingGameObject.move();
      expect(movingGameObject.position.x).toBe(position.x);
      expect(movingGameObject.position.y).toBe(position.y - speed);
    });

    it('should increase x when direction is Right', function() {
      movingGameObject = createMovingGameObject(snakeGame.Direction.RIGHT);
      movingGameObject.move();
      expect(movingGameObject.position.x).toBe(position.x + speed);
      expect(movingGameObject.position.y).toBe(position.y);
    });

    it('should increase y when direction is Down', function() {
      movingGameObject = createMovingGameObject(snakeGame.Direction.DOWN);
      movingGameObject.move();
      expect(movingGameObject.position.x).toBe(position.x);
      expect(movingGameObject.position.y).toBe(position.y + speed);
    });
  });
});
