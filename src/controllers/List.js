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

var makeList = function(req, res){
	
	if(!req.body.name || !req.body.itemOne || !req.body.itemTwo) {
		return res.status(400).json({error: "Please provide a name and two items."});
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
		res.json({redirect: '/maker'});
	});
	
};

var deleteList = function(req, res){
    List.ListModel.remove({_id: req.params._id}, function(err){
        if(err){
            res.json(err);
        }
        else{
            res.redirect('/maker');
        }        
    });
};

module.exports.makerPage = makerPage;
module.exports.make = makeList;
module.exports.deleteList = deleteList;