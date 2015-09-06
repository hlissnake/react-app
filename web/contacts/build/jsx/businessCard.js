var React = require('react');

var BusinessCard = React.createClass({displayName: "BusinessCard",

	// componentDidMount : function(){
	// 	ContactsStore.on('contact-item-select', function(contactItem){
	// 		this.setState({
	// 			contact : contactItem
	// 		})
	// 	}.bind(this));
	// },

	shouldComponentUpdate : function(nextProps, nextState){
		return this.props.contact != nextProps.contact;
	},

	render : function(){
		var contact = this.props.contact;
		if(contact) {
			return (
				React.createElement("div", {className: "business-card"}, 
					React.createElement("div", {className: "business-left"}, 
						React.createElement("div", {className: "name"}, contact.get('name'))
					), 
					React.createElement("div", {className: "business-right"}, 
						React.createElement("div", {className: "company"}, contact.get('company').name), 
						React.createElement("div", {className: "phrase"}, contact.get('company').catchPhrase), 
						React.createElement("div", {className: "phone"}, contact.get('phone')), 
						React.createElement("div", {className: "email"}, contact.get('email')), 
						React.createElement("div", {className: "website"}, contact.get('website'))
					)
				)
			)
		} else {
			return (
				React.createElement("div", {className: "business-card"}, "Please select an contact item")
			)
		}
	}
});

module.exports = BusinessCard;