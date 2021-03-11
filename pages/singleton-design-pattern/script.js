console.log('singleton-design-pattern works!!');

// Example 1.
// const cashRegister2 = require('./CashRegister');
// const cashRegister1 = require('./CashRegister');

import { CashResister as cashRegister1 } from './CashRegister.js'
import { CashResister as cashRegister2 } from './CashRegister.js'


cashRegister1.addMoney(10);
cashRegister1.addMoney(20);
cashRegister1.total(); // 30
cashRegister2.addMoney(50);
cashRegister1.total(); // 80

// Example 2.
// const Game = require('./Game');
// const Player = require('./Player');

import { Game } from './Game.js';
import { Player } from './Player.js';

const John = new Player('John');
const Mike = new Player('Mike');

const Poker = new Game();
Poker.join(John);
Poker.join(Mike);

John.wins(10);

Mike.wins(50);
Mike.wins(20);

console.log(Poker.scores());
console.log(Poker.getWinner());

// ===================================================== //
// A classic singleton implementation

var myDatabase = (function () {
  var instance;

  function init() {
    var privateConnectionNumber = Math.random();

    return {
      connection_number: privateConnectionNumber,
    }
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  }
})();

var db1 = console.log(myDatabase.getInstance());
var db2 = console.log(myDatabase.getInstance());

// ===================================================== //
// using constructor function

var myScoreBoard = (function () {
  var instance;

  function Singleton() {
    this.gameNumber = Math.random();
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = new Singleton();
      }
      return instance;
    }
  }
})();

var sb1 = console.log(myScoreBoard.getInstance());
var sb2 = console.log(myScoreBoard.getInstance());

console.log(sb1 === sb2);