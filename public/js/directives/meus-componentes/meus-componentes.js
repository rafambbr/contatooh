angular.module('meusComponentes', [])

	.directive('meuPainel', function () {
		var directive = {}
		directive.restrict = 'EA';
		directive.transclude = true;

		directive.scope = {
			titulo: '@'
		};

		directive.transclude = true;

		directive.templateUrl = 'js/directives/meus-componentes/meu-painel.html';

		return directive;
	})

	.directive('meuBotaoAviso', function () {
		var directive = {}
		directive.restrict = 'E';

		directive.scope = {
			nome: '@',
			acao: '&'
		};

		directive.template =
		'<button ng-click="acao()" class="btn btn-warning">'
		+ '{{nome}}'
		+ '</button>';

		return directive;
	})

	.directive('meuFocus', function () {
		var directive = {};

		directive.restrict = 'A';

		directive.scope = {
			focus: '='
		};

		directive.link = function (scope, element) {
			scope.$watch('focus', function () {
				if (scope.focus) {
					element[0].focus();
					scope.focus = false;
				}
			});
		};

		return directive;
	});