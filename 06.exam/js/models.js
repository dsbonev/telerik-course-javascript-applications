/* globals mixin*/

var models = (function () {
  'use strict';

  function Ranger() {

  }

  function Warrior() {

  }

  function Player() {

  }

  function Field(players) {
    this.horizontalCellCount = 9;
    this.verticalCellCount = 9;
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
