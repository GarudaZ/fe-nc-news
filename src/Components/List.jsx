/* eslint-disable react/prop-types */
import Card from "./Card";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import { useNavigate } from "react-router-dom";

const List = ({ articleId, newComment, setNewComment }) => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		fetchArticles(articleId)
			.then((response) => {
				setArticles(response.data);
				setIsLoading(false);

				if (newComment) {
					setNewComment(false);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	}, [articleId, newComment]);

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (articles.article) {
		const fullEntry = true;
		return (
			<Card
				item={articles.article}
				fullEntry={fullEntry}
				id={articleId}
				isLoading={isLoading}
				setNewComment={setNewComment}
			/>
		);
	}

	if (articles.comments) {
		const comments = true;
		return (
			<ul className="list">
				{articles.comments.map((comment) => {
					return (
						<li key={comment.comment_id} style={{ cursor: "default" }}>
							<Card
								item={comment}
								comments={comments}
								id={comment.article_id}
								isLoading={isLoading}
								setIsLoading={setIsLoading}
								setNewComment={setNewComment}
							/>
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
						<Card item={articleDetails} id={articleDetails.article_id} />
					</li>
				);
			})}
		</ul>
	);
};

export default List;
