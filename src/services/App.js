function App() {
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
}