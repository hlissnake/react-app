var Coupon = React.createClass({

	interactCoupon : function(){
		return (
			<div className="coupon"><a href="//www.tmall.com/wh/tpl/tmpagewh/my-assets.htm">
            	<img />
            	<span className={'amount' + overflow}></span>
            	<div className="right">
	            	<div className="threshold">满元</div>
	            	<div className="use">使用</div>
	            	<div className="expiry"></div>
            	</div></a>
        	</div>
		)
	},

	flowPackage : function(){
		return (
			<div className="coupon" onClick={this.jumpPage}>
            	<img id="mui-taoorder-gift-coupon" />
        	</div>
		)
	},

	render : function(){
		return ui;
	}
})

module.exports = Coupon;