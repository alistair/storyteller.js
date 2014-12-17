/** @jsx React.DOM */
var React = require("react");
var Postal = require('postal');
var changes = require('./../lib/change-commands');

var AddStepItem = React.createClass({
	render: function(){
		var holder = this.props.holder;
		var grammar = this.props.grammar;

		var onclick = function(){
			var step = grammar.newStep();
			var message = changes.stepAdded(holder, step);

			Postal.publish({
				channel: 'editor',
				topic: 'changes',
				data: message
			});
		}

		return (
			<a 
				href="#" 
				data-key={this.props.grammar.key} 
				onDoubleClick={onclick} 
				className="list-group-item add-step">{this.props.grammar.title}</a>
		);
	}
});


module.exports = React.createClass({
	render: function(){
		var holder = this.props.holder;

		var components = holder.grammars().map(function(grammar){
			return AddStepItem({grammar: grammar, holder: holder});
		});

		return (
			<div className="list-group">
				{components}
			</div>
		);
	}
});