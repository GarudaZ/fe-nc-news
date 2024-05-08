/* eslint-disable react/prop-types */
const Card = ({ item, fullEntry, comments }) => {
	if (comments) {
		return (
			<div className="card comment" style={{ pointerEvents: "none" }}>
				<h3>{item.author}</h3>
				<p>{item.body}</p>
				<p>
					Votes: {item.votes} Comments:{item.comment_count}
				</p>
			</div>
		);
	}

	return (
		<div className="card" style={fullEntry ? { pointerEvents: "none" } : null}>
			<h3>nc/{item.topic}</h3>
			{fullEntry && <p>{new Date(item.created_at).toDateString()}</p>}
			<h2>{item.title}</h2>
			<img src={item.article_img_url} />
			{fullEntry && <p>{item.body}</p>}
			<p>
				Votes: {item.votes} Comments:{item.comment_count}
			</p>
		</div>
	);
};

export default Card;
