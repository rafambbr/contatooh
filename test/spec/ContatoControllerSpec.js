describe("ContatoController", function () {

	var $scope;
	var $httpBackend;

	beforeEach(function () {
		//carregando o módulo 'contatooh' do AngularJS para os testes funcionarem
		module('contatooh');

		inject(function ($injector, _$httpBackend_) {

			$scope = $injector.get('$rootScope').$new();
			$httpBackend = _$httpBackend_;

			$httpBackend.when('GET', '/contatos/1').respond({ _id: '1' });
			$httpBackend.when('GET', '/contatos').respond([{}]);

		});
	});

	//Utilizando 'inject' no 'it'
	it("Deve criar um Contato vazio quando nenhum parâmetro de rota for passado", inject(function ($controller) {
		
		//Injeta o Controller e todas suas dependências são resolvidas
		$controller('ContatoController', {
			'$routeParams': { contatoId: 1 },
			"$scope": $scope
		});
		$httpBackend.flush();
 
		//Todas as funções suportadas por expect => http://jasmine.github.io/2.0/introduction.html
		expect($scope.contato._id).toBeDefined();

	}));

	it("Deve preencher o Contato quando parâmetro de rota for passado", inject(function ($controller) {
		
		$controller('ContatoController', {
			$routeParams: { contatoId: 1 },
			'$scope': $scope
		});
		$httpBackend.flush();
		
		expect($scope.contato._id).toBeDefined();
	}));

});