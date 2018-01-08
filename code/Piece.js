"use strick";
class Piece {
  constructor(x,y, game, baseState) {
    this.x = x;
    this.y = y;

    this.alive = baseState;
    this.game = game;
  }
  //gets the count of live cells around this cell.
  getLiveAroundMe() {
    let count = 0;
    for (let ix = (this.x-1); ix <= (this.x+1); ix++) {
      if (this.game[ix] !== undefined) { //skip -1 or higher than defined addresses
        for (let iy = (this.y-1); iy <= (this.y+1); iy++) {
          if (
              (this.game[ix][iy] !== undefined) &&
              (this.x !== ix || this.y !== iy) &&
              (this.game[ix][iy].alive))
          {
            count++;
          }
        }
      }
    }
    return count;
  }
  //updates the newState variable for the next state of this piece
  checkForNewState() {
    let count = this.getLiveAroundMe();
    this.count = count;
    this.newState = this.alive;
    if (this.alive) {
      if (count < 2 || count > 3) {
        this.newState = false;
      } else if (this.x == 4 && this.y === 8) {
        console.log(this);
      }
    } else if (count === 3) {
      this.newState = true;
    }
    return this.newState;
  }
  //updates state to the new state.
  updateState() {
    this.alive = this.newState;
  }
}

export default Piece;
