var Dispatcher = require('../dispatcher/contactsDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

var ContactsData = [];
var OriginalData = [];

var ContactsStore = assign({}, EventEmitter.prototype, {

	get : function(){
		return ContactsData;
	},

	getOriginal : function(){
		return OriginalData;
	},

	emitChange : function(){
		this.emit(CHANGE_EVENT);
	},

	onChange : function(callback){
		ContactsData = OriginalData = [];
		this.on(CHANGE_EVENT, callback)
	},

	offChange : function(callback){
		this.removeListener(CHANGE_EVENT, callback)
	},

	dispatcher : Dispatcher.register(function(payload){
		var action = payload.action;

		switch(action.type){

			case 'load':

				if(window == undefined) {
					// Node.js load url resource
				} else {
					$.ajax({
						url: "http://jsonplaceholder.typicode.com/users",
						dataType: 'json',
						success: function(data) {
						  	ContactsData = OriginalData = data;
						  	ContactsStore.emitChange();
						},
						error: function(){
							// ContactsData = OriginalData = MOCK_DATA;
						 //  	ContactsStore.emitChange();
							alert('server error');
						}
					});
				}
				break;

			case 'search':

				var resultData = [],
					item;

				for(var i = 0; i < OriginalData.length; i++) {
					item = OriginalData[i];
					if(item.name.indexOf(action.name) >= 0 ) {
						resultData.push(item);
					}
				}

				ContactsData = resultData;
				ContactsStore.emitChange();

				break;

			case 'sort':

				if(action.option == 'none') {
					ContactsData = OriginalData;
				} else {
					ContactsData.sort(function(a, b){
						if(action.option === 'name') {
							return a.name > b.name;
						} else if(action.option === 'id') {
							return a.id > b.id;
						}
					})
				}
				ContactsStore.emitChange();

				break;

		}

		return true;
	})

})

module.exports = ContactsStore;
