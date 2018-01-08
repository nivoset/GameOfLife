"use strick";

import GameOfLife from "./code/GameOfLife.js";

let startPoint = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,1,1,0,0,0,1,1,0,0],
  [0,1,1,0,0,0,1,0,1,0],
  [0,0,0,0,0,0,0,1,1,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,0,0],
  [1,1,1,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,0,0],
  [0,0,0,0,0,0,0,1,0,0]
];

let theGame = new GameOfLife(startPoint[0].length, startPoint.length, startPoint, 20);

//run the game updating code
/*
setInterval(function () {
  theGame.tick();
},250); //*/

function tick() {
  theGame.tick();
  setTimeout(tick, 500);
};

tick();
