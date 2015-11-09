'use strict';

describe('Feature: Ships are added to the Game', function() {

	context('Scenario 1: Given game has started', function() {
		
		describe('When ships are created', function() {
			
			it('Should have 3 ships ready in the game', function() {
				game.ships.should.have.length(3);
			});
			
		});
		
	});

});