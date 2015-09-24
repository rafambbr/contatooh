module.exports = function () {
	
	var controller = {};
		
	controller.index = function (req, res) {	
		//O Express encontrará o arquivo de nossa view adicionando o sufixo ".ejs" e passara um JSON informado
		//para renderizar os valores do template no caso a propriedade "nome"
		res.render('index', { nome: 'Contatooh' });
	};
	
	return controller;
}