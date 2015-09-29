var config = require('./config')();

exports.config = {
	sauceUser: config.sauceUser,
	sauceKey: config.sauceKey,
	capabilities: {
		'name': config.sauceTestName,
		'browserName': 'chrome',
		'tunnel-identifier': config.travisJobNumber,
		'build': config.travisBuild
	},
	specs: ['../test/e2e/**/*Spec.js'],
	onPrepare: function () {
		
		//'onPrepare' => é executado apenas uma vez antes dos testes
		//Aqui usamos  o 'browser.driver' pois a pagina do GitHub não é feita em AngularJS
		browser.driver.get('http://localhost:3000');
		browser.driver.findElement(by.id('entrar')).click();
		browser.driver.findElement(by.id('login_field'))
			.sendKeys(config.seleniumUser);
		browser.driver.findElement(by.id('password'))
			.sendKeys(config.seleniumUserPassword);
		browser.driver.findElement(by.name('commit')).click();
	}
};