/** @jsx React.DOM */

var React = require("react");


var builders = {
	add: function(key, strategy){
		if (typeof(strategy) === 'function'){
			this[key] = {
				edit: strategy,
				display: function(cell, value){
					if (value == null) return 'NULL';

					return value.toString();
				}
			}
		}
		else {
			this[key] = strategy;
		}
	},

	toEditor: function(arg){
		var builder = this[arg.cell.editor];
		return builder.edit(arg);
	},

	toText: function(arg){
		var builder = this[arg.cell.editor];
		return builder.display(arg);
	}
};

builders.add('text', function(arg){
	// TODO -- needs to broadcast a cell change event
	// TODO -- need to take in the step id

	return (
		<input type="text" value={arg.value} />
	);
});

builders.get = function(type){
	if (!type) type = 'text';

	var builder = this[type];
	if (!builder){
		throw new Error("Unable to find a cell builder strategy for '" + builderType + "'");
	}

	return builder;
}


module.exports = builders;