var Postal = require('postal');

var applyOutstandingChanges = function(){
	// If any thing is open, pack it in now
	Postal.publish({
		channel: 'editor',
		topic: 'apply-changes',
		data: {}
	});
}

function EditorPresenter(spec){
	this.spec = spec;
	this.latched = false;

	var self = this;
}

EditorPresenter.prototype.deactivate = function(){
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
		activeContainer: this.spec.activeHolder,
		editor: this.spec.editor(this.loader),
		outline: this.spec.outline()
	});
}

EditorPresenter.prototype.activate = function(loader, shell){
	this.loader = loader;
	this.editor = shell.placeIntoMain(loader.specChrome());

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
				if (!data.step){
					return;
				}

		        self.selectCell(data);
		    }
		}),
		Postal.subscribe({
			channel: 'editor',
			topic: 'select-holder',
		    callback : function(data, envelope) {
				if (!data.holder){
					return;
				}

		        self.selectHolder(data);
		    }
		}),
		Postal.subscribe({
			channel: 'editor',
			topic: 'changes',
		    callback : function(data, envelope) {
		        self.applyChange(data);
		    }
		}),
		Postal.subscribe({
			channel: 'editor',
			topic: 'add-step',
		    callback : function(data, envelope) {
		        self.applyChange(data);
		        self.refreshEditor();
		    }
		})
	];

	this.enableUndoButtons();
}

EditorPresenter.prototype.selectCell = function(data){
	applyOutstandingChanges();

	this.spec.selectCell(data.step, data.cell);

	this.refreshEditor();
}

EditorPresenter.prototype.selectHolder = function(data){
	this.spec.selectHolder(data.holder);

	this.refreshEditor();
}

EditorPresenter.prototype.applyChange = function(data){
	this.spec.apply(data);
	this.enableUndoButtons();
}

EditorPresenter.prototype.undo = function(){
	this.spec.undo();
	this.enableUndoButtons();
	this.refreshEditor();
}

EditorPresenter.prototype.redo = function(){
	this.spec.redo();
	this.enableUndoButtons();
	this.refreshEditor();
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