'use strict';

describe('Feature: Start Game', function() {
	
	context('Scenario 1: Given a game has started', function() {
		
		describe('When application has initatiated', function() {
			
			
			it('Should throw an error - Game has initiated', function() {
				(function() {
					app.init();
				}).should.throw('Game already created');
			});
			
		});
		
	});

	context('Scenario 2: Given no game has started', function() {
	
		describe('When application has initatiated', function() {

			it('Should start the game', function() {
				app.game.should.be.an.instanceof(Game);
			});
		
		});
	
	});

});