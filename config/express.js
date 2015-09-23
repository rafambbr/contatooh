// Utilizaremos o padrão CommonJS utilizado pelo NodeJS ( http://wiki.commonjs.org/wiki/Modules/1.1 )
var express = require('express');

module.exports = function() {
	var app = express();
	
	// variável de ambiente
	app.set('port', 3000);
	
	// middleware 'express.static'
	// Configura a pasta que ficara publica para o navegador
	app.use(express.static('./public'));
	
	
	// necessário apenas na versão 3.X do Express
	app.use(app.router);
	
	// abaixo da variável express declarada no topo do arquivo
	var home = require('../app/routes/home');
	
	// abaixo da configuração do último middleware
	home(app);
	
	return app;
};