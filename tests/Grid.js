'use strict';

describe('Grid', function() {
	
	it('should have an array for squares', function() {
		app.game.grid.squares.should.be.instanceof(Array);
	});
	
});