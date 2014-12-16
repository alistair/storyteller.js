var $ = require('jquery');
var React = require('react');

// Use the jquery search here to get the first match to make
// some automated testing scenarios easier


function Shell(container){
	this.placeIntoMain = function(component){
		var pane = $('.main-pane', container).get(0);
		React.unmountComponentAtNode(pane);
		this.mainComponent = React.renderComponent(component, pane);

		return this.mainComponent;
	}

	this.placeIntoMenu = function(component){
		var pane = $('.menu-pane', container).get(0);
		React.unmountComponentAtNode(pane);
		this.menuComponent = React.renderComponent(component, pane);

		return this.menuComponent;
	}

	this.showLoading = function(message){
		// TODO -- later
	}

	this.hideLoading = function(){
		// TODO -- later
	}

	this.navigateToScreen = function(){
		// TODO -- later
	},

	this.tearDown = function(){
		React.unmountComponentAtNode($('.main-pane', container).get(0));
		React.unmountComponentAtNode($('.menu-pane', container).get(0));
	}

	this.setTestTitle = function(text){
		$('.test-title', container).html(text);
	}
}

module.exports = Shell;