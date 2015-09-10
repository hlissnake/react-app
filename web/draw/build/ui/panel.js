var React = require('react');
var Panel = React.createClass({displayName: "Panel",

	getInitialState : function(){
		return {
			show : 'show'
		}
	},

	onDraw : function(){
		this.props.onDraw();
		// Draw.draw({
  //    		lotteryID : 1,
  //   		interactId : this.props.lotteryId,
  //   		appkey:'APP_TM_FS2015'
  //    	},{
  //    		isDelegate:true,
  //    		succCallback: function(data){

		// 		_renderCoupon(data);
		// 		callback();
		// 		content_el.classList.add('win');

		// 		if(Total_Count <= 1) {
		// 			D.get('.again', Component_Element).innerHTML = '去发放礼包';
		// 		}
  //           },
  //           failCallback: function(data){

		// 		_renderFailure();
		// 		callback();
		// 		content_el.classList.remove('win');

		// 		if(Total_Count <= 1) {
		// 			D.get('.again', Component_Element).innerHTML = '去发放礼包';
		// 		}
  //           }
  //       });
	},

	render : function(){
		return (
			React.createElement("div", {className: "mui-taoorder-gift-draw transform " + this.props.show}, 
		    	React.createElement("div", {className: "draw-panel"}, 
		    		React.createElement("div", {className: "award award-lu"}), 
		    		React.createElement("div", {className: "award award-ru"}), 
		    		React.createElement("div", {className: "award award-ld"}), 
		    		React.createElement("div", {className: "award award-rd"}), 
		    		React.createElement("div", {className: "draw", onClick: this.onDraw}, 
		                React.createElement("span", {className: "count"})
		    		)
		    	), 
		    	React.createElement("div", {className: "result-entry"})
		    )
		)
	}
})

module.exports = Panel;