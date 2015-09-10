var React = require('react');
var Immutable = require('immutable');
var ContactItem = require('./contactItem');

var Contacts = React.createClass({displayName: "Contacts",

	getInitialState : function(){
		return {
			loading : false	
		}
	},

	shouldComponentUpdate : function(nextProps, nextState){
		// return this.props.contacts == nextProps.contacts;
		return !nextProps.loading;
	},

	render : function(){
		return (
			React.createElement("ul", {className: "contact-list"}, 
				 this._getContactList() 
			)
		)
	},

	_getContactList : function(){
		return this.props.contacts.map(function(item, i){
			return (
				React.createElement(ContactItem, {data:  Immutable.Map(item), onSelect: this.props.onSelect, key: item.id})
			)
		}.bind(this));
	}

});

module.exports = Contacts;