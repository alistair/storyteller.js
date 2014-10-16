/** @jsx React.DOM */
var React = require("react");
var builders = require("./builders");
var Arg = require('./../lib/arg');
var Postal = require('postal');

var labelStatus = {
	ok: 'label-default',
	error: 'label-warning',
	failed: 'label-danger',
	success: 'label-success'
}

function CellDisplayState(raw, builder, cell, status){
	this.status = status;
	this.builder = builder;
	this.classes = ['cell'];
	this.raw = raw;

	if (raw){
		this.text = builder.display(cell, raw);
	}
	else{
		this.addClass('missing');
		this.text = '[' + cell.key + ']';
	}

	this.addClass('label');
	this.addClass(labelStatus[status]);
}

CellDisplayState.prototype.addClass = function(clazz){
	this.classes.push(clazz);
}

CellDisplayState.prototype.write = function(text){
	this.text = this.text + text;
}

CellDisplayState.prototype.writeActual = function(actual){
	this.write(', but was ');
	this.write(this.builder.display(this.cell, actual));
}



// TODO -- split this up a little bit
module.exports = React.createClass({
	getInitialState: function(){
		return {editing: false};
	},

	hasError: function(){
		return this.hasResults() && this.props.result.status == 'error';
	},

	buildErrorDisplay: function(state){
		return (
			<button type="button" 
				tabindex="0"
				className="cell btn btn-warning" data-toggle="popover" 
				title="Error!" 
				data-content={this.props.result.error}>{state.raw}</button>
		);
	},

	hasResults: function(){
		return this.props.result != null;
	},

	applyResultsToDisplay: function(state){
		if (state.status == 'failed'){
			state.writeActual(this.props.result.actual);
		}
	},

	render: function(){
		var builder = builders.get(this.props.cell.type);
		var status = Arg.status(this.props);

		var state = new CellDisplayState(
			this.props.value, 
			builder, 
			this.props.cell,
			status);


		if (this.hasError()){
			return this.buildErrorDisplay(state);
		};

		if (this.props.changed){
			state.addClass('changed');
		}

		if (this.state.editing){
			throw 'I do not know how to edit yet';
		}

		if (this.hasResults()){
			this.applyResultsToDisplay(state);
		}

		var subject = {step: this.props.id, cell: this.props.cell.key};

		var handleClick = function(){
			alert('Clicked on ' + JSON.stringify(subject));
		}

		return (
			<span 
				onClick={handleClick}
				tabIndex="0" 
				role="button"
				className={state.classes.join(' ')} 
				title={this.props.cell.description || this.props.cell.key}>{state.text}</span>
		)
	}
});

