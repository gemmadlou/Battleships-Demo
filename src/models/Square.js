function Square(_grid, x, y) {
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
}