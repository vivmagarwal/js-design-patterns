const ScoreBoard = require('./Scoreboard');
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

module.exports = Game;