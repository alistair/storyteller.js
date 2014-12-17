var React = require('react');
var expect = require('chai').expect;
var StepAdder = require('./../client/components/step-adder');
var ObjectMother = require('./../client/lib-tests/object-mother');
var $ = require('jquery');
var Postal = require('postal');

var listener = {
	events: [],

	clear: function(){
		this.events = [];
	},

	append: function(data){
		console.log('GOT DATA: ' + JSON.stringify(data));

		this.events.push(data);
	}
};

Postal.subscribe({
    channel  : "editor",
    topic    : "add-step",
    callback : function(data, envelope) {
    	console.log('GOT SUBSCRIPTION IN POSTAL: ' + JSON.stringify(envelope));
        listener.append(data);
    }
});

function singleEventReceivedShouldBe(expected){
	expect(listener.events.length).to.equal(1);
	expect(listener.events[0]).to.deep.equal(expected);
}

describe.only('The StepAdder component', function(){
	beforeEach(function(){
		listener.clear();
	});

	var spec = ObjectMother.specification();

	it('can render for a specification', function(){
		var div = document.createElement('div');

		var adder = StepAdder({holder: spec});

		React.renderComponent(adder, div);

		var keys = $('a.add-step', div).map(function(){
			return $(this).attr('data-key');
		}).get();

		expect(keys).to.deep.equal(['Math', 'Zork']);
	});

	/* Can't get the double click to fire somehow
	it('publishes the add step on double click in specification', function(){
		$('<div id="add-step-holder"></div>').appendTo(document.body).get(0);
		var div = $('#add-step-holder').get(0);

		var adder = StepAdder({holder: spec});

		React.renderComponent(adder, div);

		var search = $('a.add-step[data-key=Math]', div);
		search.css("background", "green");
		expect(search.length).to.equal(1);

		search.dblclick();

		expect(listener.events.length).to.equal(1);
	});
*/

	it('can render for a section', function(){
		var div = document.createElement('div');
		var section = spec.findByPath('0');

		var adder = StepAdder({holder: section});

		React.renderComponent(adder, div);

		var keys = $('a.add-step', div).map(function(){
			return $(this).attr('data-key');
		}).get();

		expect(keys).to.deep.equal(['Add', 'Adding', 'StartWith', 'Subtract', 'TheResultShouldBe']);
	});

/*
	it('publishes the add step on double click in section', function(){
		$('<div id="add-step-holder-2"></div>').appendTo(document.body).get(0);
		var div = $('#add-step-holder-2').get(0);

		var adder = StepAdder({holder: spec.steps[0]});

		React.renderComponent(adder, div);

		var search = $('a.add-step[data-key=Add]', div);

		search.css("background", "brown");

		expect(search.length).to.equal(1);

		search.trigger('dblclick');

		expect(listener.events.length).to.equal(1);
	});
*/
});