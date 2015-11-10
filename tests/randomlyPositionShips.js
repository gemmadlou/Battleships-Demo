'use strict';

/**
 * Story: Ships are randomly positioned on the grid
 * As the game
 * I want to position ships on the grid randomly
 * So that the player can guess the ship locations
 */

describe('Feature: Randomly position ships on a 10x10 grid', function() {
	
	context('Scenario 1: Given app has initiated', function() {
	
		describe('When game randomly positions 3 ships '
				+ '1 Battleship and 2 Destroyer', function() {
			
			it('Should assign all ships a location', function() {
				app.game.ships[0].location[0].should.not.equal('');
				app.game.ships[0].location[1].should.not.equal('');
				app.game.ships[0].location[2].should.not.equal('');
				app.game.ships[0].location[3].should.not.equal('');
				app.game.ships[0].location[4].should.not.equal('');
				app.game.ships[1].location[0].should.not.equal('');
				app.game.ships[1].location[1].should.not.equal('');
				app.game.ships[1].location[2].should.not.equal('');
				app.game.ships[1].location[3].should.not.equal('');
				app.game.ships[2].location[0].should.not.equal('');
				app.game.ships[2].location[1].should.not.equal('');
				app.game.ships[2].location[2].should.not.equal('');
				app.game.ships[2].location[3].should.not.equal('');
				
			});
			
			it('should assign ships to consecutive squares on the grid, either as a row, or column', function() {
				for (var n = 0; n < 100; n++) {
					var app = new GameService();
					
					for (var i in app.game.ships) {
						if (app.game.isColumn(app.game.ships[i].location)) {
							app.game.IsConsecutive(app.game.ships[i].location, 'col').should.be.true;
						} else {
							app.game.IsConsecutive(app.game.ships[i].location, 'row').should.be.true;
						}
					}
				}
				
			});
			
			it('should not assign multiple ships to a single square', function() {
				var counter = 0;
				
				for (var i = 0; i < 100; i++) {
					var game = new Game();

					new Battleship(game);
					new Destroyer(game);
					new Destroyer(game);
					
					new Grid(game);
					
					for (var x = 0; x < game.gridsize[0]; x++) {
						for (var y = 0; y < game.gridsize[1]; y++) {
							new Square(game.grid, x, y);
						}
					}
					
					game.randomlyPositionShips();
					
					if (game.getAvailableSquares().length !== 87) counter++
					
				}
				
				counter.should.equal(0);
				
			});
			
		});
		
	});

});