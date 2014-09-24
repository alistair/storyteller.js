var React = require("react");
var Cell = require("./components/Cell");
var $ = require("jquery");

React.renderComponent(
  Cell({value:"Who dat?"}),
  document.getElementById('main')
);