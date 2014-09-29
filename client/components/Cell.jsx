/** @jsx React.DOM */

/*
cell = {
	key: '',
	description: '',
	default: '',
	editor: 'select', 'text', 'number' -- later --> date, time, big-text, radio(?), typeahead(?)
	options: ['', ''] or [{key: '', display: ''}]
}

result = {
	status: ok, success, failure, error,
	error: '',
	actual: ''
}

props = {
	cell: {},
	value: '',
	result: {},
	callback: function(val){},
	changed: true/false

}

Editor
------
buildEditor(cell, value, callback) : component

*/

var React = require("react");
var builders = require("./builders");


module.exports = React.createClass({
	getInitialState: function(){
		return {editing: false};
	},

	render: function(){
		var classes = ['cell'];
		var builderType = this.props.cell.type || 'text';
		var builder = builders[builderType];
		if (!builder){
			throw new Error("Unable to find a cell builder strategy for '" + builderType + "'");
		}

		if (this.props.changed){
			classes.push('changed');
		}

		if (this.state.editing){
			throw 'I do not know how to edit yet';
		}

		var text = null;
		var raw = this.props.value || this.props.cell.default;

		if (this.props.value == null && !this.props.cell.default){
			classes.push('missing');
			text = '[' + this.props.cell.key + ']';
		}
		else {
			text = builder.display(this.props.cell, raw);
		}


		if (this.props.result){
			var status = this.props.result.status || 'ok';

			if (status == 'ok'){

			}
			else if (status == 'failed'){
				classes.push('failed');
				text = text + ', but was ' + builder.display(this.props.cell, this.props.result.actual);
			}
			else if (status == 'success'){
				classes.push('success');
			}
			else if (status == 'error'){
				return (
					<button type="button" 
						className="cell btn btn-warning" data-toggle="popover" 
						title="Error!" 
						data-content={this.props.result.error}>{raw}</button>
				);
			}
		}


		return (
			<span className={classes.join(' ')} title={this.props.cell.description || this.props.cell.key}>{text}</span>
		)
	}
});

