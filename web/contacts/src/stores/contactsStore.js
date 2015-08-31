var Dispatcher = require('../dispatcher/contactsDispatcher');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var FILTER_EVENT = 'search';

var ContactsStore = assign({}, EventEmitter.prototype, {

	// fetch : function(callback){
	// 	if(window == undefined) {
	// 		// Node.js load url resource
	// 	} else {
	// 		$.ajax({
	// 			url: "http://jsonplaceholder.typicode.com/users",
	// 			method: "POST",
	// 			data: products
	// 		}).then(
	// 			function success(data) {
	// 			  	callback(data);
	// 			}.bind(this),
	// 			function error(){
	// 				console.log('error');
	// 			}
	// 		);
	// 	}
	// },

	get : function(){
		return this.contactsData;
	},

	emitChange : function(){
		this.emit(CHANGE_EVENT);
	},

	onChange : function(callback){
		this.contactsData = this.originalData = [];
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
						  	ContactsStore.originalData = ContactsStore.contactsData = data;
						  	ContactsStore.emitChange();
						},
						error: function(){
							alert('server error');
						}
					});
				}
				break;

			case 'search':

				var resultData = [],
					item;

				for(var i = 0; i < ContactsStore.originalData.length; i++) {
					item = ContactsStore.originalData[i];
					if(item.name.indexOf(action.name) >= 0 ) {
						resultData.push(item);
					}
				}

				ContactsStore.contactsData = resultData;
				ContactsStore.emitChange();

				break;

		}

		return true;
	})

})

module.exports = ContactsStore;
