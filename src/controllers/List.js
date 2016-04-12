var _ = require('underscore');
var models = require('../models');

var List = models.List;

var makerPage = function(req, res) {
	
	List.ListModel.findByOwner(req.session.account._id, function(err, docs){
		
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured'});
		}
		
		res.render('app', { csrfToken: req.csrfToken(), lists: docs});
	});
	
};

var mainLobby = function(req, res) {
	List.ListModel.findByOwner(req.session.account._id, function(err){
		
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured'});
		}
		
		res.render('lobby', { csrfToken: req.csrfToken()});
	
		});
};

var mainData = function(req, res) {
	List.ListModel.findByOwner(req.session.account._id, function(err, docs){
		
		if(err){
			console.log(err);
			return res.status(400).json({error: 'An error occured'});
		}
		
		res.render('data', { csrfToken: req.csrfToken(), lists: docs});
	});
};

var lobby = function (req, res){
	res.json({redirect: '/makeList'});
};

var makeList = function(req, res){
	
	if(!req.body.name || !req.body.itemOne || !req.body.itemTwo) {
		console.log("Please provide a name and two items");
		return res.status(400).json({error: "Please provide a name and two items"});
	}
	
	var ListData = {
		name: req.body.name,
		itemOne: req.body.itemOne,
		itemTwo: req.body.itemTwo,
		owner: req.session.account._id
	};
	
	var newList = new List.ListModel(ListData);
	
	newList.save(function(err){
		if(err) {
			console.log(err);
			return res.status(400).json({error:'An error occured'});
		}
		res.json({redirect: '/mainData'});
	});
	
};

var deleteList = function(req, res){
    List.ListModel.remove({_id: req.params._id}, function(err){
        if(err){
            res.json(err);
        }
        else{
            res.redirect('/mainData');
        }        
    });
};

module.exports.makerPage = makerPage;
module.exports.make = makeList;
module.exports.mainLobby = mainLobby;
module.exports.lobby = lobby;
module.exports.mainData = mainData;
module.exports.deleteList = deleteList;