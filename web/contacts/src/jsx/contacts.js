var React = require('react');
var ContactItem = require('./contactItem');

var Contacts = React.createClass({

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
			<div className="contact-list">
				{ this._getContactList() }
			</div>
		)
	},

	_getContactList : function(){
		return this.props.contacts.map(function(item, i){
			return (
				<ContactItem data={item} onSelect={this.props.onSelect} key={i} />
			)
		}.bind(this));
	}

});

module.exports = Contacts;