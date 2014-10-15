function Specification(data, library){
	this.title = data.title;
	this.steps = [];

	for (var i = 0; i < data.steps.length; i++){
		this.steps[i] = library.buildStep(data.steps[i]);
	}
}

module.exports = Specification;