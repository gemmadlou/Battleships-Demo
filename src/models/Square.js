function Square(_grid, x, y) {
	this._grid = _grid;
	this.y = y;
	this.x = x;
	
	this.addToGrid();
}

Square.prototype.addToGrid = function() {
	console.log(this.x, this.y, this._grid.addSquare)
	//this._grid.addSquare(this);
}