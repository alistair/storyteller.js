/** @jsx React.DOM */

var React = require("react");

module.exports = React.createClass({
	render: function(){
		var src = 'client/public/images/' + this.props.image;

		var onclick = this.props.onclick;
		if (!onclick){
			onclick = function(){};
		}

		return (
			<img src={src} onClick={onclick} height="25" width="25" title={this.props.title} />
		);
	}
});