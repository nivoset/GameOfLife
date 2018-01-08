import GameOfLife from './code/GameOfLife.js'
import GameDisplay from './code/GameDisplay.js'
import Piece from './code/Piece.js'
let expect = chai.expect;
mocha.setup('bdd');

var width = 10;
var height = 10;

describe('Game Of Life Array Checks', function() {
  let game_of_life = new GameOfLife(width,height);

  //kill all life, easier than setting it all up for now
  game_of_life.eachPiece(p => p.alive = false);

  it('Should have a width of ' + width, function () {
    expect(game_of_life.game.length).to.equal(width);
  });

  it('Should have a height of ' + height, function () {
    game_of_life.game.forEach((r) => {
      expect(r.length).to.equal(height);
    });
  });

  describe('Array Checks', function() {
    it('Should be an array', function() {
      expect(game_of_life.game).to.be.an('array');
    });
    it('Should have all sub elements be an instance of "Piece"', function() {
      game_of_life.game.forEach(x => x.forEach(p => {
        expect(p).to.be.instanceOf(Piece);
      }));
    });

    it('All Pieces should be Dead', function() {
      game_of_life.eachPiece(p => expect(p.alive).to.equal(false));
    });
  });

  describe('Display unit test', function() {
    it('Should have an instance of "GameDisplay"', function() {
      expect(game_of_life.display).to.be.instanceOf(GameDisplay);
    });
  });

  it('Update functions should not throw an error', function() {
    expect(function () {
      game_of_life.tick();
    }).to.not.throw();
  });

});

describe('Piece Functions', function () {
  let startPoint = [
  /* 0 1 2 3 4 5 6 7 8 9 = x  y*/
    [0,0,0,0,0,0,0,0,0,0], // 0
    [0,0,0,0,0,0,0,0,0,0], // 1
    [0,0,0,0,0,0,0,0,0,0], // 2
    [0,0,0,0,0,0,0,0,0,0], // 3
    [0,0,0,0,1,0,0,0,0,0], // 4
    [0,0,0,0,1,1,1,1,1,0], // 5
    [0,0,0,0,0,0,1,1,0,0], // 6
    [0,0,0,0,0,0,0,0,0,0], // 7
    [0,0,0,0,0,0,0,0,0,0], // 8
    [0,0,0,0,0,0,0,0,0,0]  // 9
  ];
  let game_of_life = new GameOfLife(startPoint[0].length, startPoint.length, startPoint, 20);

  it('(6,5) should be alive', function () {
    expect(game_of_life.game[6][5].alive).to.equal(true);
  });
  it("(6,4) should be dead", function () {
    expect(game_of_life.game[6][4].alive).to.equal(false);
  });

  describe('Checking neighbors', function () {
    it('(5,7) Should see 1 neighbor alive', function () {
      expect(game_of_life.game[5][7].getLiveAroundMe()).to.equal(1);
    });
    it('(6,7) Should see 2 neighbor alive', function () {
      expect(game_of_life.game[6][7].getLiveAroundMe()).to.equal(2);
    });
    it('(6,4) Should see 3 neighbor alive', function () {
      expect(game_of_life.game[6][4].getLiveAroundMe()).to.equal(3);
    });
    it('(6,5) Should see 4 neighbor alive', function () {
      expect(game_of_life.game[6][5].getLiveAroundMe()).to.equal(4);
    });
  });

  describe('State Changes due to population', function () {
    it('(6,5) Should Die on tick (Starvation)', function () {
      expect(game_of_life.game[6][5].alive).to.equal(true);
      expect(game_of_life.game[6][5].checkForNewState()).to.equal(false);
    });
    it('(4,4) Should live on tick (2 neighbors)', function () {
      expect(game_of_life.game[4][4].alive).to.equal(true);
      expect(game_of_life.game[4][4].checkForNewState()).to.equal(true);
    });
    it('(7,4) Should live on tick (dead to live)', function () {
      expect(game_of_life.game[7][4].alive).to.equal(false);
      expect(game_of_life.game[7][4].checkForNewState()).to.equal(true);
    });
    it('(7,5) Should Die on tick (over crowding)', function () {
      expect(game_of_life.game[7][5].alive).to.equal(true);
      expect(game_of_life.game[7][5].checkForNewState()).to.equal(false);
    });
  });

  describe('Testing Update State Changes Properly', function () {
    it('(0,0) Should not change on tick (Dead)', function () {
      expect(game_of_life.game[0][0].alive).to.equal(false);
      expect(game_of_life.game[0][0].checkForNewState()).to.equal(false);
    });
    it('(4,4) Should not change on tick (Alive)', function () {
      expect(game_of_life.game[4][4].alive).to.equal(true);
      expect(game_of_life.game[4][4].checkForNewState()).to.equal(true);
    });
    it('(6,4) Should become alive on tick (Dead to Alive)', function () {
      expect(game_of_life.game[6][4].alive).to.equal(false);
      expect(game_of_life.game[6][4].checkForNewState()).to.equal(true);
    });
    it('(5,5) Should die on tick (Alive to Dead)', function () {
      expect(game_of_life.game[5][5].alive).to.equal(true);
      expect(game_of_life.game[5][5].checkForNewState()).to.equal(false);
    });
  });
});

mocha.run();
