var controller = require('../controllers/home')();

module.exports = function(app) {
	
	//A função app.get equivale ao verbo GET do http
	//Ligando a rota ao controller
	app.get('/index', controller.index);
	app.get('/', controller.index);	
}