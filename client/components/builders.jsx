/** @jsx React.DOM */

var React = require("react");
var changes = require('./../lib/change-commands');
var Postal = require('postal');

var CellTextBox = require('./textbox-editor');

// think this ends up being very similar to component-loaders
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
	return CellTextBox({arg: arg});
});

builders.add('comment', function(arg){
	return CellTextBox({arg: arg, className: 'form-control'});
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