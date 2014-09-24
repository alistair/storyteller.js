var React = require("react");
var FakeThing = require("./components/FakeThing");
var $ = require("jquery");

React.renderComponent(
  FakeThing({text:"Hello from a React component!"}),
  document.getElementById('main')
);