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

GameService.prototype.fire = function() {
	var command = document.getElementById('command').value;
	
	if (command.length > 3) {
		return alert("Invalid command length");
	}
	
	var row = command.substr(0, 1),
		column = command.substr(1, command.length);
	
	if (!isNaN(row)) {
		return alert("Command invalid. First command should be a character - not a number");
	}
	
	if (isNaN(column)) {
		return alert("Command invalid. Command should be as in A1, B10 etc");
	}
	
	if (row > 'J') {
		return alert("Command invalid. J is the maximum letter");
	}
	
	if (column > 10 || column < 1) {
		return alert("Command invalid. coordinate should be between 1-10");
	}
	
	var x = this.rowCoords.indexOf(row.toUpperCase());
	
	var res = this.game.fire(x, (column - 1));
	
	document.getElementById('response').innerHTML = res.message;
	
}