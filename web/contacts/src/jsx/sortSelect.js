var React = require('react');

var SortSelect = React.createClass({

	render : function(){
		return (
			<div className="contacts-sort">
				<select onChange={this.props.onSelect}>
					<option value="none">Sort By None</option>
					<option value="name">By Contact Name</option>
					<option value="id">By Contact ID</option>
				</select>
			</div>
		)
	}
});

module.exports = SortSelect;