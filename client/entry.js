var React = require("React");
var FakeThing = require("./components/FakeThing");

React.renderComponent(
  FakeThing({text:"Hello from a React component!"}),
  document.getElementById('main')
);