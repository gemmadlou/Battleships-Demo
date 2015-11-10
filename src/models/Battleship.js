function Battleship(_game) {
	this.size = 5;
	this.location = ["", "", "", "", ""];
	this._game = _game;
	
	if (typeof _game !== 'undefined') {
		this.AddToGame();
	}
}

Battleship.prototype.AddToGame = function() {
	this._game.addShip(this);
}

Battleship.prototype.addToSquare = function(square) {
	var index = this.location.indexOf('');
	this.location[index] = square;
}

Battleship.prototype.isSunk = function() {
	var counter = 0;
	for (var i in this.location) {
		var location = this.location[i];
		if (location.isHit()) {
			counter++;
		}
	}
	return counter === this.size;
}