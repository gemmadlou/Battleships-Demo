function Battleship(_game) {
	this.size = 5;
	this.coordinates = ["", "", "", "", ""];
	this._game = _game;
	
	if (typeof _game !== 'undefined') {
		this.AddToGame();
	}
}

Battleship.prototype.AddToGame = function() {
	this._game.addShip(this);
}