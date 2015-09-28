module.exports = function (app) {

	var Contato = app.models.contato;
	var controller = {};

	controller.listaContatos = function (req, res) {
		var promise = Contato.find().populate('emergencia').exec()
			.then(
				function (contatos) {
					res.json(contatos);
				},
				function (erro) {
					console.error(erro);
					res.status(500).json(erro);
				}
			);
	};

	controller.obtemContato = function (req, res) {
		var _id = req.params.id;
		Contato.findById(_id).exec()
			.then(
				function (contato) {
					if (!contato) throw new Error("Contato não encontrado");
					res.json(contato);
				},
				function (erro) {
					console.log(erro);
					res.status(404).json(erro);
				}
			);
	 };

	controller.removeContato = function (req, res) {
		var _id = sanitize(req.params.id); //'sanitize()' do 'mongo-sanitize' evita 'query selector injection'
		Contato.remove({ "_id": _id }).exec()
			.then(
				function () {
					res.status(204).end();
				},
				function (erro) {
					return console.error(erro);
				}
			);
	 };

	controller.salvaContato = function (req, res) {
		var _id = req.body._id;
		
		/*
		Independente da quantidade de parâmetros, apenas selecionamos o 'nome', 'email' e 'emergencia'
		Isso impede que caso o POST tenha sido manipulado e tenha sido enviados mais parâmetros no 'body'
		só será gravado no MongoDB o que realmente deve ser criado.
		
		No nosso caso como utilizamos o Mongoose ele ameniza esse problema, pois ele garante que sera o 
		objeto enviado respeite o contrato definido nos modelos '/models/contato.js' sem a possibilidade 
		de adição de novas propriedades no nosso modelo
		
		Repare que, por mais que seja interessante utilizar na íntegra os dados enviados na requisição, 
		é altamente recomendado realizarmosumfiltro antes, mesmo que isso aumente nossa impedância.
		*/
		var dados = {
			"nome": req.body.nome,
			"email": req.body.email,
			"emergencia": req.body.emergencia || null
		};
		
		// testando por undefined
		req.body.emergencia = req.body.emergencia || null;

		if (_id) {
			Contato.findByIdAndUpdate(_id, req.body).exec()
				.then(
					function (contato) {
						res.json(contato);
					},
					function (erro) {
						console.error(erro);
						res.status(500).json(erro);
					}
					);
		} else {
			Contato.create(req.body)
				.then(
					function (contato) {
						res.status(201).json(contato);
					},
					function (erro) {
						console.log(erro);
						res.status(500).json(erro);
					}
				);
		}

	 };

	return controller;
};