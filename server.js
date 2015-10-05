var http = require('http');
var express = require('express');
var app = require('./config/express')(app);
var config = require('./config/config')();

require('./config/passport')();
require('./config/database')('mongodb://localhost/contatooh');
require('./config/database')(config.db);

http.createServer(app).listen(config.port, config.address, function () {
	console.log('Express Https Server '
	+ config.address
 	+ ' (' + config.env
 	+ ') escutando na porta ' + config.port);
});