/** @jsx React.DOM */
var React = require("react");
var builders = require("./builders");
var Arg = require('./../lib/arg');

// TODO -- split this up a little bit
module.exports = React.createClass({
	getInitialState: function(){
		return {editing: false};
	},

	createText: function(classes, builder, raw){
		if (Arg.isMissing(this.props)){
			classes.push('missing');
			return '[' + this.props.cell.key + ']';
		}
		else {
			return builder.display(this.props.cell, raw);
		}
	},

	hasError: function(){
		return this.hasResults() && this.props.result.status == 'error';
	},

	buildErrorDisplay: function(raw){
		return (
			<button type="button" 
				className="cell btn btn-warning" data-toggle="popover" 
				title="Error!" 
				data-content={this.props.result.error}>{raw}</button>
		);
	},

	hasResults: function(){
		return this.props.result != null;
	},

	applyResultsToDisplay: function(text, classes, builder){
		var status = this.props.result.status || 'ok';

		if (status == 'ok'){
			// nothing
		}
		else if (status == 'failed'){
			classes.push('failed');
			return text + ', but was ' + builder.display(this.props.cell, this.props.result.actual);
		}
		else if (status == 'success'){
			classes.push('success');
		}

		return text;
	},

	render: function(){
		var classes = ['cell'];
		var builder = builders.get(this.props.cell.type);

		if (this.props.changed){
			classes.push('changed');
		}

		if (this.state.editing){
			throw 'I do not know how to edit yet';
		}

		var raw = this.props.value;

		if (this.hasError()){
			return this.buildErrorDisplay(raw);
		};

		var text = this.createText(classes, builder, raw);

		if (this.hasResults()){
			text = this.applyResultsToDisplay(text, classes, builder);
		}


		return (
			<span className={classes.join(' ')} title={this.props.cell.description || this.props.cell.key}>{text}</span>
		)
	}
});

