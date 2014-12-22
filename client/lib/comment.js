var uuid = require('node-uuid');
var Arg = require('./arg');
var Cell = require('./cell');

function Comment(data){
	var self = this;

	self.id = uuid.v4();

	var cell = new Cell('text', 'Textual comment');
	cell.editor = 'comment';

	self.arg = new Arg(cell, {cells: data}, self.id);

	return self;
}

Comment.prototype.children = function(){
	return [];
}

Comment.prototype.write = function(){
	return {text: this.arg.value, type: 'comment'}
}

Comment.prototype.pack = function(){
	return null;
}

Comment.prototype.preview = function(loader){
	throw new Error('Not implemented yet....');
}

Comment.prototype.editor = function(loader){
	return loader.commentEditor({step: this, arg: this.arg});
}

Comment.prototype.isHolder = function(){
	return false;
}

Comment.prototype.clearActiveState = function(){
	this.arg.active = false;
}

Comment.prototype.findByPath = function(path){
	if (path == 'text') return this.arg;

	return null;
}
	
module.exports = Comment;