var React = require('react');
var Panel = require('./panel');
var Result = require('./result');

var GiftBox = React.createClass({

	getInitialState : function(){
		return {
			show : 'hide',
			panle : 'show',
			result : 'hide'
		}
	},

	show : function(){
		this.setState({
			show : 'show'
		});
	},

	hide : function(){
		this.setState({
			show : 'hide'
		});
	},

	showResult : function(){
		this.setState({
			panel : 'hide',
			result : 'show'
		});
	},

	drawAgain : function(){
		this.setState({
			panel : 'show',
			result : 'hide'
		});
	},

	render : function(){
		return (
			<div className={"mui-taoorder-gift " + this.state.show}>
			    <Panel show={this.state.panel} onDraw={this.showResult}/>
			    <Result show={this.state.result} onAgain={this.drawAgain}/>
			    <div className="mui-taoorder-gift-close" onClick={this.hide}></div>
			</div>
		);
	}
});

module.exports = GiftBox;