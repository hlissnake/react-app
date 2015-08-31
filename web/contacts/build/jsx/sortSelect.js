var React = require('react');

var SortSelect = React.createClass({displayName: "SortSelect",

	render : function(){
		return (
			React.createElement("div", {className: "contacts-sort"}, 
				React.createElement("select", {onChange: this.props.onSelect}, 
					React.createElement("option", {value: "none"}, "Sort By None"), 
					React.createElement("option", {value: "name"}, "By Contact Name"), 
					React.createElement("option", {value: "id"}, "By Contact ID")
				)
			)
		)
	}
});

module.exports = SortSelect;