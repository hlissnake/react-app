var Coupon = React.createClass({displayName: "Coupon",

	interactCoupon : function(){
		return (
			React.createElement("div", {className: "coupon"}, React.createElement("a", {href: "//www.tmall.com/wh/tpl/tmpagewh/my-assets.htm"}, 
            	React.createElement("img", null), 
            	React.createElement("span", {className: 'amount' + overflow}), 
            	React.createElement("div", {className: "right"}, 
	            	React.createElement("div", {className: "threshold"}, "满元"), 
	            	React.createElement("div", {className: "use"}, "使用"), 
	            	React.createElement("div", {className: "expiry"})
            	))
        	)
		)
	},

	flowPackage : function(){
		return (
			React.createElement("div", {className: "coupon", onClick: this.jumpPage}, 
            	React.createElement("img", {id: "mui-taoorder-gift-coupon"})
        	)
		)
	},

	render : function(){
		return ui;
	}
})

module.exports = Coupon;