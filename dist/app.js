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
};function Destroyer(_game) {
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
};function Game() {
	this.ships = [];
	this.gridsize = [10, 10];
	
	this.grid = undefined;
}

Game.prototype.addShip = function(ship) {
	this.ships.push(ship);
}

Game.prototype.addGrid = function(grid) {
	this.grid = grid;
}

Game.prototype.rollDice = function(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

Game.prototype.getAvailableSquares = function() {
	var availableSquares = [];
	for (var i in this.grid.squares) {
		if (typeof this.grid.squares[i]._ship === 'undefined') {
			availableSquares.push(this.grid.squares[i]);
		}
	}
	return availableSquares;
}

Game.prototype.getColumnOfSquares = function(columnLength) {
	var col = [];
	
	var squares = this.getAvailableSquares();
	var randomPick = this.rollDice(1, squares.length) - 1;
	var maxIndex = randomPick + columnLength;
	
	
	counter = 0;
	for (var i = randomPick; i < maxIndex; i++) {
		col.push(squares[i]);
		counter++;
	}
	
	if (!this.isColumn(col)) return false;
	
	if (!this.IsConsecutive(col, 'col')) return false;
	
	return col;
	
}

Game.prototype.getRowOfSquares = function(rowLength) {
	var row = [];
	
	var squares = this.getAvailableSquares();
	var randomPick = this.rollDice(1, squares.length) - 1;
	var maxIndex = randomPick + rowLength;
	
	counter = 0;
	for (var i = randomPick; i < maxIndex; i++) {
		var index = i + (counter*(this.gridsize[1]-1));
		row.push(squares[index]);
		counter++;
	}
	
	if (!this.isRow(row)) return false;
	
	if (!this.IsConsecutive(row, 'row')) return false;
	
	return row;
	
}

Game.prototype.isRow = function(row) {
	var y;
	for (var i = 0; i < row.length; i++) {
		
		if (typeof row[i] === 'undefined') {
			return false;
		} else if (typeof y !== 'undefined' && y !== row[i].y) {
			return false;
		}
		y = row[i].y;
	}
	return true;
}

Game.prototype.isColumn = function(column) {
	
	var x;
	for (var i = 0; i < column.length; i++) {
		if (typeof column[i] === 'undefined') {
			return false;
		} else if (typeof x !== 'undefined' && x !== column[i].x) {
			return false;
		}
		x = column[i].x;
	}
	return true;
}

Game.prototype.IsConsecutive = function(squares, orientation) {
	var difference;

	for (var i = 0; i < squares.length; i++) {
		if (i > 1) {
			var thisSquare = squares[i];
			var prevSquare = squares[i-1];
			
			if (orientation === 'col') {
				difference = thisSquare.y - prevSquare.y;
			} else {
				difference = thisSquare.x - prevSquare.x;
			}
			
			if (difference > 1) {
				return false;
			}
		}
	}
	
	return true;
	
}

Game.prototype.randomlyPositionShips = function() {
	var base = this;
	var shipsArray = this.ships.slice(0);
	
	var positionShip = function(ships) {
		
		if (ships.length === 0) return;
		
		var nextShip = ships[0];
		
		if (base.rollDice(1,2) === 1) {
			var coordinates = base.getColumnOfSquares(nextShip.size);
		} else {
			var coordinates = base.getRowOfSquares(nextShip.size);
		}
		
		if (!coordinates) {
			return positionShip(ships); // Invalid - try again
		}
		
		for (var i in coordinates) {
			coordinates[i].addShip(nextShip);
		}
		
		ships.splice(0, 1);
		
		positionShip(ships);
	}
	
	positionShip(shipsArray);
}

Game.prototype.fire = function(x, y) {
	
	var response = {
		message: 'No hit'
	};
	
	stop:
	for (var i in this.ships) {
		var ship = this.ships[i];
		for (var n in ship.location) {
			var location = ship.location[n];
			if (location.x === x && location.y === y) {
				location.addHit();
				response.message = 'Successful hit';
				if (ship.isSunk()) {
					response.message = 'You have sunk the '+ ship.constructor.name;
				}
				break stop;
			}
		}
	}
	
	return response;
};function Grid(_game) {
	this._game = _game;
	this.squares = [];
	
	this.addToGame();
}

Grid.prototype.addToGame = function() {
	this._game.addGrid(this);
}

Grid.prototype.addSquare = function(square) {
	this.squares.push(square);
};function Square(_grid, x, y) {
	this._grid = _grid;
	this.y = y;
	this.x = x;
	this._ship = undefined;
	this.hit = false;
	
	this.addToGrid();
}

Square.prototype.addToGrid = function() {
	this._grid.addSquare(this);
}

Square.prototype.addShip = function(ship) {
	this._ship = ship;
	this._ship.addToSquare(this);
}

Square.prototype.addHit = function() {
	this.hit = true;
}

Square.prototype.isHit = function() {
	return this.hit;
};function GameService() {
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
	
};;var app = new GameService();

