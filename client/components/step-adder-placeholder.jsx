/** @jsx React.DOM */
var React = require("react");
var Postal = require('postal');

module.exports = React.createClass({
	render: function(){
		var holderId = this.props.holder;

		var onclick = function(e){
			Postal.publish({
				channel: 'editor',
				topic: 'select-holder',
				data: {holder: holderId}
			});

			e.preventDefault();
		}


		return (
			<a 
				data-holder={this.props.holder} 
				onClick={onclick}>{this.props.text}</a>
		);
	}
});