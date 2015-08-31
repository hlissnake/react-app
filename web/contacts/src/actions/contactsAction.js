var Dispatcher = require('../dispatcher/contactsDispatcher');

var ContactsAction = {

	load : function(){
		Dispatcher.dispatch({
	    	source: 'VIEW_ACTION',
	    	action: {
		    	type : 'load'
	    	}
	    });
	},

	search : function(name){
		Dispatcher.dispatch({
	    	source: 'VIEW_ACTION',
	    	action: {
		    	type : 'search',
		    	name : name
	    	}
	    });
	}
}

module.exports = ContactsAction;
