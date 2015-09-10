var Award = React.createClass({
	render : function(){
		return (
			<div className={"award " + position}>
				<img className="item" src={pic} />
				<div className="info">
					<div className="name">{awardName}</div>
					<span className="price">{'￥' + awardPrice + '元'}</span>
					<span className="original">{'￥' + awardOprice}</span>
				</div>
			</div>
		)
	}
})

module.exports = Award;