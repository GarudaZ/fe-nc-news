import axios from "axios";
import Card from "./Card";
import { useEffect, useState } from "react";

const List = () => {
	const [articles, setArticles] = useState([]);

	const articlesAPI = axios.create({
		baseURL: "https://nc-news-s5ln.onrender.com/api/articles",
	});

	useEffect(() => {
		articlesAPI
			.get()
			.then((response) => {
				setArticles(response.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<ul className="list">
			{/* <label>list</label> */}
			{articles.map((articleDetails) => {
				return (
					<li key={articleDetails.article_id}>
						<Card article={articleDetails} />
					</li>
				);
			})}
		</ul>
	);
};

export default List;
