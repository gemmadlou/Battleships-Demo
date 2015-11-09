function Destroyer(_game) {
	this.size = 4;
	this.coordinates = [ "", "", "", "" ]
	
	this._game = _game;
	
	if (typeof _game !== 'undefined') {
		this.AddToGame();
	}
}

Destroyer.prototype.AddToGame = function() {
	this._game.addShip(this);
}