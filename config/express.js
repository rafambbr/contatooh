// Utilizaremos o padrão CommonJS utilizado pelo NodeJS ( http://wiki.commonjs.org/wiki/Modules/1.1 )
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');

module.exports = function () {
	var app = express();
	
	// variável de ambiente
	app.set('port', 3000);
	
	// middleware 'express.static'
	// Configura a pasta que ficara publica para o navegador
	app.use(express.static('./public'));
	
	
	// Configurando template engine, ela deve estar abaixo da configuração do 'middleware' 'express.static'
	app.set('view engine', 'ejs');
	app.set('views', './app/views');

	// O 'method-override' precisam vir antes do carregamento de rotas pelo expressload
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(require('method-override')());

	//'expressload' => O parâmetro {cwd: ‘app’} foi necessário para mudar o diretório padrão
	load('models', { cwd: 'app' })
		.then('controllers')
		.then('routes')
		.into(app);

	return app;
};