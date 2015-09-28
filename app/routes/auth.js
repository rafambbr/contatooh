var passport = require('passport');

module.exports = function (app) {
	
	/*
	 * redirecionará o usuário para a página de login do GitHub enviando 
	 * por baixo dos panos o CLIENT ID da aplicação
	 */
	app.get('/auth/github', passport.authenticate('github'));
	
	/*
	 * possui o mesmo identificador que cadastramos como Authorization 
	 * callback URL no GitHub
	 */
	app.get('/auth/github/callback',
		passport.authenticate('github', { successRedirect: '/' })
	);

	app.get('/logout', function (req, res) {
		req.logOut(); // req.logOut adicionada automaticamente pelo Passport a cada requisição
		res.redirect('/');
	});

}