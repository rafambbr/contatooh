describe("ContatoController", function () {

	var $scope;

	beforeEach(function () {
		//carregando o módulo 'contatooh' do AngularJS para os testes funcionarem
		module('contatooh');
		
		inject(function ($injector) {
			$scope = $injector.get('$rootScope').$new();
		});
	});

	//Utilizando 'inject' no 'it'
	it("Deve criar um Contato vazio quando nenhum parâmetro de rota for passado", inject(function ($controller) {
		
		//Injeta o Controller e todas suas dependências são resolvidas
		$controller('ContatoController', {"$scope" : $scope});

		//Todas as funções suportadas por expect => http://jasmine.github.io/2.0/introduction.html
		expect($scope.contato._id).toBeUndefined();

	}));

});