'use strict';

describe('Feature: Ships are added to the Game', function() {

	context('Scenario 1: Given game has started', function() {
		
		describe('When ships are created', function() {
			
			it('Should have 3 ships ready in the game', function() {
				app.game.ships.should.have.length(3);
			});
			
			it('Should have 1 Battleship', function() {
				app.game.ships[0].should.be.instanceof(Battleship);
			});
			
			it('Should have 2 Destroyers', function() {
				app.game.ships[1].should.be.instanceof(Destroyer);
				app.game.ships[2].should.be.instanceof(Destroyer);
			});
			
		});
		
	});

});