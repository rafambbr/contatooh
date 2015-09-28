// Utilizaremos o padrão CommonJS utilizado pelo NodeJS ( http://wiki.commonjs.org/wiki/Modules/1.1 )
var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function () {
	var app = express();
	
	// variável de ambiente
	app.set('port', 3000);
	
	// middleware 'express.static'
	// Configura a pasta que ficara publica para o navegador
	app.use(express.static('./public'));
	
	//Coletânea de middlewares de tratamento de header já prontos 
	//para uso, tornando nossa aplicaçãomais segura
	helmet = require('helmet');
	
	//Configura Sessão para utilizar => OAuth 2.0 com Passport
	app.use(cookieParser());
	app.use(session( 
		{ secret: 'homem avestruz',
			resave: true,
		  saveUninitialized: true
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	
	
	//HELMET ==============================
	app.use(helmet()); //deve estar imediatamente após a inicialização da sessão do Passport
	/*
			Não é incomum aplicações adicionarem no header http a informação **X-Powered-By** indicando 
			qual tecnologia está sendo utilizada pelo servidor. Hackers podem utilizar essa informação 
			para tentar explorar vulnerabilidades conhecidas da tecnologia utilizada. Podemos resolver 
			isso facilmente no Express deixando de informar o header 'X-Powered-By'
	*/
	app.disable('x-powered-by');
	//app.use(helmet.hidePoweredBy({ setTo: 'PHP 5.5.14' })); //Alterando a informação da tecnologia utilizada pelo servidor ajuda a confundir possiveis invasores
	
	app.use(helmet.xframe()); //evitamos que nossas páginas sejam referenciadas por <frame> ou <iframe>, evitando possíveis ataques do tipo clickjacking
	
	/* 
		 Filtro XSS (cross-site scripting) => Envolve o post de um blog. Alguém, com a intenção velada 
		 de prejudicar outra pessoa, adiciona em seu post a tag <script> que aponta para um script 
		 malicioso. Quando o post for visualizado (um que não foi sanitizado previamente) no navegador,
		 a tag indevidamente será processada.
		 
		 Esse código adiciona o header htpp X-XSS-Protection originalmente criado pela Microsoft. 
		 O Google gostou tanto da ideia que mais tarde adicionou o suporte deste header ao Chrome. 
		 O header solicita ao navegador a ativação de uma proteção especial contra XSS. Há suporte 
		 apenas ao IE9+ e Chrome, sendo desabilitado para outros navegadores, principalmente osmais
		 antigos
	*/
	app.use(helmet.xssFilter());
	
	/*
		Não permitir que o browser infira o MIME Type => Alguns navegadores permitem carregar através 
		das tags link e script arquivos que não sejam dos MIME types text/css e text/javascript,
		respectivamente:
		
		<!-- arquivo que não é um script -->
		<script src="arquivo.txt"></script>
		
		Porém, se no header de resposta houver X-Content-Type-Options:
		nosniff o navegador não permitirá esse abuso
	*/
	app.use(helmet.nosniff());
	
	//OBS: Podem ser ativamos mais middlewares suportados pelo HELMET a documentação está em: https://github.com/helmetjs/helmet 
	
	//HELMET ==============================
	
	
	
	
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