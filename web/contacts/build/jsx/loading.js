var React = require('react');

var Loading = React.createClass({displayName: "Loading",

	render : function(){
		return (
			React.createElement("div", {className: (this.props.load ? 'loading-icon show' : 'hide')})
		)
	}
});

module.exports = Loading;