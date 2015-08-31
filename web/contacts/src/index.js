var React = require('react');
var Contacts = require('./jsx/contacts');
var Sort = require('./jsx/sortSelect');
var Loading = require('./jsx/loading');
var BusinessCard = require('./jsx/businessCard');

var ContactsAction = require('./actions/contactsAction');
var ContactsStore = require('./stores/contactsStore');

var ContactList = React.createClass({

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
			<div className="contacts">
				<div className="left">

					<input type="text" placeholder="search" className="contact-search" onChange={this._searchContactName}/>

					<Sort onSelect={this._selectSortOption}/>

					<div className="contacts-container">

						<Contacts contacts={this.state.contacts} loading={this.state.loading} onSelect={this._onSelectContact} />

						<Loading load={this.state.loading}/>

					</div>

				</div>

				<div className="card-container">
					<BusinessCard contact={this.state.selectContact}/>
				</div>
			</div>
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

		calcualteAlphabet(ContactsStore.getOriginal());
	}
})

React.render(<ContactList />, document.getElementById('container'));


// calculate for each letter of the contact list
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


