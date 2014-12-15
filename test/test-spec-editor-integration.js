var expect = require('chai').expect;
var $ = require('jquery');
var EditorPresenter = require('./../client/lib/editor-presenter');
var loader = require('./../client/components/component-loader');

function CellDriver(element){
	this.isTextbox = function(){
		throw 'not implemented';
	};

	this.isReadonly = function(){
		throw 'not implemented';
	};

	this.tabOff = function(){
		throw 'not implemented';
	};

	this.typeText = function(text){
		throw 'not implemented';
	};

	
}

describe('Editing a Specification Integration tests', function(){
	var spec = require('./../client/lib-tests/object-mother').specification();
	var shell = require('./../client/lib/shell');	

	var presenter = null;

	before(function(){
		$('<div><div id="menu-pane"></div><div id="main-pane"></div></div>').appendTo(document.body);
	});

	beforeEach(function(){
		presenter = new EditorPresenter(spec);
		presenter.activate(loader, shell);
	});

	afterEach(function(){
		presenter.deactivate();
	});

	function cellFor(position, cell){

	}


});