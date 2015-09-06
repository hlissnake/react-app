var React = require('react/dist/react-with-addons');

var Contacts = require('./jsx/contacts');
var Sort = require('./jsx/sortSelect');
var Loading = require('./jsx/loading');
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
		React.addons.Perf.start();

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
				React.createElement("div", {className: "left span3 bs-docs-sidebar"}, 

					React.createElement("input", {type: "text", placeholder: "search", className: "contact-search", onChange: this._searchContactName}), 

					React.createElement(Sort, {onSelect: this._selectSortOption}), 

					React.createElement("div", {className: "contacts-container"}, 

						React.createElement(Contacts, {contacts: this.state.contacts, onSelect: this._onSelectContact}), 

						React.createElement(Loading, {load: this.state.loading})

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
		React.addons.Perf.printInclusive();
		
		React.addons.Perf.stop();
		React.addons.Perf.start();
	},

	_searchContactName : function(e){
		ContactsAction.search(e.target.value);
		React.addons.Perf.printInclusive();
		
		React.addons.Perf.stop();
		React.addons.Perf.start();
	},

	_onSelectContact : function(contact){

		this.setState({
			selectContact : contact
		});
		ContactsAction.select(contact.get('id'));

		React.addons.Perf.printInclusive();
		React.addons.Perf.printWasted();
		React.addons.Perf.printDOM();

		React.addons.Perf.stop();
		React.addons.Perf.start();
	},

	_onChange : function(){
		
		this.setState({
			loading : false,
			contacts : ContactsStore.get()
		});

		calcualteAlphabet(ContactsStore.getOriginal());
	}
})

React.render(React.createElement(ContactList, null), document.getElementById('container'));

/**
 * calculate for each letter of the contact list
 * @param  {[type]} contactsData [description]
 * @return {[type]}              [description]
 */
function calcualteAlphabet(contactsData){

	var result = [],
		alphabetMap = {};

	for(var i = 0; i < contactsData.length; i++) {
		var firstLetter = contactsData[i].name.substring(0,1).toUpperCase();

		if(alphabetMap[firstLetter]) {
			alphabetMap[firstLetter]++;
		} else {
			alphabetMap[firstLetter] = 1;
		}
	}

	for(var p in alphabetMap) {
		if(alphabetMap.hasOwnProperty(p)) {
			result.push( p + ' : ' + alphabetMap[p] + ', ');
		}
	}

	document.getElementById('admin-selection').innerHTML = result.join('');

}


