/** @jsx React.DOM */

var React = require("react");
var StepAdderPlaceHolder = require('./step-adder-placeholder');
var StepAdder = require('./step-adder');

module.exports = React.createClass({
	buildSelector: function(){
		if (this.props.subject.active){
			

			return StepAdder({holder: this.props.subject});
		}

		return StepAdderPlaceHolder({holder: this.props.subject.id, text: 'add sections or comments...'});
	},

	render: function(){
		var selector = this.buildSelector();

		var headerClass = "";
		if (this.props.subject.active){
			headerClass = "text-primary";
		}

		return (
			<div id={this.props.subject.id}>
			    <h3 className={headerClass}>{this.props.title}</h3>
			    <hr />
			    {this.props.components}
			    {selector}
			</div>
		);
	}
});