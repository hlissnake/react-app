KISSY.add('mui/taoorder-gift/list', function(S, D, IO){

	var TPL =  '<li class="item">\
					<img src="">\
					<div class="center">\
						<span class="shop-name">scofield官方旗舰店</span>\
						<p>还剩 <span class="font-red">20</span> 个焕新礼包</p>\
					</div>\
					<div class="remind"></div>\
				</li>';

	var List_El;

	function _renderComponent(lotteryID){

		IO({
			url : 'http://latour.tmall.com/tmp/nfsgiff.do',
    		dataType : 'jsonp',
    		success : function(res){
    			var data = res.data;
    			var html = [];
    			// data = [
    			// 	{
    			// 		logo : '//img.alicdn.com/bao/uploaded/i2/TB1pd_dIVXXXXcMXXXXXXXXXXXX_!!0-item_pic.jpg',
    			// 		shopId : 87620202,
    			// 		name : 'scofield官方旗舰店',
    			// 		count : 20
    			// 	},{
    			// 		logo : '//img.alicdn.com/bao/uploaded/i2/TB1pd_dIVXXXXcMXXXXXXXXXXXX_!!0-item_pic.jpg',
    			// 		shopId : 87620202,
    			// 		name : 'scofield官方旗舰店',
    			// 		count : 20
    			// 	},{
    			// 		logo : '//img.alicdn.com/bao/uploaded/i2/TB1pd_dIVXXXXcMXXXXXXXXXXXX_!!0-item_pic.jpg',
    			// 		shopId : 87620202,
    			// 		name : 'scofield官方旗舰店',
    			// 		count : 20
    			// 	},{
    			// 		logo : '//img.alicdn.com/bao/uploaded/i2/TB1pd_dIVXXXXcMXXXXXXXXXXXX_!!0-item_pic.jpg',
    			// 		shopId : 87620202,
    			// 		name : 'scofield官方旗舰店',
    			// 		count : 20
    			// 	}
    			// ]
    			for(var i = 0; i < data.length; i++) {
    				var item = data[i];
    				html.push('<li class="item"><a href="//shop' + item.shopId + '.taobao.com">\
									<img src="' + item.logo + '">\
									<div class="center">\
										<span class="shop-name">' + item.name + '</span>\
										<p>还剩 <span class="font-red">' + item.count + '</span> 个焕新礼包</p>\
									</div>\
									<div class="remind"></div></a>\
								</li>');
    			}

    			D.get('#mui-taoorder-gift-list .coupons').innerHTML = html.join('');
    		}
		})
	}

	return {

		render : function(lotteryID){
			D.get('#mui-taoorder-gift-list').classList.remove('collapse');
			_renderComponent(lotteryID);
		},

		remove : function(){
			D.get('#mui-taoorder-gift-list').classList.add('collapse');
		}
	}

}, {
	requires : ['dom', 'io']
});