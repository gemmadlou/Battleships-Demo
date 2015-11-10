describe('Ship: Battleship', function() {

	it('Should have size 5', function() {
	
		var battleship = new Battleship();
		battleship.size.should.equal(5);
	
	});
	
	it('Should have location coordinates length of 5', function() {
		var battleship = new Battleship();
		battleship.location.should.have.length(5);
	});

});