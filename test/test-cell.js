var React = require('react/addons');
var TU = require('react-test-utils');
var expect = require('chai').expect;

var Cell = require('./../client/components/Cell');


describe('Rendering a Cell without results', function(){

	it('should be okay', function(){

		var cell = new Cell({value: 'foo'});
		expect(window).to.not.be.null;
		
		var div = document.createElement('div');
		React.renderComponent(cell, div);

		//TU.renderIntoDocument(cell);


	});

});
