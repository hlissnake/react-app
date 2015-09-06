var React = require('react');

var BusinessCard = React.createClass({

	shouldComponentUpdate : function(nextProps, nextState){
		return this.props.contact != nextProps.contact;
	},

	render : function(){
		var contact = this.props.contact;
		if(contact) {
			return (
				<div className="business-card">
					<div className="business-left">
						<div className="name">{contact.get('name')}</div>
					</div>
					<div className="business-right">
						<div className="company">{contact.get('company').name}</div>
						<div className="phrase">{contact.get('company').catchPhrase}</div>
						<div className="phone">{contact.get('phone')}</div>
						<div className="email">{contact.get('email')}</div>
						<div className="website">{contact.get('website')}</div>
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