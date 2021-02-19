console.log('singleton-design-pattern works!!');
// please make sure that you run it in the node environment with npm run watch:node pages/singleton-design-pattern/script.js

// Example 1.
const cashRegister2 = require('./CashRegister');
const cashRegister1 = require('./CashRegister');


cashRegister1.addMoney(10);
cashRegister1.addMoney(20);
cashRegister1.total(); // 30
cashRegister2.addMoney(50);
cashRegister1.total(); // 80

// Example 2.
const Game = require('./Game');
const Player = require('./Player');

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