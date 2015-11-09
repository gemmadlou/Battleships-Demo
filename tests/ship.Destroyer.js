describe('Ship: Destroyer', function() {

	it('Should have size 4', function() {
	
		var destroyer = new Destroyer();
		destroyer.size.should.equal(4);
	
	});
	
	it('Should have location coordinates length of 4', function() {
		var destroyer = new Destroyer();
		destroyer.coordinates.should.have.length(4);
	});

});