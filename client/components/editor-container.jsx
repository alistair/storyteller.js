/** @jsx React.DOM */

var React = require("react");
var StepAdderPlaceHolder = require('./step-adder-placeholder');
var StepAdder = require('./step-adder');

module.exports = React.createClass({
	buildSelector: function(){
		if (this.props.subject.active){
			

			return StepAdder({holder: this.props.subject});
		}

		return StepAdderPlaceHolder({holder: this.props.subject.id});
	},

	render: function(){
		var selector = this.buildSelector();

		var panelClass = "panel panel-default";
		if (this.props.subject.active){
			panelClass = "panel panel-primary";
		}

		return (
			<div className={panelClass} id={this.props.subject.id}>
			  <div className="panel-heading">
			    <h3 className="panel-title">{this.props.title}</h3>
			  </div>
			  <div className="panel-body">
			    {this.props.components}
			    {selector}
			  </div>
			</div>
		);
	}
});