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

	sort : function(option){
		Dispatcher.dispatch({
	    	source: 'VIEW_ACTION',
	    	action: {
		    	type : 'sort',
		    	option : option
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
