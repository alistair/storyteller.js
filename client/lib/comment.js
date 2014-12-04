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

module.exports = Comment;