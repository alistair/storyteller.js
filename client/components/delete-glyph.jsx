/** @jsx React.DOM */

var React = require("react");
var Postal = require('postal');
var changes = require('./../lib/change-commands');

module.exports = React.createClass({
	render: function(){
		var src = 'client/public/images/delete.png';

		var step = this.props.step;

		var onclick = function(){
console.log('got the onclick for the delete glyph');

			Postal.publish({
				channel: 'editor',
				topic: 'remove-step',
				data: changes.stepRemoved(step.parent, step)
			});
		}

		return (
			<img src={src} className="delete" height="20" width="20" title="Remove this step or section" onClick={onclick}/>
		);
	}
});
