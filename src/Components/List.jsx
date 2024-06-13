import Card from "./Card";
import Filter from "./Filter";
import ErrorMsg from "./ErrorMsg";
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
	const [error, setError] = useState(null);

	const [sortBy, setSortBy] = useState("");
	const [order, setOrder] = useState("");

	const navigate = useNavigate();
	const [searchParams, setSearchParams] = useSearchParams();
	const topic = searchParams.get("topic");
	function handleUrl() {
		const params = {};
		{
			topic ? (params.topic = topic) : null;
		}
		{
			sortBy ? (params.sort_by = sortBy) : null;
		}
		{
			order ? (params.order = order) : null;
		}
		setSearchParams(params);
	}

	useEffect(() => {
		const urlSearchParams = window.location.search;
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
			fetchArticles(articleId, urlSearchParams)
				.then((response) => {
					setError(null);
					setArticles(response.data);
					setIsLoading(false);
					if (newComment) {
						setNewComment(false);
					}
				})
				.catch((err) => {
					setError({ err });
					console.log(err);
				});
		}
	}, [articleId, newComment, searchParams]);

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
	if (error && /[a-zA-Z]/.test(articleId)) {
		return <ErrorMsg message={error.err.response.data.message} />;
	}

	if (isLoading && !error) {
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
		<ul className="list articles">
			<Filter setSortBy={setSortBy} setOrder={setOrder} handleUrl={handleUrl} />
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
