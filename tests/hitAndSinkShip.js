'use strict';

describe('Feature: Hit and sink ship', function() {

	context('Scenario 1: Given ship square has not been hit', function() {
	
		it('Should record ship is hit', function() {
			
			var app = new GameService();
			var coords = app.game.ships[0].location[0];
			app.game.fire(coords.x, coords.y);
			
			app.game.ships[0].location[0].hit.should.be.true;
		});
	
	});
	
	context('Scenario 2: Given all ship squares have been hit', function() {
		var app = new GameService();
		
		it('Should sink the ship', function() {
			var response;
			
			var coords = app.game.ships[0].location;
			for (var i in coords) {
				 response = app.game.fire(coords[i].x, coords[i].y);
			}
			
			for (var i in coords) {
				coords[i].hit.should.be.true;
			}
			
			response.message.should.equal('You have sunk the '+app.game.ships[0].constructor.name);
			
		});
		
	});
	
	context('Scenerio 3: Given no ship is hit', function() {
		
		it('Should return message that no ship has been hit', function() {
			var availableSquare = app.game.getAvailableSquares();
			var response = app.game.fire(availableSquare[0].x, availableSquare[0].y);
			response.message.should.equal('No hit');
		});
		
	});

});