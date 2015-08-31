var React = require('react');

var ContactItem = React.createClass({

	onClickHandler : function(){
		this.props.onSelect(this.props.data);
	},

	render : function(){
		return (
			<div className="contact-item" onClick={this.onClickHandler}>
				{this.props.data.name}
			</div>
		)
	}

});

module.exports = ContactItem;