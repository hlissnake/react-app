var React = require('react');
var Result = React.createClass({displayName: "Result",

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
			React.createElement("div", {className:  "mui-taoorder-gift-result transform " + this.props.show}, 
		    	React.createElement("div", {className: "head"}, 
		    		React.createElement("div", {className: "mui-taoorder-gift-head-message"})
		    	), 
		    	React.createElement("div", {className: "content"}), 
		        React.createElement("div", {className: "footer"}, 
		            React.createElement("div", {className: "btn left exit"}, "逛逛新品"), 
		            React.createElement("div", {className: "btn right again", onClick: this.again}, "再拆一个")
		        )
		    )
		)
	}
})

module.exports = Result;