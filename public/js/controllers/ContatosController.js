angular.module('contatooh').controller('ContatosController', function ($scope, $resource) {

	$scope.contatos = [];
	$scope.filtro = '';
	$scope.mensagem = {texto: ''};

	var Contato = $resource('/contatos/:id');
	
	function buscaContatos() {
		Contato.query(
			function (contatos) {
				$scope.contatos = contatos;
			},
			function (erro) {
				console.log("Não foi possível obter a lista de contatos");
				console.log(erro);
			});
	}
	buscaContatos();

	$scope.remove = function (contato) {
		var promise = Contato.delete({ id: contato._id }).$promise;
		promise
			.then(buscaContatos)
			.catch(function (erro) {
				console.log("Não foi possível remover o contato");
				console.log(erro);
			});
	};

});