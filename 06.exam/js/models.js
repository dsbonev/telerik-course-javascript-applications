/* globals mixin*/

var models = (function () {
  'use strict';

  function Unit(position, attack, armor, hitPoints, range, speed) {
    this.position = position;
    this.attack = attack;
    this.armor = armor;
    this.hitPoints = hitPoints;
    this.range = range;
    this.speed = speed;
  }

  function Ranger(position) {
    Unit.apply(this, [position, 8, 3, 15, 1, 2]);
  }

  mixin(Ranger.prototype, {
    toDOM: function () {
      var el = $('<div class="unit ranger">');

      return el;
    }
  });

  function Warrior(position) {
    Unit.apply(this, [position, 8, 1, 10, 3, 1]);
  }

  mixin(Warrior.prototype, {
    toDOM: function () {
      var el = $('<div class="unit warrior">');

      return el;
    }
  });

  function Player() {

  }

  function Field(player1, player2) {
    this.horizontalCellCount = 9;
    this.verticalCellCount = 9;
    this.player1 = player1;
    this.player2 = player2;
  }

  mixin(Field.prototype, {
    toDOM: function () {
      var el = $('<table id=game_field>');

      for (var i = 0; i < this.verticalCellCount; i += 1) {
        var rowEl = $('<tr>');

        for (var j = 0; j < this.horizontalCellCount; j += 1) {
          $('<td class=cell>').appendTo(rowEl);
        }

        rowEl.appendTo(el);
      }

      //player1
      var rangerRowPositions = [1, 3, 5, 7];
      rangerRowPositions.forEach(function (rowPos) {
        el.find('tr:nth-of-type(' + (rowPos + 1) + ')')
          .children()
          .first()
            .append(new Ranger({x: 0, y: rowPos}).toDOM().addClass('player1'));
      });

      var warriorRowPositions = [0, 2, 4, 6, 8];
      warriorRowPositions.forEach(function (rowPos) {
        el.find('tr:nth-of-type(' + (rowPos + 1) + ')')
          .children()
          .eq(1)
            .append(new Warrior({x: 1, y: rowPos}).toDOM().addClass('player1'));
      });

      //player2
      rangerRowPositions = [1, 3, 5, 7];
      rangerRowPositions.forEach(function (rowPos) {
        el.find('tr:nth-of-type(' + (rowPos + 1) + ')')
          .children()
          .last()
            .append(new Ranger({x: 8, y: rowPos}).toDOM().addClass('player2'));
      });

      warriorRowPositions = [0, 2, 4, 6, 8];
      warriorRowPositions.forEach(function (rowPos) {
        el.find('tr:nth-of-type(' + (rowPos + 1) + ')')
          .children()
          .eq(-2)
            .append(new Warrior({x: 7, y: rowPos}).toDOM().addClass('player2'));
      });

      var playerNamesEl = $('<tr>');
      playerNamesEl.append($('<th colspan=4>').text(this.player1));
      playerNamesEl.append($('<th colspan=4>').text(this.player2));
      playerNamesEl.prependTo(el);

      el.find('.unit').contextMenu('context-menu', {
        'attack': {
          click: function(element) {  // element is the jquery obj clicked on when context menu launched
            element.addClass('attack');
            setTimeout(function () {
              element.removeClass('attack');
            }, 1000);
          }
        },
        'move': {
          click: function(element) {
            //element.addClass('big-font');
          }
        },
        'defend': {
          click: function(element) {
            //element.addClass('big-font');
          }
        }
      }, { disable_native_context_menu: true, leftClick: true }
      );

      return el;
    }
  });

  return {
    Ranger: Ranger,
    Warrior: Warrior,
    Player: Player,
    Field: Field
  };
})();

/*

"red": {
   "nickname": "Doncho Minkov",
   "units": [{ "id": 109,
               "type": "warrior",
               "attack": 8,
               "armor": 3,
               "hitPoints": 15,
               "owner": "red",
               "mode": "attack",
               "position": { "x": 6, "y": 0 }
             }, { "id": 110,
               "type": "warrior",
               "attack": 8,
               "armor": 3,
               "hitPoints": 11,
               "owner": "red",
               "mode": "defend",
               "position": { "x": 5, "y": 2 }
             }, { "id": 114,
               "type": "ranger",
               "attack": 8,
               "armor": 1,
               "hitPoints": 4,
               "owner": "red",
               "mode": "attack",
               "position": { "x": 6, "y": 1 }
             }]
  },
  "blue": {
   "nickname": "Georgi Georgiev",
   "units": [{ "id": 119,
               "type": "warrior",
               "attack": 8,
               "armor": 3,
               "hitPoints": 15,
               "owner": "blue",
               "mode": "defend",
               "position": { "x": 2, "y": 0 }
             }, { "id": 121,
               "type": "ranger",
               "attack": 8,
               "armor": 1,
               "hitPoints": 10,
               "owner": "blue",
               "mode": "attack",
               "position": { "x": 2, "y": 1 }
             }]
  }

*/
