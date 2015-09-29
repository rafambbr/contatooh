angular.module('meusComponentes', []).directive('meuPainel', function () {
		var directive = {}
		directive.restrict = 'EA';
		directive.transclude = true;
		
		directive.scope = {
			titulo: '@'
		};
		
		directive.transclude = true;
		
		directive.templateUrl = 'js/directives/meus-componentes/meu-painel.html';
		
		return directive;
});