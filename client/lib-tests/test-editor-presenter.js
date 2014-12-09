var expect = require('chai').expect;
var StubLoader = require('./stub-loader');
var Promise = require('bluebird');
var EditorPresenter = require('./../lib/editor-presenter');
var Specification = require('./../lib/specification');
var ObjectMother = require('./object-mother');
var changes = require('./../lib/change-commands');
var Postal = require('postal');

function Component(inner){
	this.setState = function(state){
		if (!inner.state){
			inner.state = {};
		}

		for (var key in state){
			inner.state[key] = state[key];
		}
	}
}

function FakeShell(){
	this.placeIntoMain = function(component){
		this.mainComponent = component;
		return new Component(component);
	}

	this.placeIntoMenu = function(component){
		this.menuComponent = component;
		return new Component(component);
	}

	this.showLoading = function(message){
		this.loadingMessage = message;
	}

	this.hideLoading = function(){
		this.hidLoading = true;
	}
}

var loader = new StubLoader();

describe('EditorPresenter', function(){

	beforeEach(function(){
		Postal.reset();
	})

	describe('when activating a new editor', function(){
		var spec = ObjectMother.specification();
		spec.path = 'foo/bar';

		var presenter = new EditorPresenter(spec);

		var shell = new FakeShell();

		before(function(){
			presenter.activate(loader, shell);
			presenter.deactivate();
		});


		it('should place the editor menu in the shell', function(){
			expect(shell.menuComponent).to.deep.equal({
				type: 'editorMenu',
				props: {
					specId: spec.id,
					specPath: spec.path,
					presenter: presenter
				},
				state: {
					undoEnabled: false,
					redoEnabled: false
				}
			});
		});

		it('should place the editor itself in the main pane', function(){
			expect(shell.mainComponent.type).to.deep.equal('specChrome');
		});

		it('should add the specification editor', function(){
			expect(shell.mainComponent.state.editor.type).to.equal('specEditor');
		});

		it('should make the specification itself be the active section by default', function(){
			expect(shell.mainComponent.state.activeContainer).to.equal(spec);

			expect(presenter.activeHolder).to.equal(spec);
		});

		it('the spec should be marked as active', function(){
			expect(spec.active).to.be.true;
		});
	});

	describe('when responding to a cell selected from the initial state', function(){
		// var identifier = {step: this.props.id, cell: this.props.cell.key};

		var spec = null;
		var presenter = null;
		var shell = null;

		beforeEach(function(){
			spec = ObjectMother.specification();
			spec.path = 'foo/bar';

			shell = new FakeShell();
			presenter = new EditorPresenter(spec);
			presenter.activate(loader, shell);

			var stepId = spec.steps[0].steps[1].id;

			presenter.selectCell({step: stepId, cell: 'x'});
		});

		it('should make the right cell active', function(){
			expect(spec.steps[0].steps[1].args.find('x').editing).to.be.true;
		});

		it('should make the section holding that cell active', function(){
			expect(spec.steps[0].active).to.equal(true);
		});

		it('should make the specfication itself not active', function(){
			expect(spec.active).to.be.false;
		});

		it('should update the editor state', function(){
			expect(shell.mainComponent.state.activeContainer).to.equal(spec.steps[0]);
		});
	});

	describe('when responding to a cell selected from the initial state via Postal', function(){
		// var identifier = {step: this.props.id, cell: this.props.cell.key};

		var spec = null;
		var presenter = null;
		var shell = null;

		beforeEach(function(){
			spec = ObjectMother.specification();
			spec.path = 'foo/bar';

			shell = new FakeShell();
			presenter = new EditorPresenter(spec);
			presenter.activate(loader, shell);

			var stepId = spec.steps[0].steps[1].id;

			Postal.publish({
				channel: 'editor',
				topic: 'select-cell',
				data: {step: stepId, cell: 'x'}
			})
		});

		it('should make the right cell active', function(){
			expect(spec.steps[0].steps[1].args.find('x').editing).to.be.true;
		});

		it('should make the section holding that cell active', function(){
			expect(spec.steps[0].active).to.equal(true);
		});

		it('should make the specfication itself not active', function(){
			expect(spec.active).to.be.false;
		});

		it('should update the editor state', function(){
			expect(shell.mainComponent.state.activeContainer).to.equal(spec.steps[0]);
		});
	});

	describe('when responding to a cell selected that is different', function(){
		// var identifier = {step: this.props.id, cell: this.props.cell.key};

		var spec = null;
		var presenter = null;
		var shell = null;

		beforeEach(function(){
			spec = ObjectMother.specification();
			spec.path = 'foo/bar';

			shell = new FakeShell();
			presenter = new EditorPresenter(spec);
			presenter.activate(loader, shell);

			var stepId = spec.steps[0].steps[1].id;

			presenter.selectCell({step: spec.steps[0].steps[1].id, cell: 'x'});
			presenter.selectCell({step: spec.steps[0].steps[4].id, cell: 'result'});
		});

		it('should make the right cell active', function(){
			expect(spec.steps[0].steps[4].args.find('result').editing).to.be.true;
		});

		it('should make the previously selected cell be inactive', function(){
			expect(spec.steps[0].steps[1].args.find('x').editing).to.be.false;
		});

		it('should make the section holding that cell active', function(){
			expect(spec.steps[0].active).to.equal(true);
		});

		it('should update the editor state', function(){
			expect(shell.mainComponent.state.activeContainer).to.equal(spec.steps[0]);
		});
	});

	describe('when handling a spec change directly', function(){
		var spec = null;
		var presenter = null;
		var shell = null;

		beforeEach(function(){
			spec = ObjectMother.specification();
			spec.path = 'foo/bar';

			shell = new FakeShell();
			presenter = new EditorPresenter(spec);
			presenter.activate(loader, shell);

			var stepId = spec.steps[0].steps[1].id;

			presenter.applyChange(changes.cellValue(stepId, 'x', 11));

			presenter.deactivate();
		});

		it('should update the undo/redo button states', function(){
			expect(shell.menuComponent.state).to.deep.equal({
				undoEnabled: true,
				redoEnabled: false
			});
		});

		it('should apply the change to the spec itself', function(){
			expect(spec.steps[0].steps[1].findValue('x')).to.equal(11);
		});
	});

	describe('when handling multiple spec changes', function(){
		var spec = null;
		var presenter = null;
		var shell = null;
		var step = null;

		beforeEach(function(){
			spec = ObjectMother.specification();
			spec.path = 'foo/bar';

			shell = new FakeShell();
			presenter = new EditorPresenter(spec);
			presenter.activate(loader, shell);

			step = spec.steps[0].steps[1];


			var showQueue = function(){
				for (var i = 0; i < spec.undoList.length; i++){
					console.log((i + 1).toString() + ": " + JSON.stringify(spec.undoList[i]));
				}

				console.log('');
				console.log('');
			}

			presenter.applyChange(changes.cellValue(step.id, 'x', 11));
			presenter.applyChange(changes.cellValue(step.id, 'x', 12));	
			presenter.applyChange(changes.cellValue(step.id, 'x', 13));
			expect(presenter.spec.changeStatus()).to.deep.equal({applied: 3, unapplied: 0});
		});

		afterEach(function(){
			presenter.deactivate();
		});

		it('should update the undo/redo button states', function(){
			expect(shell.menuComponent.state).to.deep.equal({
				undoEnabled: true,
				redoEnabled: false
			});
		});

		it('can apply an undo', function(){
			presenter.undo();

			expect(shell.menuComponent.state).to.deep.equal({
				undoEnabled: true,
				redoEnabled: true
			});

			expect(step.findValue('x')).to.equal(12);
		});

		it('undos all queued changes', function(){
			presenter.undo();
			presenter.undo();
			presenter.undo();


			expect(shell.menuComponent.state).to.deep.equal({
				undoEnabled: false,
				redoEnabled: true
			});

			expect(presenter.spec.changeStatus()).to.deep.equal({applied: 0, unapplied: 3});
			expect(step.findValue('x')).to.equal(5);

		});

		it('can undo and redo changes', function(){
			presenter.undo();
			presenter.undo();

			presenter.redo();

			expect(shell.menuComponent.state).to.deep.equal({
				undoEnabled: true,
				redoEnabled: true
			});

			expect(step.findValue('x')).to.equal(12);
		});

	});

	describe('when handling a spec change from Postal subscription', function(){
		var spec = null;
		var presenter = null;
		var shell = null;

		before(function(){
			spec = ObjectMother.specification();
			spec.path = 'foo/bar';

			shell = new FakeShell();
			presenter = new EditorPresenter(spec);
			presenter.activate(loader, shell);

			var stepId = spec.steps[0].steps[1].id;

			Postal.publish({
				channel: 'editor',
				topic: 'changes',
				data: changes.cellValue(stepId, 'x', 11)
			});
		});

		after(function(){
			presenter.deactivate();
		});

		it('should update the undo/redo button states', function(){
			expect(shell.menuComponent.state).to.deep.equal({
				undoEnabled: true,
				redoEnabled: false
			});
		});

		it('should apply the change to the spec itself', function(){
			expect(spec.steps[0].steps[1].findValue('x')).to.equal(11);
		});
	});
});