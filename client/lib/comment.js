var uuid = require('node-uuid');

function Comment(text){
	var self = this;

	self.id = uuid.v4();
	self.text = text;

	self.changed = false;

	return self;
}

Comment.prototype.write = function(){
	return {text: this.text, type: 'comment'}
}

Comment.prototype.pack = function(){
	return null;
}

Comment.prototype.preview = function(loader){
	throw new Error('Not implemented yet....');
}

Comment.prototype.editor = function(loader){
	return loader.commentEditor(this);
}

Comment.prototype.isHolder = function(){
	return false;
}

Comment.prototype.clearActiveState = function(){
	// todo -- will do something in the future
}
	
module.exports = Comment;