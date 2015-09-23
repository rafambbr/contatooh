var controller = require('../controllers/home')();

module.exports = function(app) {
	
	//A função app.get equivale ao verbo GET do http
	//Ligando a rota ao controller
	app.get('/', controller.index);	
	app.get('/index', controller.index);
}