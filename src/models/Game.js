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