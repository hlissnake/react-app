var React = require('react');

var BusinessCard = React.createClass({displayName: "BusinessCard",

	shouldComponentUpdate : function(nextProps, nextState){
		return this.props.contact.username != nextProps.contact.username;
	},

	render : function(){
		var contact = this.props.contact;
		if(contact) {
			return (
				React.createElement("div", {className: "business-card"}, 
					React.createElement("div", {className: "business-left"}, 
						React.createElement("div", {className: "name"}, contact.name)
					), 
					React.createElement("div", {className: "business-right"}, 
						React.createElement("div", {className: "company"}, contact.company.name), 
						React.createElement("div", {className: "phrase"}, contact.company.catchPhrase), 
						React.createElement("div", {className: "phone"}, contact.phone), 
						React.createElement("div", {className: "email"}, contact.email), 
						React.createElement("div", {className: "website"}, contact.website)
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