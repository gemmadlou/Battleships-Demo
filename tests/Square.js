'use strict';

describe('Square', function() {

	it('should have a y coordinate', function() {
		var game = new Game();
		var grid = new Grid(game);
		var square = new Square(grid, 1, 2);
		square.should.have.property('y');
	});
	
	it('should have an x coordinate', function() {
		var game = new Game();
		var grid = new Grid(game);
		var square = new Square(grid, 1, 2);
		square.should.have.property('x');
	});

});