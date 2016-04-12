var controllers = require('./controllers');
var mid = require('./middleware');

var router = function(app){
	app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.post("/login", mid.requiresSecure, mid.requiresLogout,controllers.Account.login);
	app.get("/signup", mid.requiresSecure, mid.requiresLogout,controllers.Account.signupPage);
	app.post("/signup", mid.requiresSecure, mid.requiresLogout,controllers.Account.signup);
	app.get("/logout", mid.requiresLogin, controllers.Account.logout);
	app.get("/makeList", mid.requiresLogin, controllers.List.makerPage);
	app.post("/makeList", mid.requiresLogin, controllers.List.maker);
	app.get("/mainLobby", mid.requiresLogin, controllers.List.mainLobby);
	app.post("/mainLobby", mid.requiresLogin, controllers.List.lobby);
	app.get("/mainData", mid.requiresLogin, controllers.List.mainData);
	app.post("/mainData", mid.requiresLogin, controllers.List.maker);
	app.get("/", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.get("/removeList/:_id",  mid.requiresLogin, controllers.List.deleteList);
};

module.exports = router;