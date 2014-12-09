var Postal = require('postal');

// TODO -- have the presenter built via a promise!
function EditorPresenter(spec){
	this.spec = spec;

	var self = this;



}

EditorPresenter.prototype.deactivate = function(){
	// tear down the view, release itself from Postal

	// returns a promise?

	this.subscriptions.forEach(function(x){
		x.unsubscribe();
	});
}

EditorPresenter.prototype.enableUndoButtons = function(){
	var counts = this.spec.changeStatus();
	var state = {
		undoEnabled: (counts.applied > 0),
		redoEnabled: (counts.unapplied > 0)
	}

	this.menu.setState(state);
}

EditorPresenter.prototype.activate = function(loader, shell){
	this.editor = shell.placeIntoMain(this.spec.editor(loader));
	this.menu = shell.placeIntoMenu(loader.editorMenu({
		specId: this.spec.id,
		specPath: this.spec.path
	}));

	this.subscriptions = [
		Postal.subscribe({
			channel: 'editor',
			topic: 'select-cell',
		    callback : function(data, envelope) {
		        self.selectCell(data);
		    }
		}),
		Postal.subscribe({
			channel: 'editor',
			topic: 'changes',
		    callback : function(data, envelope) {
		        self.applyChange(data);
		    }
		})
	];

	this.enableUndoButtons();
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