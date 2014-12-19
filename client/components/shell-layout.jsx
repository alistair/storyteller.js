/** @jsx React.DOM */

var React = require("react");

// menu-pane
// main-pane

// props: {main: component, menu: component}



module.exports = React.createClass({
	getInitialState: function(){
		return {
			menu: React.DOM.span(null, 'the menu controls should be here'),
			main: React.DOM.span(null, 'the main component should be here')
		}
	},

	render: function(){



		return (
			<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		      <div class="container">
		        <div class="navbar-header">
		          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
		            <span class="sr-only">Toggle navigation</span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		            <span class="icon-bar"></span>
		          </button>
		          <a class="navbar-brand" href="#">Project name</a>
		        </div>
		        <div id="navbar" class="collapse navbar-collapse">
		          <ul class="nav navbar-nav">
		            <li class="active"><a href="#">Home</a></li>
		            <li><a href="#about">About</a></li>
		            <li><a href="#contact">Contact</a></li>
		          </ul>
		        </div>
		      </div>
		    </nav>
		);
	}
});