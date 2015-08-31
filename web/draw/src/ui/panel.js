var React = require('react');
var Panel = React.createClass({

	getInitialState : function(){
		return {
			show : 'show',
			login : this.props.login
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

		var login = this.state.login ? '' : 'nologin';

		return (
			<div className={"mui-taoorder-gift-draw transform " + this.props.show }>
		    	<div className="draw-panel">
		    		<div className="award award-lu"></div>
		    		<div className="award award-ru"></div>
		    		<div className="award award-ld"></div>
		    		<div className="award award-rd"></div>
		    		<div className={"draw " + login} onClick={this.onDraw}>
		                <span className="count"></span>
		    		</div>
		    	</div>
		    	<div className="result-entry"></div>
		    </div>
		)
	}
})

module.exports = Panel;