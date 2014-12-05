var StepHolder = require('./step-holder');

function Specification(data, library){
	StepHolder.call(this, data.id);

	this.title = data.title;

	this.type = 'specification';

	this.readSteps(data, library);

	this.children = function(){
		return this.steps;
	}

	this.write = function(){
		return {
			title: this.title,
			steps: this.writeSteps()
		}
	}

	this.pack = function(){
		return {
			steps: this.packSteps()
		}
	}

	// TODO -- only spiked, needs tests
	this.preview = function(loader){
		var components = this.buildComponents(function(x){
			return x.preview(loader);
		});

		var props = {title: this.title, components: components};

		var component = loader.specPreview(props);

		return component;
	}

	this.editor = function(loader){
		var components = this.buildComponents(function(x){
			return x.editor(loader);
		});

		var props = {title: this.title, components: components};

		var component = loader.specEditor(props);

		return component;
	}
}

module.exports = Specification;