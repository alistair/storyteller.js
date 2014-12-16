/** @jsx React.DOM */
var React = require("react");
var Postal = require('postal');
var changes = require('./../lib/change-commands');

var AddStepItem = React.createClass({
	render: function(){
		var holder = this.props.holder;

		var onclick = function(){
			var step = this.props.grammar.newStep();
			var message = changes.stepAdded(holder, step);

			Postal.publish({
				channel: 'editor',
				topic: 'changes',
				data: message
			});
		}

		return (
			<a href="#" onClick={onclick} className="list-group-item">{this.props.title}</a>
		);
	}
});


module.exports = React.createClass({
	render: function(){
		var holder = this.props.subject;

		var components = this.props.grammars.map(function(grammar){
			return AddStepItem({grammar: grammar, holder: holder});
		});

		return (
			<div className="list-group">
				{components}
			</div>
		);
	}
});