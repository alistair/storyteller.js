var Postal = require('postal');
var SpecificationDataStore = require('./specification-data-store');

function EditorPresenter(view){
	this.view = view;
	this.dataStore = new SpecificationDataStore();

	var self = this;

	Postal.subscribe({
		channel: 'editor',
		topic: 'select-cell',
	    callback : function(data, envelope) {
	        self.selectCell(data);
	    }
	});

	Postal.publish({
		channel: 'editor',
		topic: 'changes',
	    callback : function(data, envelope) {
	        self.applyChange(data);
	    }
	});

}

EditorPresenter.prototype.tearDown = function(){
	// tear down the view, release itself from Postal
}

EditorPresenter.prototype.startEditing = function(data, library){
	this.dataStore.loadSpecification(data, library);
	this.view.updateSpec(this.dataStore.spec);
}

EditorPresenter.prototype.selectCell = function(data){
	// {step: id, cell: name}

	throw new Error('not yet implemented...');
}

EditorPresenter.prototype.applyChange = function(data){
	throw new Error('not yet implemented...');
}


/* LATER
EditorPresenter.prototype.reloadFixtures = function(library){
	throw new Error('not yet implemented...');
}

EditorPresenter.prototype.pack = function(){
	throw new Error('not yet implemented...');
}

EditorPresenter.prototype.write = function(){
	throw new Error('not yet implemented...');
}
*/


module.exports = EditorPresenter;