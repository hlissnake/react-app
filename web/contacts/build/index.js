var React = require('react');
var Contacts = require('./jsx/contacts');
var Sort = require('./jsx/sortSelect');
var BusinessCard = require('./jsx/businessCard');

var ContactsAction = require('./actions/contactsAction');
var ContactsStore = require('./stores/contactsStore');

var ContactList = React.createClass({displayName: "ContactList",

	getInitialState : function(){
		return {
			contacts : [],
			loading : false,
			selectContact : false
		};
	},

	componentDidMount : function(){
		ContactsStore.onChange(this._onChange);
		ContactsAction.load();

		this.setState({
			loading : true
		});
	},

	componentWillUnmount : function(){
		ContactsStore.offChange(this._onChange);
	},

	render : function(){
		return (
			React.createElement("div", {className: "contacts"}, 
				React.createElement("div", {className: "left"}, 

					React.createElement("input", {type: "text", placeholder: "search", className: "contact-search", onChange: this._searchContactName}), 

					React.createElement(Sort, {onSelect: this._selectSortOption}), 

					React.createElement("div", {className: "contacts-container"}, 

						React.createElement(Contacts, {contacts: this.state.contacts, loading: this.state.loading, onSelect: this._onSelectContact}), 

						 this.state.loading ? React.createElement("div", {className: "loading-icon"}) : []

					)

				), 

				React.createElement("div", {className: "card-container"}, 
					React.createElement(BusinessCard, {contact: this.state.selectContact})
				)
			)
		)
	},

	_selectSortOption : function(e){
		ContactsAction.sort(e.target.value);
	},

	_searchContactName : function(e){
		ContactsAction.search(e.target.value);
	},

	_onSelectContact : function(contact){
		this.setState({
			selectContact : contact
		})
	},

	_onChange : function(){
		this.setState({
			loading : false,
			contacts : ContactsStore.get()
		});

		calcualteAlphabet(ContactsStore.get());
	}
})

React.render(React.createElement(ContactList, null), document.getElementById('container'));

// calculate for each letter of the contact list
function calcualteAlphabet(contactsData){

	var alphabetMap = {};

	for(var i = 0; i < contactsData.length; i++) {
		var firstLetter = contactsData[i].substring(0,1).toUpperCase();

		if(alphabetMap[firstLetter]) {
			alphabetMap[firstLetter]++;
		} else {
			alphabetMap[firstLetter] = 1;
		}
	}

}


