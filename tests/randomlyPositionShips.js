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
				game.ships[0].location[0].should.not.equal('');
				game.ships[0].location[1].should.not.equal('');
				game.ships[0].location[2].should.not.equal('');
				game.ships[0].location[3].should.not.equal('');
				game.ships[0].location[4].should.not.equal('');
				game.ships[1].location[0].should.not.equal('');
				game.ships[1].location[1].should.not.equal('');
				game.ships[1].location[2].should.not.equal('');
				game.ships[1].location[3].should.not.equal('');
				game.ships[2].location[0].should.not.equal('');
				game.ships[2].location[1].should.not.equal('');
				game.ships[2].location[2].should.not.equal('');
				game.ships[2].location[3].should.not.equal('');
				
			});
			
			it('should assign ships to consecutive squares on the grid, either as a row, or column', function() {
				consecutiveTest(game.ships[0].location).should.be.true;
				consecutiveTest(game.ships[1].location).should.be.true;
				consecutiveTest(game.ships[2].location).should.be.true;
			});
			
			it('should not assign multiple ships to a single square', function() {
				for (var i = 0; i < 1000; i++) {
					squareClashTest(game.grid).should.be.false;
				}
			});
			
		});
		
	});

});