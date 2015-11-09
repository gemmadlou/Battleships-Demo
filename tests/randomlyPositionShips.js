'use strict';
var should = require('chai').should();

/**
 * Story: Ships are randomly positioned on the grid
 * As the game
 * I want to position ships on the grid randomly
 * So that the player can guess the ship locations
 */

describe('Feature: Randomly position ships on a 10x10 grid', function() {

	context('Scenario 1: Given game has no grid but has ships', function() {
		
		describe('When game randomly positions ships', function() {
			
			it('Should fail due to no grid', function() {
				
				app.should.throw(Error);
				
			});
			
		});
	
	});
	
	context('Scenario 2: Given game has grid but no ships', function() {
	
		describe('When game randomly positions ships', function() {
			
			it('Should fail due to no ships', function() {
				
				app.should.throw(Error);
				
			});
			
		});
	
	});
	
	context('Scenario 3: Given game has grid and ships', function() {
	
		describe('When game randomly positions ships '
				+ 'And 3 ships have size 3', function() {
			
			
			it('Should assign all ships a location', function() {
				game.ships[0].location[0].should.not.equal('');
				game.ships[0].location[1].should.not.equal('');
				game.ships[0].location[2].should.not.equal('');
				game.ships[1].location[0].should.not.equal('');
				game.ships[1].location[1].should.not.equal('');
				game.ships[1].location[2].should.not.equal('');
				game.ships[2].location[0].should.not.equal('');
				game.ships[2].location[1].should.not.equal('');
				game.ships[2].location[2].should.not.equal('');
				
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