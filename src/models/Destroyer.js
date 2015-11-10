function Destroyer(_game) {
	this.size = 4;
	this.location = [ "", "", "", "" ]
	
	this._game = _game;
	
	if (typeof _game !== 'undefined') {
		this.AddToGame();
	}
}

Destroyer.prototype.AddToGame = function() {
	this._game.addShip(this);
}

Destroyer.prototype.addToSquare = function(square) {
	var index = this.location.indexOf('');
	this.location[index] = square;
}

Destroyer.prototype.isSunk = function() {
	var counter = 0;
	for (var i in this.location) {
		var location = this.location[i];
		if (location.isHit()) {
			counter++;
		}
	}
	
	return counter === this.size;
}