var mongoose = require('mongoose');
var _ = require('underscore');

var ListModel;

var setName = function(name){
	return _.escape(name).trim();
};

var ListSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		set: setName
	},
	
	itemOne: {
		type: String,
		required: true,
		trim: true
	},
	
	itemTwo: {
		type: String,
		required: true,
		trim: true
	},
	
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	createdData: {
		type: Date,
		default: Date.now
	}
});

ListSchema.methods.toAPI = function() {
	return {
		name: this.name,
		itemOne: this.itemOne,
		itemTwo: this.itemTwo
	};
};

ListSchema.statics.findByOwner = function(ownerId, callback){
	
	var search = {
		owner: ownerId
	};
	
	return ListModel.find(search).select("name itemOne itemTwo").exec(callback);
};

ListModel = mongoose.model('List', ListSchema);


module.exports.ListModel = ListModel;
module.exports.ListSchema = ListSchema;