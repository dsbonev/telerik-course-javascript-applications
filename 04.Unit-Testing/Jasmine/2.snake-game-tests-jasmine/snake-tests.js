/* global jasmine, describe, it, beforeEach, expect, snakeGame */

describe('Snake', function () {
  'use strict';

  var snake;
  var position = {
    x: 150,
    y: 150
  };
  var speed = 15;
  var direction = 0;

  beforeEach(function() {
    snake = new snakeGame.Snake(position, speed, direction);
  });

  describe('init', function() {
    it('Should set correct values', function() {
      expect(snake.position.x).toEqual(position.x);
      expect(snake.speed).toBe(speed);
      expect(snake.direction).toBe(direction);
    });

    it('Should contain 5 SnakePieces', function() {
      expect(snake.pieces).toBeTruthy();
      expect(snake.pieces.length).toBe(5);
      expect(snake.head).toBeTruthy();
    });
  });

  describe('consume', function() {
    it('When object is food, should grow', function() {
      var snakeSize = snake.size;
      snake.consume(new snakeGame.Food());
      expect(snake.size).toBe(snakeSize + 1);
    });

    it('When object is Obstacle, should die', function() {
      var isDead = false;
      snake.addDieHandler(function() {
        isDead = true;
      });

      snake.consume(new snakeGame.Obstacle());
      expect(isDead).toBeTruthy();
    });

    it('When object is SnakePiece, should die', function() {
      var isDead = false;
      snake.addDieHandler(function() {
        isDead = true;
      });

      snake.consume(new snakeGame.SnakePiece());
      expect(isDead).toBeTruthy();
    });
  });

  describe('changeDirection', function() {

    describe('when direction is Left', function() {
      beforeEach(function() {
        snake = new snakeGame.Snake(position, speed, 0);
      });

      it('new direction is Left, should set direction to Left', function() {
        snake.changeDirection(0);
        expect(snake.direction).toBe(0);
      });
      it('new direction is Up, should set direction to Up', function() {
        snake.changeDirection(1);
        expect(snake.direction).toBe(1);
      });
      it('new direction is Right, should set direction to Left', function() {
        snake.changeDirection(2);
        expect(snake.direction).toBe(0);
      });
      it('new direction is Down, should set direction to Down', function() {
        snake.changeDirection(3);
        expect(snake.direction).toBe(3);
      });
    });

    describe('when direction is Up', function() {
      beforeEach(function() {
        snake = new snakeGame.Snake(position, speed, 1);
      });

      it('new direction is Left, should set direction to Left', function() {
        snake.changeDirection(0);
        expect(snake.direction).toBe(0);
      });
      it('new direction is Up, should set direction to Up', function() {
        snake.changeDirection(1);
        expect(snake.direction).toBe(1);
      });
      it('new direction is Right, should set direction to Right', function() {
        snake.changeDirection(2);
        expect(snake.direction).toBe(2);
      });
      it('new direction is Down, should set direction to Up', function() {
        snake.changeDirection(3);
        expect(snake.direction).toBe(1);
      });
    });

    describe('when direction is Right', function() {
      beforeEach(function() {
        snake = new snakeGame.Snake(position, speed, 2);
      });

      it('new direction is Left, should set direction to Right', function() {
        snake.changeDirection(0);
        expect(snake.direction).toBe(2);
      });
      it('new direction is Up, should set direction to Up', function() {
        snake.changeDirection(1);
        expect(snake.direction).toBe(1);
      });
      it('new direction is Right, should set direction to Right', function() {
        snake.changeDirection(2);
        expect(snake.direction).toBe(2);
      });
      it('new direction is Down, should set direction to Down', function() {
        snake.changeDirection(3);
        expect(snake.direction).toBe(3);
      });
    });

    describe('when direction is Down', function() {
      beforeEach(function() {
        snake = new snakeGame.Snake(position, speed, 3);
      });

      it('new direction is Left, should set direction to Left', function() {
        snake.changeDirection(0);
        expect(snake.direction).toBe(0);
      });
      it('new direction is Up, should set direction to Down', function() {
        snake.changeDirection(1);
        expect(snake.direction).toBe(3);
      });
      it('new direction is Right, should set direction to Right', function() {
        snake.changeDirection(2);
        expect(snake.direction).toBe(2);
      });
      it('new direction is Down, should set direction to Down', function() {
        snake.changeDirection(3);
        expect(snake.direction).toBe(3);
      });
    });
  });

  describe('move', function() {
    it('should decrease x when direction is Left', function() {
      snake = new snakeGame.Snake(position, speed, snakeGame.Direction.LEFT);
      snake.move();
      expect(snake.position.x).toBe(position.x - speed);
      expect(snake.position.y).toBe(position.y);
    });

    it('should decrease y when direction is Up', function() {
      snake = new snakeGame.Snake(position, speed, snakeGame.Direction.UP);
      snake.move();
      expect(snake.position.x).toBe(position.x);
      expect(snake.position.y).toBe(position.y - speed);
    });

    it('should increase x when direction is Right', function() {
      snake = new snakeGame.Snake(position, speed, snakeGame.Direction.RIGHT);
      snake.move();
      expect(snake.position.x).toBe(position.x + speed);
      expect(snake.position.y).toBe(position.y);
    });

    it('should increase y when direction is Down', function() {
      snake = new snakeGame.Snake(position, speed, snakeGame.Direction.DOWN);
      snake.move();
      expect(snake.position.x).toBe(position.x);
      expect(snake.position.y).toBe(position.y + speed);
    });
  });

  describe('grow', function () {
    it('should increase the size', function () {
      var snakeSize = snake.size;
      snake.grow();
      expect(snake.size).toBe(snakeSize + 1);
    });
  });

  describe('draw', function () {
    var context = {
      canvas: {
        width: 300,
        height: 150
      }
    };
    var interactedWithContext = false;

    ['save', 'restore', 'scale', 'rotate', 'translate', 'transform', 'setTransform',
    'createLinearGradient', 'createRadialGradient', 'getLineDash', 'clearRect', 'fillRect',
    'beginPath', 'closePath', 'moveTo', 'lineTo', 'quadraticCurveTo', 'bezierCurveTo',
    'arcTo', 'rect', 'arc', 'fill', 'stroke', 'clip', 'isPointInPath', 'isPointInStroke',
    'measureText', 'setAlpha', 'setCompositeOperation', 'setLineWidth', 'setLineCap', 'setLineJoin',
    'setMiterLimit', 'clearShadow', 'fillText', 'strokeText', 'setStrokeColor', 'setFillColor',
    'strokeRect', 'drawImage', 'drawImageFromRect', 'setShadow', 'putImageData',
    'webkitPutImageDataHD', 'createPattern', 'createImageData', 'getImageData',
    'webkitGetImageDataHD', 'setLineDash', 'constructor'].forEach(function (methodName) {
      context[methodName] = function () {
        interactedWithContext = true;
      };
    });

    it('should interact with canvas context', function () {
      snake.draw(context);
      expect(interactedWithContext).toBeTruthy();
    });
  });

  describe('addDieHandler', function () {
    it('should attach handler', function () {
      var handlerAttached = false;

      snake.addDieHandler(function () {
        handlerAttached = true;
      });

      snake.die();
      expect(handlerAttached).toBeTruthy();
    });
  });

  describe('die', function () {
    it('should call handlers with result object', function () {
      var passedResult = null;

      snake.addDieHandler(function (result) {
        passedResult = result;
      });

      snake.die();
      expect(passedResult).toEqual(jasmine.any(Object));
    });
  });
});
