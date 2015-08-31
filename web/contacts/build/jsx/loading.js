var React = require('react');

var Loading = React.createClass({displayName: "Loading",

	render : function(){
		return (
			React.createElement("div", {className: "loading-icon " + (this.props.load ? 'show' : 'hide')})
		)
	}
});

module.exports = Loading;