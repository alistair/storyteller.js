var FixtureLibrary = require('./fixture-library');
var Specification = require('./specification');

function SpecificationDataStore(){
	this.spec = null;
	this.steps = {};
	this.library = null;


	this.activateFixtures = function(fixtures){
		// TODO -- make this be more selective later?
		this.library = new FixtureLibrary(fixtures);
	}

	this.loadSpecification = function(data){
		this.spec = new Specification(data, this.library);
		var steps = {};

		var readHolder = function(holder){
			steps[holder.id] = holder;

			var children = holder.children();
			for (var i = 0; i < children.length; i++){
				readHolder(children[i]);
			}
		}

		readHolder(this.spec);

		this.steps = steps;
	}



	this.find = function(id){
		return this.steps[id];
	}
}

module.exports = SpecificationDataStore;