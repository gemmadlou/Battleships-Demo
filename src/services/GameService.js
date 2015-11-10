function GameService() {
	this.rowCoords = ['A','B','C','D','E','F','G','H','I','J'];
	this.init();
}

GameService.prototype.init = function() {
	if (typeof this.game === 'undefined') {
		this.game = new Game();
	} else {
		throw new Error('Game already created');
	}

	new Battleship(this.game);
	new Destroyer(this.game);
	new Destroyer(this.game);
	
	new Grid(this.game);
	
	for (var x = 0; x < this.game.gridsize[0]; x++) {
		for (var y = 0; y < this.game.gridsize[1]; y++) {
			new Square(this.game.grid, x, y);
		}
	}
	
	this.game.randomlyPositionShips();
	
}