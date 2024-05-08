/* eslint-disable react/prop-types */
import Card from "./Card";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import { useNavigate } from "react-router-dom";

const List = ({ articleId }) => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		fetchArticles(articleId)
			.then((response) => {
				setArticles(response.data);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (articles.article) {
		const fullEntry = true;
		return <Card item={articles.article} fullEntry={fullEntry} />;
	}

	if (articles.comments) {
		const comments = true;
		return (
			<ul className="list">
				{articles.comments.map((comment) => {
					return (
						<li key={comment.comment_id} style={{ cursor: "default" }}>
							<Card item={comment} comments={comments} />
						</li>
					);
				})}
			</ul>
		);
	}

	function handleClick(id, e) {
		e.preventDefault();
		navigate("/articles/" + id);
	}

	return (
		<ul className="list">
			{articles.map((articleDetails) => {
				return (
					<li
						key={articleDetails.article_id}
						onClick={(e) => {
							handleClick(articleDetails.article_id, e);
						}}
					>
						<Card item={articleDetails} />
					</li>
				);
			})}
		</ul>
	);
};

export default List;
