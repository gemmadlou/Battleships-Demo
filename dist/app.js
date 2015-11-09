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
};function Destroyer(_game) {
	this.size = 4;
	this.coordinates = [ "", "", "", "" ]
	
	this._game = _game;
	
	if (typeof _game !== 'undefined') {
		this.AddToGame();
	}
}

Destroyer.prototype.AddToGame = function() {
	this._game.addShip(this);
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
	
	this.addToGrid();
}

Square.prototype.addToGrid = function() {
	console.log(this.x, this.y, this._grid.addSquare)
	//this._grid.addSquare(this);
};function App() {
	this.init();
}

App.prototype.init = function() {
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
			console.log(x, y);
			new Square(this.game.grid, x, y);
		}
	}
	
};var app = new App();