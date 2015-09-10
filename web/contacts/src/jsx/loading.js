var React = require('react');

var Loading = React.createClass({

	render : function(){
		return (
			<div className={(this.props.load ? 'loading-icon show' : 'hide')}></div>
		)
	}
});

module.exports = Loading;