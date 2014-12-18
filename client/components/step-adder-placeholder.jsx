/** @jsx React.DOM */
var React = require("react");
var Postal = require('postal');

module.exports = React.createClass({
	render: function(){
		var onclick = function(e){
			Postal.publish({
				channel: 'editor',
				topic: 'select-holder',
				data: {holder: this.props.holder}
			});

			e.preventDefault();
		}


		return (
			<a onClick={onclick}>add steps...</a>
		);
	}
});