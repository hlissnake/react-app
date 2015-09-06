var React = require('react');

var ContactItem = React.createClass({

	onClickHandler : function(){
		this.props.onSelect(this.props.data);
	},

	shouldComponentUpdate : function(nextProps){
		return this.props.data.get('select') != nextProps.data.get('select');
	},

	render : function(){

		var selected = this.props.data.get('select') ? "selected" : ""

		return (
			<li className={"contact-item " + selected} onClick={this.onClickHandler}>
				{this.props.data.get('name')}
			</li>
		)
	}

});

module.exports = ContactItem;