function Battleship() {
	this.size = 5;
	this.coordinates = ["", "", "", "", ""]
};function Destroyer() {
	this.size = 4;
	this.coordinates = [ "", "", "", "" ]
};function Game() {

};function App() {
	this.init();
}

App.prototype.init = function() {
	this.createGame();
}

App.prototype.createGame = function() {
	if (typeof this.game === 'undefined') {
		this.game = new Game();
	} else {
		throw new Error('Game already created');
	}
};var app = new App();