/* eslint-disable react/prop-types */
const Card = ({ article, fullEntry }) => {
	return (
		<div className="card">
			<h3>nc/{article.topic}</h3>
			{fullEntry && <p>{new Date(article.created_at).toDateString()}</p>}
			<h2>{article.title}</h2>
			<img src={article.article_img_url} />
			{fullEntry && <p>{article.body}</p>}
			<p>
				Votes: {article.votes} Comments:{article.comment_count}
			</p>
		</div>
	);
};

export default Card;
