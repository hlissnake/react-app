KISSY.add('mui/taoorder-gift/navigator', function(){

	var hashParamsReg = /\#(.*)\?(.*)/i;

	function navigator(config){

		this.config = config;

	    var hashMap = this.config.map,
	        defaultHash = this.config.default_action,
	        previous_hash,
	        hasCancel = false,
	        destroyCallback;

	    function executeAction(callback, params){
	        var func;
	        if(callback.init) {
	            func = callback.init;
	            destroyCallback = callback.destroy;
	        } else {
	            func = callback;
	            destroyCallback = null;
	        }
	        var argList = params.split('&');

	        previous_hash = location.hash;
	        hasCancel = false;
	        (typeof func == 'function') && func.apply(this, argList);
	    }

	    window.onhashchange = function(){
	        var hashUrl = window.location.hash,
	            match = hashUrl.match(hashParamsReg),
	            actionUrl, params;

	        if(hashUrl == '') {
	            match = [defaultHash, defaultHash, ''];
	        }

	        if(match){
	            actionUrl = match[1];
	            params = match[2];

	            var callback = hashMap[actionUrl];

	            if(callback) {
	                if(hasCancel) {
	                    hasCancel = false;
	                    return false;
	                }
	                if(destroyCallback) {
	                    destroyCallback(function(ifConfirm){
	                        if(ifConfirm == false) {
	                          location.hash = previous_hash;
	                          hasCancel = true;
	                        } else {
	                          executeAction(callback, params);
	                        }
	                    })
	                } else {
	                    executeAction(callback, params);
	                }

	            }
	        }
	    }
	}

	return {

		run : navigator,

		add : function(actionUrl, action){
			this.config.map[actionUrl] = action;
		},

		go : function(){
	        var hashUrl = '',
	            action = arguments[0],
	            arg_list = Array.prototype.splice.call(arguments, 1);

	        hashUrl = action + '?' + arg_list.join('&');
	        window.location.hash = hashUrl;
		}
	};
})