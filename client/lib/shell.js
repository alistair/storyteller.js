var $ = require('jquery');
var React = require('react');

var menuPane = 

module.exports = {
	placeIntoMain: function(component){
		var pane = document.getElementById('main-pane');
		this.mainComponent = React.renderComponent(component, pane);

		return this.mainComponent;
	},

	placeIntoMenu: function(component){
		var pane = document.getElementById('menu-pane');
		this.menuComponent = React.renderComponent(component, pane);

		return this.menuComponent;
	},

	showLoading: function(message){
		// TODO -- later
	},

	hideLoading: function(){
		// TODO -- later
	},

	navigateToScreen: function(){
		// TODO -- later
	}




}