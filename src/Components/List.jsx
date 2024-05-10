/* eslint-disable react/prop-types */
import Card from "./Card";
import { useEffect, useState } from "react";
import { fetchArticles, fetchTopics } from "../../api";
import {
	createSearchParams,
	useNavigate,
	useSearchParams,
} from "react-router-dom";

const List = ({ articleId, newComment, setNewComment, getTopics }) => {
	const [articles, setArticles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [topics, setTopics] = useState([]);
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const topic = searchParams.get("topic");

	useEffect(() => {
		if (getTopics) {
			fetchTopics()
				.then((response) => {
					setTopics(response.data);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			fetchArticles(articleId, topic)
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
		}
	}, [articleId, newComment]);

	function handleClick(id, e) {
		e.preventDefault();
		navigate("/articles/" + id);
	}
	function handleTopicClick(topic, e) {
		e.preventDefault();
		navigate({
			pathname: "/articles/",
			search: createSearchParams({ topic: topic }).toString(),
		});
	}

	if (isLoading) {
		return <h2>Loading...</h2>;
	}

	if (getTopics) {
		return (
			<ul>
				{topics.map((topic) => {
					return (
						<li
							key={topic.slug}
							onClick={(e) => {
								handleTopicClick(topic.slug, e);
							}}
						>
							<Card getTopics={getTopics} item={topic} />
						</li>
					);
				})}
			</ul>
		);
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
