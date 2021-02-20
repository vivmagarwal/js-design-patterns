// const ScoreBoard = require('./Scoreboard');
import { Scoreboard as ScoreBoard } from './Scoreboard.js'

const Scores = new ScoreBoard(); // separate instance in player and separate in game, so it doesnot behave like a singleton.

class Player {
  constructor(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  wins(points) {
    Scores.update(this.name, points);
  }

  loses(points) {
    Scores.update(this.name, -points);
  }
}

// module.exports = Player;
export { Player };