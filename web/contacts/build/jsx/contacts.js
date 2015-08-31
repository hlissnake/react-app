var React = require('react');
var ContactItem = require('./contactItem');

var Contacts = React.createClass({displayName: "Contacts",

	getInitialState : function(){
		return {
			loading : false	
		}
	},

	shouldComponentUpdate : function(nextProps, nextState){
		return !nextProps.loading;
	},

	render : function(){
		return (
			React.createElement("div", {className: "contact-list"}, 
				 this._getContactList() 
			)
		)
	},

	_getContactList : function(){
		return this.props.contacts.map(function(item, i){
			return (
				React.createElement(ContactItem, {data: item, onSelect: this.props.onSelect, key: i})
			)
		}.bind(this));
	}

});

module.exports = Contacts;