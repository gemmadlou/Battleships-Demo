'use strict';

describe('Feature: Get All Available Squares', function() {

	it('should return 2 out squares that are not occupied by a ship'
	+ ' when there are 3 squares, and 1 square is occupied', function() {
	
		var game = new Game();
		var grid = new Grid(game);
		var ship = new Battleship(game);
		
		new Square(grid, 1, 1);
		new Square(grid, 1, 2);
		new Square(grid, 1, 3);
		
		grid.squares[0]._ship = ship;
		
		var squares = game.getAvailableSquares();
	
		squares.should.have.length(2);
		squares[0].x.should.equal(1);
		squares[0].y.should.equal(2);
		squares[1].x.should.equal(1);
		squares[1].y.should.equal(3);
	});


	it('should return 1 out squares that are not occupied by a ship'
	+ ' when there are 3 squares, and 2 squares are occupied', function() {
	
		var game = new Game();
		var grid = new Grid(game);
		var ship = new Battleship(game);
		
		new Square(grid, 1, 1);
		new Square(grid, 1, 2);
		new Square(grid, 1, 3);
		
		grid.squares[0]._ship = ship;
		grid.squares[1]._ship = ship;
		
		var squares = game.getAvailableSquares();
	
		squares.should.have.length(1);
		squares[0].x.should.equal(1);
		squares[0].y.should.equal(3);
	});

});