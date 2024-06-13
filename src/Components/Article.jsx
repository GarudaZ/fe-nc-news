import List from "./List";
import { useState } from "react";

const Article = () => {
	const articleId = window.location.pathname.split("/").pop();
	const comments = articleId + "/comments";
	const [newComment, setNewComment] = useState(false);

	return (
		<main>
			<div className="fullArticle">
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
			</div>
		</main>
	);
};

export default Article;
