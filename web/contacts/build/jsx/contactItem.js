var React = require('react');

var ContactItem = React.createClass({displayName: "ContactItem",

	onClickHandler : function(){
		this.props.onSelect(this.props.data);
	},

	render : function(){
		return (
			React.createElement("div", {className: "contact-item", onClick: this.onClickHandler}, 
				this.props.data.name
			)
		)
	}

});

module.exports = ContactItem;