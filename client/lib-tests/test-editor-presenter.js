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

/*
4.) call applyChange, makes the change. Also updates the menu state
5.) call selectCell from scratch
6.) call selectCell from a second state

MAY need to go into Step.findContainer()
  -- find section
  -- find the actual specification
  -- find a table (later)
  -- find an embedded section

  Step.isContainer() : bool
-- implement on Section, Specification, Step


*/

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
					specPath: spec.path
				},
				state: {
					undoEnabled: false,
					redoEnabled: false
				}
			});
		});

		it('should place the editor itself in the main pane', function(){
			expect(shell.mainComponent.type).to.deep.equal('specEditor');
		});

		it('should make the specification itself be the active section by default', function(){
			expect(shell.mainComponent.state).to.deep.equal({
				activeContainer: spec,
				activeCell: null 
			});
		});

		it('the spec should be marked as active', function(){
			expect(spec.active).to.be.true;
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

			console.log('Spec id is ' + spec.id);

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