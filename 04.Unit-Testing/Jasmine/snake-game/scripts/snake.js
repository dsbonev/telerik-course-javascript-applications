// var Class = require("../scripts/class.js");
var snakeGame = (function() {
  var directions = [{
      x: -1,
      y: 0
    }, {
      x: 0,
      y: -1
    }, {
      x: 1,
      y: 0
    }, {
      x: 0,
      y: 1
    }
  ];

  var snakeHeadPieceFillColor = "#222222";
  var snakePieceFillColor = "#cccccc";
  var snakePieceStrokeColor = "#222222";
  var defaultSnakePieceSize = 10;

  var foodFillColor = "#0000ff";
  var foodStrokeColor = "#00ff00";
  var defaultSnakeSize = 5;

  var obstacleFillColor = "#000000";
  var obstacleStrokeColor = "#000000";
  var defaultObstacleCount = 15;

  var GameObject = Class.create({
    init: function(position, size, fcolor, scolor) {
      if (position) {
        this.position = {
          x: position.x,
          y: position.y
        };
      }
      this.size = size;
      this.fcolor = fcolor;
      this.scolor = scolor;
    },
    draw: function(context) {
      var oldFillStyle = context.fillStyle;
      var oldStrokeStyle = context.strokeStyle;
      context.fillStyle = this.fcolor;
      context.strokeStyle = this.scolor;

      var centerX = this.position.x + this.size / 2;
      var centerY = this.position.y + this.size / 2;

      context.beginPath();
      context.arc(centerX, centerY, this.size / 2, 0, Math.PI * 2, false);
      context.fill();
      context.stroke();

      context.fillStyle = oldFillStyle;
      context.strokeStyle = oldStrokeStyle;
    },
    intersects: function(other) {
      if (!(other instanceof GameObject)) {
        return false;
      }

      var thisLeft = this.position.x;
      var thisRight = this.position.x + this.size;
      var thisTop = this.position.y;
      var thisBottom = this.position.y + this.size;

      var otherLeft = other.position.x;
      var otherRight = other.position.x + other.size;
      var otherTop = other.position.y;
      var otherBottom = other.position.y + other.size;

      if (this.position.x === other.position.x && this.position.y === other.position.y) {
        return true;
      }

      var otherInThisX = (thisLeft < otherLeft && otherLeft <= thisRight) || (thisLeft <= otherLeft && otherLeft < thisRight) || (thisLeft < otherRight && otherRight <= thisRight) || (thisLeft <= otherRight && otherRight < thisRight);
      var otherInThisY = (thisTop < otherTop && otherTop <= thisBottom) || (thisTop <= otherBottom && otherBottom < thisBottom) || (thisTop < otherTop && otherTop <= thisBottom) || (thisTop <= otherBottom && otherBottom < thisBottom);
      var thisInOtherX = (otherLeft < thisLeft && thisLeft <= otherRight) || (otherLeft <= thisRight && thisRight < otherRight) || (otherLeft < thisLeft && thisLeft <= otherRight) || (otherLeft <= thisRight && thisRight < otherRight);
      var thisInOtherY = (otherTop < thisTop && thisTop <= otherBottom) || (otherTop <= thisBottom && thisBottom < otherBottom) || (otherTop < thisTop && thisTop <= otherBottom) || (otherTop <= thisBottom && thisBottom < otherBottom);

      return (otherInThisX && otherInThisY) || (thisInOtherX && thisInOtherY);
    }
  });

  var Food = GameObject.extend({
    init: function(position, size) {
      this._super(position, size, foodFillColor, foodStrokeColor);
    },
    changePosition: function(newPosition) {
      this.position = {
        x: newPosition.x,
        y: newPosition.y
      };
    }
  });

  var Obstacle = GameObject.extend({
    init: function(position, size) {
      this._super(position, size, obstacleFillColor, obstacleStrokeColor)
    }
  });

  var MovingGameObject = GameObject.extend({
    init: function(position, size, fcolor, scolor, speed, direction) {
      this._super(position, size, fcolor, scolor);
      this.speed = speed;
      this.direction = direction;
    },
    move: function() {
      this.position.x += directions[this.direction].x * this.speed;
      this.position.y += directions[this.direction].y * this.speed;
    },
    changeDirection: function(newDirection) {
      if ((this.direction + newDirection) % 2 && newDirection < directions.length) {
        this.direction = newDirection;
      }
    }
  });

  var SnakePiece = MovingGameObject.extend({
    init: function(position, size, speed, direction) {
      this._super(position, size, snakePieceFillColor, snakePieceStrokeColor, speed, direction);
    }
  });

  var SnakeHeadPiece = SnakePiece.extend({
    init: function(position, size, speed, direction) {
      this._super(position, size, speed, direction);
      this.fcolor = snakeHeadPieceFillColor;
    }
  });

  var Snake = MovingGameObject.extend({
    init: function(position, speed, direction) {
      var piece;
      var piecePosition;
      this._super(position, defaultSnakeSize, "", "", speed, direction);
      this.head = new SnakeHeadPiece(position, defaultSnakePieceSize, speed, direction);
      this.pieces = [this.head];
      for (var i = 1; i < defaultSnakeSize; i += 1) {
        piecePosition = {
          x: position.x - (directions[direction].x * defaultSnakePieceSize) * i,
          y: position.y - (directions[direction].y * defaultSnakePieceSize) * i,
        }
        piece = new SnakePiece(piecePosition, defaultSnakePieceSize, speed, direction);
        this.pieces.push(piece);
      }
      this.eatenFoodCount = 0;
    },
    move: function() {
      for (var i = this.pieces.length - 1; i > 0; i -= 1) {
        this.pieces[i].move();
        this.pieces[i].changeDirection(this.pieces[i - 1].direction);
      }
      this.head.move();
      this.position = this.head.position;
    },
    changeDirection: function(newDirection) {
      this.head.changeDirection(newDirection);
      this.direction = this.head.direction;
      this.move();
    },
    grow: function() {
      var tail = this.pieces[this.pieces.length - 1];
      var position = {
        x: tail.position.x - (directions[tail.direction].x * defaultSnakePieceSize),
        y: tail.position.y - (directions[tail.direction].y * defaultSnakePieceSize),
      };
      var piece = new SnakePiece(position, defaultSnakePieceSize, this.speed, tail.direction);
      this.pieces.push(piece);
      this.size = this.pieces.length;
    },
    consume: function(obj) {
      if (obj instanceof Food) {
        this.grow();
        this.eatenFoodCount += 1;
        if (this.eatenFoodCount === 5) {
          this.speed *= 2;
          this.pieces.forEach(function (piece) {piece.speed = this.speed;}.bind(this));
        }
      } else if (obj instanceof Obstacle) {
        this.die();
      } else if (obj instanceof SnakePiece) {
        this.die();
      }
    },
    draw: function(context) {
      for (var i = 0; i < this.pieces.length; i += 1) {
        this.pieces[i].draw(context);
      }
    },
    addDieHandler: function(handler) {
      if (!this.dieHandlers) {
        this.dieHandlers = [];
      }
      this.dieHandlers.push(handler);
    },
    die: function() {
      var result = {
        score: this.size
      };
      if (this.dieHandlers) {
        var handler = this.dieHandlers.pop();
        while (handler) {
          handler(result);
          handler = this.dieHandlers.pop();
        }
      }
    }
  });

  var SnakeGame = Class.create({
    init: function(context, maxX, maxY) {
      this.drawingContext = context;
      this.maxX = maxX;
      this.maxY = maxY;

      this.initGameObjects();

      this.attachHandlers();
    },
    initGameObjects: function() {
      this.gameObjects = [];

      this.snake = new Snake({
        x: (this.maxX / 2) | 0,
        y: (this.maxY / 2) | 0,
      }, defaultSnakePieceSize, 0);

      this.snake.addDieHandler(function(result) {
        console.log("Result is: " + result.score);
        clearInterval(this.snakeTimer);
      }.bind(this));

      this.food = new Food({
        x: this.maxX / 2,
        y: this.maxY / 2 + 5 * defaultSnakePieceSize
      }, 10);

      for (var i = 0; i < defaultObstacleCount; i += 1) {
        var position = {
          x: (Math.random() * this.maxX) | 0,
          y: (Math.random() * this.maxY) | 0
        };
        var obstacle = new Obstacle(position, 10);
        this.gameObjects.push(obstacle);
      }

      this.gameObjects.push(this.food);
      this.gameObjects.push(this.snake);
    },
    attachHandlers: function() {
      var self = this;
      document.body.addEventListener("keydown", function(e) {
        if (!e) {
          e = window.event;
        }
        var direction = e.keyCode - 37;
        if (0 <= direction && direction <= 3) {
          self.snake.changeDirection(direction);
        }
      });
    },
    redraw: function() {
      for (var i = 0; i < this.gameObjects.length; i += 1) {
        this.gameObjects[i].draw(this.drawingContext);
      }
    },
    isObjectOutOfContext: function (object) {
      return object.position.x < 0 ||
        object.position.x + object.size > this.maxX ||
        object.position.y < 0 ||
        object.position.y + object.size > this.maxY;
    },
    repositionOverflowingObject: function(object) {
      object.position.x += this.maxX;
      object.position.x %= this.maxX;

      object.position.y += this.maxY;
      object.position.y %= this.maxY;
    },
    checkCollisions: function() {
      var i;
      for (i = 0; i < this.snake.size; i += 1) {
        var piece = this.snake.pieces[i];
        if (this.isObjectOutOfContext(piece)) {
          this.repositionOverflowingObject(piece);
        }
      }

      var intersectableObjects = [];

      for (i = 0; i < this.gameObjects.length; i += 1) {
        if (this.gameObjects[i] instanceof Snake) continue;

        intersectableObjects.push(this.gameObjects[i]);
      }

      for (var j = 4; j < this.snake.size; j += 1) {
        intersectableObjects.push(this.snake.pieces[i]);
      }

      for (i = 0; i < intersectableObjects.length; i += 1) {
        var object = intersectableObjects[i];

        if (!this.snake.intersects(object)) continue;

        this.snake.consume(object);

        if (object instanceof Food) {
          object.changePosition({
            x: (Math.random() * this.maxX) | 0,
            y: (Math.random() * this.maxY) | 0
          });
        }
      }
    },
    start: function() {
      var self = this;
      if (this.snakeTimer) {
        this.initGameObjects();
        clearInterval(this.snakeTimer);
      }
      this.snakeTimer = setInterval(function() {
        self.drawingContext.clearRect(0, 0, self.drawingContext.canvas.width, self.drawingContext.canvas.height)
        self.snake.move();
        self.checkCollisions();
        self.redraw();
      }, 50);
      console.log("Start Timer: " + self.snakeTimer);
    }
  });

  return {
    Direction: {
      LEFT: 0,
      UP: 1,
      RIGHT: 2,
      DOWN: 3
    },
    GameObject: GameObject,
    Food: Food,
    Obstacle: Obstacle,
    MovingGameObject: MovingGameObject,
    SnakePiece: SnakePiece,
    SnakeHeadPiece: SnakeHeadPiece,
    Snake: Snake,
    SnakeEngine: SnakeGame
  };
}());
