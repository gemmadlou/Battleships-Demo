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