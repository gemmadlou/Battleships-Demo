'use strict';

describe('Roll dice', function() {
	
	it('Should return a number 1 out of 20 dice rolls at least once '
		+ ' when minNumber is 1 and max is 2', function() {
		var count = 0;
		
		for (var i = 0; i < 20; i++) {
			var number = app.game.rollDice(1, 2);
			if (number === 1) count++;
		}
		
		count.should.be.above(0);
		
	});
	
	it('Should always return a number between 1 and 10  '
		+ ' when minNumber is 1 and max is 10', function() {
		var count = 0;
		
		for (var i = 0; i < 1000; i++) {
			var number = app.game.rollDice(1, 10);
			if (number < 1 || number > 10) count++;
		}
		
		count.should.equal(0);
		
	});
	
});