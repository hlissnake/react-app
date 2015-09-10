var React = require('react');
var GiftBox = require('./ui/giftbox');

var MuiGift = function(config){
	// var container = document.createElement('div');
	// document.body.appendChild(container);

	var Component = React.createFactory(GiftBox);
	var element = React.render(Component(config), document.getElementById('container'));

	return {
		show : function(){
			element.show();
		}
	}
}

// var gift = MuiGift({
	// lotteryID : '3919dad7-2ada-46f2-8fb5-deafecbe8285',
	// zIndex : 9999
// });
// document.getElementById('draw').addEventListener('click', function(){
	MuiGift({
		lotteryID : '3919dad7-2ada-46f2-8fb5-deafecbe8285',
		zIndex : 9999
	}).show();
// });