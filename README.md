storyteller.js
==============

Author executable specifications with the business now, automate them later

See the [wiki for more information](https://github.com/jeremydmiller/storyteller.js/wiki).

There isn't much to see here yet, but this repository will be a rewrite of the [Storyteller2](https://github.com/DarthFubuMVC/StoryTeller2) tool in .Net. The current thinking
is:
 
* Build a much better user interface than the existing WPF client and make it decoupled from the actual test engine
* Users will be able to specify and design the test or specification language in the UI client instead of only depending on the test engine to "project" the test to a display. The goal here is to make the tool much more suitable for writing specifications upfront than the existing tooling.
* Create a JSON API to communicate between the UI client and the actual test engine(s) so that the UI could be used against multiple platforms.
* Retrofit the new UI client onto the existing .Net Storyteller2 engine in order to reuse existing specs and fixture
* Build an option to host the test engine, UI, and specifications in a remote web server for non-technical users who might not have access to the source of a project but still want to review, edit, or run specifications.




Proposed Tooling
================
* Node.js as the web server -- assuming the presence of >0.11 for harmony generators
* Koa.js as the web framework 
* React.js, jquery, lodash, and Bootstrap on the client side
* Browserify for script loading
* Gulp for all build automation
* Mocha and Karma for testing

We have also proposed the usage of [Atom Shell](https://github.com/atom/atom-shell) to make the UI a Chrome plugin. 

I'm personally fine with using straight up Javascript, but I'm open to using either Traceur or CoffeeScript.

- Jeremy
