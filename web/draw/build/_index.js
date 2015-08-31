KISSY.add('mui/taoorder-gift/index', function (S, D, E, IO, TPL, List, Navigator, Draw, Ali) {

	/**
	 * Coupon Image Material Map
	 * @type {Object}
	 */
	var Draw_Result_MAP = {
		'res' : {
			'coupon' : [
				'//img.alicdn.com/tps/i3/TB11yF8IVXXXXasaXXXsOkiHXXX-460-168.png',
				'//img.alicdn.com/tps/i1/TB1NwFZIVXXXXX.aFXXsOkiHXXX-460-168.png',
				'//img.alicdn.com/tps/i2/TB18u5hIVXXXXcZXFXXsOkiHXXX-460-168.png'
			],
			'flow' : '//img.alicdn.com/tps/i4/TB1vNG8IVXXXXakapXXsOkiHXXX-460-168.png'
		},
		'small' : {
			'coupon' : [
				'//img.alicdn.com/tps/i1/TB1IkijIVXXXXaaXFXXh.BQOVXX-160-108.png',
				'//img.alicdn.com/tps/i4/TB1Ru04IVXXXXXcapXXh.BQOVXX-160-108.png',
				'//img.alicdn.com/tps/i2/TB1uqmbIVXXXXcbXVXXh.BQOVXX-160-108.png'
			],
			'flow' : '//img.alicdn.com/tps/i3/TB176LxIVXXXXbcXXXXh.BQOVXX-160-108.png'
		},
		'fail' : '//img.alicdn.com/tps/i3/TB1hpOMIVXXXXcEXXXX.KCxUXXX-306-206.png'
	}

	var Draw_Content_MAP = {
		'win' : '在“我的资产”中可查看优惠劵详情。',
		'fail' : ['再拆一个吧！', '发礼包！领取更多礼包！'],
		'winned' : '<p>赶紧把你的口令分享给小伙伴吧，</p><p>小伙伴领取礼包后，你也会同时增加一个礼包！</p>'
	}

	/**
	 * Object to cache the DOM element
	 */
	var Component_Element,
		Lottery_ID,
		Shop_ID,
		Total_Count,
		isLogin = false;

	function _login(success, error){
		if(!isLogin){
            Ali.callAfterReady("login", function(result){
                if(result.errorCode){
                    error && error();
                }
                else{
                    isLogin = true;
                    success && success();
                }
            });
        }
        else{
            success && success();
        }
	}

	function _getFormatDate(startDate, endDate){
		var startDate = startDate.substr(5,2) + '/' + startDate.substr(8,2);
		var endDate = endDate.substr(5,2) + '/' + endDate.substr(8,2);
		return startDate + '-' + endDate;
	}

	/**
	 * render four awards
	 * @param  {[type]} awards [description]
	 * @return {[type]}        [description]
	 */
	function _renderAwards(awards){
		var hasLeftRendered = false;

		for(var i = 0; i < awards.length; i++) {
			var award = awards[i];
			if(award.type == 'finalPrice') {

				var item = JSON.parse(award.extra.pic);
				var pic = item.picUrl;

				var html = '<img class="item" src="' + pic + '">\
			    			<div class="info">\
			    				<div class="name">' + award.name + '</div>\
			    				<span class="price">￥' + award.extra.price + '元</span><span class="original">￥' + award.extra.oPrice + '</span>\
			    			</div>';

			    D.get('.award-lu', Component_Element).innerHTML = html;

			} else if(award.type == 'interactCoupon') {

				var couponIndex = Math.floor( Math.random() * 3 );
				var ext = JSON.parse(award.extra.ext2);

				var html = '<img class="item" src="' + Draw_Result_MAP['small']['coupon'][couponIndex] + '">\
			    			<div class="amount">' + award.extra.value + '</div>\
			    			<div class="info">\
			    				<div class="expiry">' + _getFormatDate(ext.startDate, ext.endDate) + '</div>\
			    				<div class="type">' + award.name + '</div>\
			    			</div>';

			   	var target;
			    if(hasLeftRendered) {
			    	target = '.award-rd';
			    } else {
			    	target = '.award-ld';
			    	hasLeftRendered = true;
			    }
			    D.get(target, Component_Element).innerHTML = html;

			} else if(award.type == 'flowPackage') {

				var html = '<img class="item" src="' + Draw_Result_MAP['small']['flow'] + '">\
			    			<div class="amount">' + award.extra.flowSize + '</div>\
			    			<div class="info">\
			    				<div class="expiry"></div>\
			    				<span class="type">流量包</span>\
			    			</div>';

			    D.get('.award-ru', Component_Element).innerHTML = html;

			}
		}
	}

	/**
	 * render coupon style
	 * @return {[type]} [description]
	 */
	function _renderCoupon(award){

		if(award.awardType == 'interactCoupon') {

			var couponIndex = Math.floor( Math.random() * 3 );
			var extValue5 = award.extValue5.split(',');
			var overflow = extValue5[0].length > 3 ? ' overflow' : '';

	        var html = 	'<div class="coupon"><a href="//www.tmall.com/wh/tpl/tmpagewh/my-assets.htm">\
			            	<img id="mui-taoorder-gift-coupon" src="' + Draw_Result_MAP['res']['coupon'][couponIndex] + '">\
			            	<span id="mui-taoorder-gift-amount" class="amount' + overflow + '">' + extValue5[0] + '</span>\
			            	<div class="right">\
				            	<div class="threshold">满' + extValue5[1] + '元</div>\
				            	<div class="use">使用</div>\
				            	<div class="expiry">' + extValue5[2].replace(/2015\./g, '') + '</div>\
			            	</div></a>\
			        	</div>';

		} else if(award.awardType == 'flowPackage') {
		    var html = '<div class="coupon"><a href="//h5.m.taobao.com/aliqin/flowwallet/index.html">\
			            	<img id="mui-taoorder-gift-coupon" src="' + Draw_Result_MAP['res']['flow'] + '"></a>\
			        	</div>'; 

		} else if(award.awardType == 'finalPrice') {
			// var award = {
			// 	name : '2015秋季新款潮流单肩黑色包',
			// 	extra : {
			// 		price : '0.01',
			// 		pic : 'http://gtms02.alicdn.com/tps/i2/TB1vAezIVXXXXcOXXXXtz80OVXX-160-160.png'
			// 	}
			//}
			var ext = JSON.parse(award.extra.ext2);

			var item = JSON.parse(award.extra.pic);
			var pic = item.picUrl;
//_getFormatDate(ext.startDate, ext.endDate)
	        var html = '<div class="final-price"><a href="' + item.itemUrl + '">\
							<img src="' + pic + '">\
							<div class="center">\
						    	<div class="name">' + award.awardName + '</div>\
						    	<div class="expiry">08/08-20/08</div>\
							</div>\
							<div class="right">\
								<span class="amount">￥' + award.extra.price + '</span>\
							</div></a>\
						</div>';
		}

        D.get('.content', Component_Element).innerHTML = html + '<div id="mui-taoorder-gift-value">' + Draw_Content_MAP['win'] + '</div>';
		D.get('#mui-taoorder-gift-head-message').innerHTML = '<p>幸运之神降临</p><p>拆礼包发现一个新品福利！</p>'

		// D.get('.coupon', Component_Element).classList.add('flow');
		// D.get('#mui-taoorder-gift-coupon').src = Draw_Result_MAP['res']['flow'];
	}

	function _renderFailure(){

		var index = Total_Count > 1 ? 0 : 1;
        var html = '<img id="mui-taoorder-gift-failure" src="' + Draw_Result_MAP['fail'] + '">\
            		<div id="mui-taoorder-gift-value">' + Draw_Content_MAP['fail'][index] + '</div>';

        D.get('.content', Component_Element).innerHTML = html;
		D.get('#mui-taoorder-gift-head-message').innerHTML = '<p>喵～没有中哦～</p><p>下个礼包就可能中大奖哦！</p>';
	}

	/**
	 * show draw result
	 * @return {[type]} [description]
	 */
	function _showResult(){

		D.get('#mui-taoorder-gift-draw').classList.remove('show');
		D.get('#mui-taoorder-gift-draw').classList.add('hide');

		D.get('#mui-taoorder-gift-result').classList.remove('hide');
		D.get('#mui-taoorder-gift-result').classList.add('show');
	}

	/**
	 * back to main page to draw again
	 * @return {[type]} [description]
	 */
	function _drawAgain(){

		D.get('#mui-taoorder-gift-draw').classList.add('show');
		D.get('#mui-taoorder-gift-draw').classList.remove('hide');

		D.get('#mui-taoorder-gift-result').classList.add('hide');
		D.get('#mui-taoorder-gift-result').classList.remove('show');
	}

	/**
	 * initialize draw status
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	function _initDrawStatus(callback){
		// Mock request
    	// setTimeout(function(){
    		// Total_Count = Math.floor(Math.random() * 10);
    	IO({
    		url : 'http://latour.tmall.com/tmp/nfsLot.do',
    		data : {
    			interactId : Lottery_ID
    		},
    		dataType : 'jsonp',
    		success : function(res){
    			var Draw_Btn = D.get('#mui-taoorder-gift-draw .draw');

    			if(res.isLogin) {
    				isLogin = true;
    				Draw_Btn.classList.remove('nologin');
    			} else {
    				isLogin = false;
    				Draw_Btn.classList.add('nologin');
    			}

		    	D.get('.count', Component_Element).innerHTML = (res.draw ? res.draw : 0);

    			if(res.awards) {
					// render all awards
					_renderAwards(res.awards);
					// render drawable count
					Total_Count = res.draw;
		    		callback && callback();
    			}
    		}
    	});
    	// }, 200);
	}

	/**
	 * draw and show lottery result
	 * @param  {Function} callback [description]
	 * @return {[type]}            [description]
	 */
	function _draw(callback){

		// lib.mtop.request({
		//     // 通用参数
		//     api: 'com.taobao.detail.getTaobaoDyn', // 必须
		//     v: '1.0',  // 必须
		//     data: {'itemNumId': 37194529489}, // 必须（注意1）
		//     ecode: 0,   // 必须（注意2）
		//     type: 'GET',   // 非必须。请求类型（GET/POST），默认是GET
		//     dataType: 'jsonp', // 非必须。数据类型（jsonp/json），默认jsonp
		//     timeout: 20000 // 非必须。接口超时设置，默认为20000ms
		// }, function(resJson) {
		//     // 成功回调
		//     // 仅当ret为SUCCESS或未提供failure回调时调用
		//     // resJson.retType为数字，可以通过lib.mtop.RESPONSE_TYPE枚举来获得具体信息
		// }, function (resJson) {
		//     // 失败回调
		//     // resJson.retType为数字，可以通过lib.mtop.RESPONSE_TYPE枚举来获得具体信息
		// });

		var img_el = D.get('#mui-taoorder-gift-animation .open-gif');
		var content_el = D.get('#mui-taoorder-gift-result .content');

		// loading gif aniamtion, add onload callback
		img_el.onload = function(){

			D.show('#mui-taoorder-gift-animation');
			// Animation will last for 700ms
			setTimeout(function(){
				// set src equal empty and hide animation overlay to avoid loop
				img_el.src = '';
				D.hide('#mui-taoorder-gift-animation');
				img_el.onload = null;
			}, 700);

			// After the gif being loaded, then call Draw method
		    Draw.draw({
	     		lotteryID : 1,
	    		interactId : Lottery_ID,
	    		appkey:'APP_TM_FS2015'
	     	},{
	     		isDelegate:true,
	     		succCallback: function(data){

					_renderCoupon(data);
					callback();
					content_el.classList.add('win');

					if(Total_Count <= 1) {
						D.get('.again', Component_Element).innerHTML = '去发放礼包';
					}
	            },
	            failCallback: function(data){

					_renderFailure();
					callback();
					content_el.classList.remove('win');

					if(Total_Count <= 1) {
						D.get('.again', Component_Element).innerHTML = '去发放礼包';
					}
	            }
	        });
		}
		img_el.src = '//img.alicdn.com/tps/i4/TB1DJnuIVXXXXbyXFXXfj3m2pXX-750-750.gif';
	}

	/**
	 * [_hideComponent description]
	 * @return {[type]} [description]
	 */
	function _hideComponent(){

		Component_Element.classList.remove('show');

		D.get('#mui-taoorder-gift-draw').classList.remove('show');
		D.get('#mui-taoorder-gift-draw').classList.add('hide');

		D.get('#mui-taoorder-gift-result').classList.add('hide');
		D.get('#mui-taoorder-gift-result').classList.remove('show');
	}

	function _record(num){
        if(window.goldlog && window.goldlog.record){
            switch(num){
                case 12:
                    window.goldlog.record('/tmallacti.20150816.12','','shopid=' + Shop_ID);
                    break;
                case 11:
                    window.goldlog.record('/tmallacti.20150816.11','','shopid=' + Shop_ID);
                    break;
                case 10:
                    window.goldlog.record('/tmallacti.20150816.10','','shopid=' + Shop_ID);
                    break;
                case 9:
                    window.goldlog.record('/tmallacti.20150816.9','','shopid=' + Shop_ID);
                    break;
            }
        }
    }

	/**
	 * bind event for whole component
	 * @param  {[type]} element [description]
	 * @return {[type]}         [description]
	 */
	function bindEvent(element, callback){
		/**
		 * tap for close button
		 * @param  {[type]} ){			D.hide(Component_Element);		} [description]
		 * @return {[type]}                                      [description]
		 */
		E.delegate(element, 'click', '#mui-taoorder-gift-close, .exit', function(){
			_record(11);
			_hideComponent();
		});

		var isDrawing = false;
		/**
		 * tap for draw button
		 */
		E.delegate(element, 'tap', '.draw', function(e){

			_record(9);

			if(!isLogin) {
				_login(function(){
					_initDrawStatus()
				});
				return false;
			}

			if(isDrawing) return false;

			if(Total_Count > 0) {
				isDrawing = true;
				_draw( function(){
					isDrawing = false;
					_showResult();
				});
			} else {
				Ali.toast('已没有抽奖机会');
			}

		});

		/**
		 * tap for draw again btn
		 */
		E.delegate(element, 'tap', '.again', function(e){

			if(Total_Count <= 1) {

				_record(12);
				// go to share order, execute the callback that pass into the component
				callback();
			} else {

				_record(10);
				_initDrawStatus( function(){
					_drawAgain();
				});
			}

		});

		E.delegate(element, 'tap', '.result-entry', function(){
			if(!isLogin) {
				Ali.toast('请登录淘宝账号');
				return false;
			}
			Navigator.go('list', Lottery_ID);
		});

		// E.delegate(element, 'tap', '#mui-taoorder-gift-list .item', function(e){
		// 	var target = e.currentTarget;
		// 	var shopId = D.data(target, 'id');
		// })

	}

	/**
	 * Create component instance
	 * @param {[type]} content [description]
	 */
    function CreateInstance(content, zIndex, callback) {
    	if(!Component_Element) {
	        Component_Element = D.create(TPL);
	        Component_Element.style.zIndex = zIndex;
	        D.append(Component_Element, content);

	        bindEvent(Component_Element, callback);
    	}

    	D.show(Component_Element);
    	Component_Element.classList.add('show');
    	_initDrawStatus(function(){
			D.get('#mui-taoorder-gift-draw').classList.add('show');
			D.get('#mui-taoorder-gift-draw').classList.remove('hide');
    	});
    }

    (function init(){

    	Navigator.run({

    		"default_action" : "init",

			"map" : {

				"init" : { },

				"list" : {
					init : function(lotteryID){
					  	List.render(lotteryID);
					},
					destroy : function(callback){
					  	List.remove();
					  	callback(true);
					}
				}
			}
    	});

    })()

    /**
     * External API
     */
    return {
    	/**
    	 * Show the component
    	 * @param  {[type]} content [root elememt/content]
    	 * @return {[type]}         [description]
    	 */
    	show : function(config){
    		Lottery_ID = config.lotteryID;
    		Shop_ID = config.shopID;

    		CreateInstance(
    			config.context || document.body, 
    			config.zIndex || 9999,
    			config.callback
    		);
    	},
    	/**
    	 * Hide the component
    	 * @return {[type]} [description]
    	 */
    	hide : function(){
    		_hideComponent();
    	}
    };

}, {
    requires: [
    	'dom', 'event', 'io', 
    	'mui/taoorder-gift/tpl',
    	'mui/taoorder-gift/list',
    	'mui/taoorder-gift/navigator',
    	'mui/draw/index',
    	'mui/hybrid'
    ]
});
