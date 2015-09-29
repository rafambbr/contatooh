angular.module('contatooh').controller('ContatoController', function ($scope, $routeParams, Contato) {

	$scope.contato = {};

	if ($routeParams.contatoId) {
		//ATUALIZA
		//Só busca dados do contato se o ID for passado
		Contato.get({ id: $routeParams.contatoId },
			function (contato) {
				$scope.contato = contato;
			},
			function (erro) {
				$scope.mensagem = {
					texto: 'Contato não existe. Novo contato.'
				};
			}
			);
	} else {
		//CRIA
		$scope.contato = new Contato();
	}

	$scope.salva = function () {
		//Como 'contato' é um objeto retornado de $resource é adicinado funções adicionais ao nosso objeto sem sabermos
		// A função $save gera por debaixo dos panos uma requisição do tipo POST que envia para http://localhost/contatos
		$scope.contato.$save()
			.then(function () {
				$scope.mensagem = { texto: 'Salvo com sucesso' };
				// limpa o formulário
				$scope.contato = new Contato();
				$scope.btnBackFocus = true;
			})
			.catch(function (erro) {
				$scope.mensagem = { texto: 'Não foi possível salvar' };
			});
	};

	Contato.query(function (contatos) {
		$scope.contatos = contatos;
	});

});