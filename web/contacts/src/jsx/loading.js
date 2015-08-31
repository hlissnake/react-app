var React = require('react');

var Loading = React.createClass({

	render : function(){
		return (
			<div className={"loading-icon " + (this.props.load ? 'show' : 'hide')}></div>
		)
	}
});

module.exports = Loading;