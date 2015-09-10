var Dispatcher = require('../dispatcher/contactsDispatcher');

var ContactsAction = {

	load : function(){

		if(window == undefined) {
			// Node.js load url resource
		} else {
			$.ajax({
				url: "http://jsonplaceholder.typicode.com/users",
				dataType: 'json',
				success: function(data) {
				  	
					Dispatcher.dispatch({
				    	source: 'VIEW_ACTION',
				    	action: {
					    	type : 'load',
					    	data : data
				    	}
				    });
				    
				},
				error: function(){
					// ContactsData = OriginalData = MOCK_DATA;
				 //  	ContactsStore.emitChange();
					alert('server error');
				}
			});
		}
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

	select : function(itemId){
		Dispatcher.dispatch({
	    	source: 'VIEW_ACTION',
	    	action: {
		    	type : 'select',
		    	id : itemId
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
