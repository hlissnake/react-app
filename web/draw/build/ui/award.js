var Award = React.createClass({displayName: "Award",
	render : function(){
		return (
			React.createElement("div", {className: "award " + position}, 
				React.createElement("img", {className: "item", src: pic}), 
				React.createElement("div", {className: "info"}, 
					React.createElement("div", {className: "name"}, awardName), 
					React.createElement("span", {className: "price"}, '￥' + awardPrice + '元'), 
					React.createElement("span", {className: "original"}, '￥' + awardOprice)
				)
			)
		)
	}
})

module.exports = Award;