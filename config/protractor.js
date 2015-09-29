var config = require('./config')();

exports.config = {
	sauceUser: 'rafambbr',
	sauceKey: 'd21c26f4-8b38-4e5a-b9a5-6f17771b8499',
	capabilities: {
		'name': 'Contatooh E2E Testing',
		'browserName': 'chrome',
		'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
		'build': process.env.TRAVIS_BUILD_NUMBER
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