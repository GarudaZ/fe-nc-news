/* eslint-disable react/prop-types */
const Card = ({ article }) => {
	console.log(article);
	return (
		<div className="card">
			<h3>nc/{article.topic}</h3>
			<h2>{article.title}</h2>
			<img src={article.article_img_url} />
			<p>
				Votes: {article.votes} Comments:{article.comment_count}
			</p>
		</div>
	);
};

export default Card;
