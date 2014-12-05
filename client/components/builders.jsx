/** @jsx React.DOM */

var React = require("react");
var changes = require('./../lib/change-commands');
var Postal = require('postal');

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

var CellTextBox = React.createClass({
	getInitialState: function() {
		return {value: this.props.value};
	},

	handleChange: function(event) {
		this.setState({value: event.target.value});

		var arg = this.props;

		var cellChanged = changes.cellValue(arg.id, arg.cell, event.target.value);

		Postal.publish({
			channel: 'editor',
			topic: 'changes',
			data: cellChanged
		});
	},

	render: function(){
		return (
			<input type="text" value={this.state.value} onChange={this.handleChange} />
		);
	}
});

builders.add('text', function(arg){
	return CellTextBox(arg);
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