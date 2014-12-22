/** @jsx React.DOM */

var React = require("react");

module.exports = React.createClass({
	render: function(){
		var src = 'client/public/images/' + this.props.image;

		return (
			<img src={src} height="25" width="25" />
		);
	}
});