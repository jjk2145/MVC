var models = require('../models');

var Account = models.Account;

var loginPage = function(req, res){
	res.render('login', { csrfToken: req.csrfToken() });
};

var signupPage = function(req, res){
	res.render('signup', { csrfToken: req.csrfToken() });
};

var logout = function(req, res){
	req.session.destroy();
	res.redirect('/');
};

var login = function(req, res){
	if(!req.body.username || !req.body.pass){
		console.log("Please provide all required feilds");
		return res.status(400).json({error: "Please provide all required feilds"});
	}
	
	Account.AccountModel.authenticate(req.body.username, req.body.pass, function(err,account){
		if(err || !account){
			console.og("Wrong username or password");
			return res.status(401).json({error: "Wrong username or password"});
		}
		
		req.session.account = account.toAPI();
		
		res.json({redirect: '/mainLobby'});
	});
};

var signup = function(req, res){
	if(!req.body.username || !req.body.pass || !req.body.pass2) {
		console.log("Please fill each field");
		return res.status(400).json({error: "Please fill each field"});
	}
	
	if(req.body.pass !== req.body.pass2) {
		console.log("Passwords do not match");
		return res.status(400).json({error: "Passwords do not match"});
	}
	
	Account.AccountModel.generateHash(req.body.pass, function(salt, hash){
		var accountData = {
			username: req.body.username,
			salt: salt,
			password: hash
		};
		
		var newAccount = new Account.AccountModel(accountData);
		
		newAccount.save(function(err){
			if(err){
				console.log(err);
				return res.status(400).json({error: 'An error occured'});
			}
			
			req.session.account = newAccount.toAPI();
			
			res.json({redirect: '/mainLobby'});
		});
	});
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.logout = logout;
module.exports.signupPage = signupPage;
module.exports.signup = signup;