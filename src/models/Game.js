function Game() {
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