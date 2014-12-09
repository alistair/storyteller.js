var Postal = require('postal');

function EditorPresenter(spec){
	this.spec = spec;
	this.latched = false;
	this.activeHolder = null;
	this.activeCell = null;


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

EditorPresenter.prototype.refreshEditor = function(){
	this.editor.setState({
		activeContainer: this.activeHolder,
		editor: this.spec.editor(this.loader)
	});
}

EditorPresenter.prototype.activate = function(loader, shell){
	this.loader = loader;
	this.editor = shell.placeIntoMain(loader.specChrome());

	this.activeHolder = this.spec.determineActiveHolder();
	this.refreshEditor();


	this.menu = shell.placeIntoMenu(loader.editorMenu({
		specId: this.spec.id,
		specPath: this.spec.path,
		presenter: this
	}));

	

	var self = this;

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
	var step = this.spec.find(data.step);
	if (this.activeCell){
		this.activeCell.active = false;
	}

	this.activeHolder.active = false;
	this.activeHolder = step.parent || this.spec;
	this.activeHolder.active = true;
	this.activeCell = step.args.find(data.cell);
	this.activeCell.active = true;

	this.refreshEditor();
}

EditorPresenter.prototype.applyChange = function(data){
	this.spec.apply(data);
	this.enableUndoButtons();
}

EditorPresenter.prototype.undo = function(){
	this.spec.undo();
	this.enableUndoButtons();
}

EditorPresenter.prototype.redo = function(){
	this.spec.redo();
	this.enableUndoButtons();
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