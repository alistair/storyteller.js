var expect = require('chai').expect;
var Sentence = require('./../lib/sentence');
var Step = require('./../lib/step');
var EmbeddedSection = require('./../lib/embedded-section');

describe('EmbeddedSection', function(){
	var metadata = {
		type: 'embedded-section',
		key: 'DoMath',
		title: 'Doing some mathematics',
		fixture: require('./math-fixture-data'),
		collection: 'rows'
	};

	var stepData = {
		key: 'DoMath', cells: {}, collections: {
			rows: [
				{key: 'StartWith', cells: {x: 1}},
				{key: 'Add', cells: {x: 5}},
				{key: 'Subtract', cells: {x: 2}},
				{key: 'TheResultShouldBe', cells: {x: 4}},
				{key: 'Adding', cells:{x:1, y:2, result:3}}
			]
		}
	}

	//var embeddedSection = new EmbeddedSection(metadata);
	//var step = embeddedSection.buildStep(stepData);
});