/* eslint-disable react/prop-types */
import Card from "./Card";
import { useEffect, useState } from "react";
import { fetchArticles } from "../../api";
import { useNavigate } from "react-router-dom";

const List = ({ articleId }) => {
	const [articles, setArticles] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		fetchArticles(articleId)
			.then((response) => {
				setArticles(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	if (articles.article) {
		const fullEntry = true;
		return <Card article={articles.article} fullEntry={fullEntry} />;
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
						<Card article={articleDetails} />
					</li>
				);
			})}
		</ul>
	);
};

export default List;
