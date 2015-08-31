var React = require('react');

var BusinessCard = React.createClass({

	shouldComponentUpdate : function(nextProps, nextState){
		return this.props.contact.username != nextProps.contact.username;
	},

	render : function(){
		var contact = this.props.contact;
		if(contact) {
			return (
				<div className="business-card">
					<div className="business-left">
						<div className="name">{contact.name}</div>
					</div>
					<div className="business-right">
						<div className="company">{contact.company.name}</div>
						<div className="phrase">{contact.company.catchPhrase}</div>
						<div className="phone">{contact.phone}</div>
						<div className="email">{contact.email}</div>
						<div className="website">{contact.website}</div>
					</div>
				</div>
			)
		} else {
			return (
				<div className="business-card">Please select an contact item</div>
			)
		}
	}
});

module.exports = BusinessCard;