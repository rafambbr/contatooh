exports.config = {
	specs: ['../test/e2e/**/*.js'],

	onPrepare: function () {
		
		var config = require('./config')();
		
		//'onPrepare' => é executado apenas uma vez antes dos testes
		//Aqui usamos  o 'browser.driver' pois a pagina do GitHub não é feita em AngularJS
		browser.driver.get("http://localhost:3000");

		var linkEntrar = by.id("entrar");
		var fildLogin = by.id('login_field');
		var fildPassword = by.id('password');
		var btnCommit = by.name('commit');

		browser.driver.findElement(linkEntrar).click();
		browser.driver.findElement(fildLogin).sendKeys(config.seleniumUser);
		browser.driver.findElement(fildPassword).sendKeys(config.seleniumUserPassword);
		browser.driver.findElement(btnCommit).click();

	}
};