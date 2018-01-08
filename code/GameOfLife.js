"use strick";
import GameDisplay from './GameDisplay.js';
import Piece from './Piece.js';

class GameOfLife {
  //initialization code in the constructor
  constructor(width, height, initial_state, pieceSize = 20, canvasID = "gol") {
      //size of the pieces
      this.size = pieceSize;

      this.display = new GameDisplay(width, height, this.size, this.size, canvasID);
      //hold width and height settings, this is how many cells in the 'world'
      this.width = width;
      this.height = height;

      //init array
      this.game = [];
      for (let x = 0; x < this.width; x++) {
        this.game[x] = [];
        for (let y = 0; y < this.height; y++) {
          this.game[x][y] = new Piece(x,y,this.game, Math.floor(Math.random()+0.3) );
        }
      }
      //if you have an initializing array use it now.
      if (initial_state) {
        this.setPieceState(initial_state);
      }
  }
  //Will set the current gameboard to the state you want. returning the game for chaining
  setPieceState(initial_state) {
    this.eachPiece(function (piece) {
      //quick sanity check
      if (initial_state[piece.y] !== undefined &&
          initial_state[piece.y][piece.x] !== undefined) {
        piece.alive = initial_state[piece.y][piece.x]?true:false;
      } else {
        throw new Error("Input data does not match array bounds.")
      }
    });
    return this;
  }
  //will return the state of the board
  getState() {
    let lastState = [];
    this.eachPiece(function (piece, lastState) {
      //quick sanity check
      if (lastState[piece.y] === undefined) {
        lastState[piece.y] = [];
      }
        lastState[piece.y][piece.x]=(piece.alive?1:0);
    }, lastState);

    return lastState;
  }
  //helper function for running checks on pieces
  eachPiece(funct, pass) {
    if (typeof funct === "string") {
      this.game.forEach(row=>row.forEach(p=> p[funct].call(p)));
    } else if (typeof funct === "function") {
      this.game.forEach(row=>row.forEach(p=> funct(p, pass)));
    }
    return this;
  }
  //tick calculates and updates the map array and display
  tick() {
    this.eachPiece('checkForNewState');
    this.eachPiece('updateState');
    this.display.updateCells(this.game);
    return this;
  }
}

export default GameOfLife;
