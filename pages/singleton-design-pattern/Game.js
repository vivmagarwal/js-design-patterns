// const ScoreBoard = require('./Scoreboard');
import { Scoreboard as ScoreBoard } from './Scoreboard.js'

const Scores = new ScoreBoard(); // separate instance in player and separate in game, so it doesnot behave like a singleton.

class Game {
  join(player) {
    Scores.join(player.getName());
  }
  scores() {
    return Scores.getBoard();
  }
  getWinner() {
    return Scores.sort()[0];
  }
}

export { Game };

// module.exports = Game;