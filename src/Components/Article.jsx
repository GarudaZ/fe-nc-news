import List from "./List";
import { useState } from "react";

const Article = () => {
	const articleId = window.location.pathname.split("/").pop();
	const comments = articleId + "/comments";
	const [newComment, setNewComment] = useState(false);

	return (
		<main>
			<h2>Article</h2>
			<List
				articleId={articleId}
				newComment={newComment}
				setNewComment={setNewComment}
			/>
			<List
				articleId={comments}
				newComment={newComment}
				setNewComment={setNewComment}
			/>
		</main>
	);
};

export default Article;
