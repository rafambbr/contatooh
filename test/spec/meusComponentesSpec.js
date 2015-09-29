describe('meuBotaoAviso', function () {

	var $scope;
	var element;

	beforeEach(function () {
		module('meusComponentes');
		inject(function ($rootScope, $compile) {
			$scope = $rootScope.$new();
			element = angular.element(
				'<meu-botao-aviso nome="Remover" acao="remove()">');
			$compile(element)($scope);
			$scope.$digest();
		});
	});

	it('deve criar um botão de aviso com texto e função', function () {

		expect(element.text()).toContain('Remover');
		expect(element.attr('acao')).toBe('remove()');

	});

});


describe('meuBotaoAviso', function () {

	var $scope;
	var element;
	var evento = 'contatoSalvo';

	beforeEach(function () {
		module('meusComponentes');
		inject(function ($rootScope, $compile) {
			$scope = $rootScope.$new();

			element = angular.element('<button meu-focus evento="' + evento + '">Voltar</button>');

			$compile(element)($scope);
			$scope.$digest();
		});
	});

	describe('meuFocus', function () {

		it('Deve focar o botão', function () {
			angular.element(document.body).append(element);
		});


		it('Deve focar o botão', function () {
			angular.element(document.body).append(element);
			$scope.$broadcast(evento);
			expect(angular.element(document.activeElement).text()).toBe('Voltar');
		});

	});

});