function cloneObject(obj) {
	return _.cloneDeep(obj, true);
}

function getRandomInt(min, max) {
  return Math.round(Math.random() * (max - min)) + min;
};/** Reference Data **/

var lettersArray = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J' ];

var rowOrCol = [ 'row', 'col' ];;function Game(gridsize) {
  
	this.gridsize = gridsize;
	this.ships = [];
	this.freeSquares = {
		rows: [],
		cols: []
	}

	this.setAllPositions();
	
	//console.log("game", this);
	
}

Game.prototype.addShip = function(ship) {
	this.ships.push(ship);
}

Game.prototype.setAllPositions = function() {
	
	var rows = [];
	var letter = 'A';
	
	for (var i = 0; i < this.gridsize; i++) {
		rows[i] = [];
		for (var n = 1; n <= this.gridsize; n++) {
			rows[i].push(lettersArray[i]+''+n);
		}
	}
	
	this.freeSquares.rows = rows;
	
	var cols = [];
	
	for (var i = 1; i <= this.gridsize; i++) {
		cols[i-1] = [];
		for (var n = 0; n < this.gridsize; n++) {
			cols[i-1].push(lettersArray[n]+''+i); 
		}
	}
	
	this.freeSquares.cols = cols;
			
}

Game.prototype.setShipLocation = function(ship) {
	var rowOrCol = getRandomInt(1, 2);

	var lines = (rowOrCol == 1) ? _.clone(this.freeSquares.rows) : _.clone(this.freeSquares.cols);
	
	lines = _.filter(lines, function(obj) {
		// @TODO - Ensure lines have consecutive numbers/letters
		return obj.length >= ship.size;
	});
	
	var lineIndex = Math.round(Math.random() * (lines.length - 1)) + 0;
	
	var line = lines[lineIndex];
	
	var MaxDataIndex = line.length - ship.size;
	var randomMinIndex = Math.round(Math.random() * MaxDataIndex) + 0;
	
	for (var i = randomMinIndex; i < (randomMinIndex + ship.size); i++) {
		ship.position.push(line[i]);
	}
	
	//var availableSquaresInRow = _.difference(_.flatten(this.freeSquares.rows), ship.position);
	//var availableSquaresInCol = _.difference(_.flatten(this.freeSquares.cols), ship.position);
	
	var availableSquares = _.difference(_.uniq(_.flatten(this.freeSquares.rows).concat(_.flatten(this.freeSquares.cols))), ship.position);
	
	var rows = [];
	var cols = [];
	//console.log(availableSquares, 77, ship.position,MaxDataIndex)
	
	
	if (rowOrCol == 1) {
		
		for (var i = 0; i < this.gridsize; i++) {
			rows[i] = [];
			for (var n = 1; n <= this.gridsize; n++) {
				if (availableSquares.indexOf(lettersArray[i]+''+n) > -1) {
					rows[i].push(lettersArray[i]+''+n);
				}
			}
		}
	
	} else {
		
		for (var i = 1; i <= this.gridsize; i++) {
			cols[i-1] = [];
			for (var n = 0; n < this.gridsize; n++) {
				if (availableSquares.indexOf(lettersArray[n]+''+i) > -1) {
					cols[i-1].push(lettersArray[n]+''+i); 
				}
			}
		}
	}
	
	//console.log("lines", rows, cols);
	
	this.freeSquares.rows = (rows.length > 0) ? rows : cols;
	this.freeSquares.cols = (cols.length > 0) ? cols : rows;
	
	//console.log("lines", this.freeSquares.rows , this.freeSquares.cols);
	
	console.log("cheat the positions: ", ship.name, ship.position);
}

Game.prototype.Fire = function(command) {
	var ship = undefined;
	
	all:
	for (var i in this.ships) {
		for (var n in this.ships[i].position) {
			var pos = this.ships[i].position[n];
			if (pos == command) {
				ship = this.ships[i];
				ship.hit(command);
				break all;
			}
			//console.log(pos);
		}
	}
	
	return {
		hit: (typeof ship !== 'undefined'),
		ship: ship
	}
	
};function Ship(game, name, size) {
  this.game = game;
  this.name = name;
  this.size = size;
  this.position = [];
  this.hits = [];
  this.sunk = false;
  
  this.addToGame();
  this.setLocation();
  
}

Ship.prototype.addToGame = function() {
	this.game.addShip(this);
}

Ship.prototype.setLocation = function() {
	this.game.setShipLocation(this);
}	

Ship.prototype.hit = function(command) {
	if (this.hits.indexOf(command) === -1 ) {
		this.hits.push(command);
	}
	
	if (this.hits.length === this.position.length) {
		this.sunk = true;
	}
};// Wireup Game
var gridsize = 10;

var game = new Game(gridsize);

var Battleship 	= new Ship(game, 'Battleship', 5);
var Destroyer 	= new Ship(game, 'Destroyer', 4);
var Destroyer2 	= new Ship(game, 'Destroyer', 4);

var Fire = function() {
	var command = document.getElementById('entry').value;
	
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
	
	var response = game.Fire(command);
	
	if (response.hit) {
		document.getElementById('response-container').innerHTML = 'Successful Hit';
	} else {
		document.getElementById('response-container').innerHTML = 'No hit';
	}
	
	if (typeof response.ship !== 'undefined' && response.ship.sunk) {
		document.getElementById('response-sunk').innerHTML = 'You sunk the ' + response.ship.name;
	} else {
		document.getElementById('response-sunk').innerHTML = '';
	}
	
}