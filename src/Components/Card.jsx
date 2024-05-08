import VotesAndComments from "./VotesAndComments";

/* eslint-disable react/prop-types */
const Card = ({ item, fullEntry, comments, id }) => {
	if (comments) {
		return (
			<div className="card comment">
				<h3>{item.author}</h3>
				<p>{item.body}</p>
				<p>
					Votes: {item.votes} Comments:{item.comment_count}
				</p>
			</div>
		);
	}

	return (
		<div className={"card" + (!fullEntry ? " highlight" : "")}>
			<h3>nc/{item.topic}</h3>
			{fullEntry && <p>{new Date(item.created_at).toDateString()}</p>}
			<h2>{item.title}</h2>
			<img src={item.article_img_url} />
			{fullEntry && <p>{item.body}</p>}
			<VotesAndComments
				votes={item.votes}
				comments={item.comment_count}
				id={id}
			/>
		</div>
	);
};

export default Card;
