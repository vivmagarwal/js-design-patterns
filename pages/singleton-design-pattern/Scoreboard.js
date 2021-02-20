class Scoreboard {
  constructor() {
    this.board = [];
  }

  join(name) {
    this.board.push({
      name,
      points: 0,
    });
  }

  leave(name) {
    this.board = this.board.filter(player => player.name !== name);
  }

  update(name, points) {
    const player = this.board.findIndex(player => player.name === name);
    if (player > -1) {
      this.board[player].points += points;
    }
  }

  getBoard() {
    return this.board;
  }

  sort() {
    return this.board.sort((x, y) => y.points - x.points);
  }
}

// module.exports = Scoreboard;
export { Scoreboard };


// Solution: Bascially if we create an instance of the Scoreboard and then expoert it, the instance will be cached and it will behave like a singleton.
// consequent access to the module will be accessing the same instance.
// So create an instance here and then expoert it. In the modules that uses the instance, require the instance directly.
