function Grid(_game) {
	this._game = _game;
	this.squares = [];
	
	this.addToGame();
}

Grid.prototype.addToGame = function() {
	this._game.addGrid(this);
}

Grid.prototype.addSquare = function(square) {
	this.squares.push(square);
}