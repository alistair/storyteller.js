var expect = require('chai').expect;
var StubLoader = require('./stub-loader');
var Promise = require('bluebird');
var EditorPresenter = require('./../lib/editor-presenter');
var Specification = require('./../lib/specification');
var ObjectMother = require('./object-mother');

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
0.) make a new test mother that returns a completely built Specification
1.) activate places the editor
2.) activate places the menu
3.) sets the state on the menu for the initial undo state
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

describe('EditorPresenter', function(){
	describe('when activating a new editor', function(){
		var spec = ObjectMother.specification();
		spec.path = 'foo/bar';

		var loader = new StubLoader();

		var presenter = new EditorPresenter(spec);

		var shell = new FakeShell();

		before(function(){
			presenter.activate(loader, shell);
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
	});
});