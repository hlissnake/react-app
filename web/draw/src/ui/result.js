var React = require('react');
var Result = React.createClass({

	getInitialState : function(){
		return {
			show : 'hide'
		}
	},

	again : function(){
		this.props.onAgain();
	},

	render : function(){
		return (
			<div className={ "mui-taoorder-gift-result transform " + this.props.show }>
		    	<div className="head">
		    		<div className="mui-taoorder-gift-head-message"></div>
		    	</div>
		    	<div className="content"></div>
		        <div className="footer">
		            <div className="btn left exit">逛逛新品</div>
		            <div className="btn right again" onClick={this.again}>再拆一个</div>
		        </div>
		    </div>
		)
	}
})

module.exports = Result;