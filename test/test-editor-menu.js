var React = require('react');
var expect = require('chai').expect;
var EditorMenu = require('./../client/components/editor-menu');
var $ = require('jquery');

var listener = {
	events: [],

	clear: function(){
		this.events = [];
	},

	append: function(data){
		this.events.push(data);
	}
};


describe('The EditorMenu control', function(){
	var div = null;
	var menu = null;
	var undoButton = null;
	var redoButton = null;

	var presenter = {
		undoWasCalled: false,
		redoWasCalled: false,

		undo: function(){
			this.undoWasCalled = true;
		},

		redo: function(){
			this.redoWasCalled = true;
		}
	}

	var props = {specId: 11, specPath: 'The Spec Path', presenter: presenter};

	beforeEach(function(){
		listener.clear();
		div = null;
		menu = null;
		presenter.undoWasCalled = false;
		presenter.redoWasCalled = false;
	});

	function showControl(state){
		var menu = new EditorMenu(props);
		div = document.createElement('div');
		$(document.body).append(div);
		menu = React.renderComponent(menu, div);

		menu.setState(state);

		undoButton = $('#undo', div);
		redoButton = $('#redo', div);
	}

	it('renders with neither enabled', function(){
		showControl({undoEnabled: false, redoEnabled: false});

		expect(undoButton.get(0).disabled).to.be.true;
		expect(redoButton.get(0).disabled).to.be.true;
	});

	it('renders with only undo enabled', function(){
		showControl({undoEnabled: true, redoEnabled: false});

		expect(undoButton.get(0).disabled).to.be.false;
		expect(redoButton.get(0).disabled).to.be.true;
	});


	it('renders only redo enabled', function(){
		showControl({undoEnabled: false, redoEnabled: true});

		expect(undoButton.get(0).disabled).to.be.true;
		expect(redoButton.get(0).disabled).to.be.false;
	});

	it('renders with both enabled', function(){
		showControl({undoEnabled: true, redoEnabled: true});

		expect(undoButton.get(0).disabled).to.be.false;
		expect(redoButton.get(0).disabled).to.be.false;
	});

	it('clicking undo calls through', function(){
		showControl({undoEnabled: true, redoEnabled: true});
		undoButton.click();

		expect(presenter.undoWasCalled).to.be.true;
		expect(presenter.redoWasCalled).to.be.false;
	});

	it('clicking redo calls through', function(){
		showControl({undoEnabled: true, redoEnabled: true});
		redoButton.click();

		expect(presenter.undoWasCalled).to.be.false;
		expect(presenter.redoWasCalled).to.be.true;
	});
});