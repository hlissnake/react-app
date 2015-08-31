var React = require('react');
var Contacts = require('./jsx/contacts');
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
					<div className="contacts-container">
						<Contacts contacts={this.state.contacts} loading={this.state.loading} onSelect={this._onSelectContact} />
						{ this.state.loading ? <div className="loading-icon"></div> : [] }
					</div>
				</div>
				<div className="card-container">
					<BusinessCard contact={this.state.selectContact}/>
				</div>
			</div>
		)
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
		})
	}
})

React.render(<ContactList />, document.getElementById('container'))

