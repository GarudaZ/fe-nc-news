import List from "./List";

const Article = () => {
	const articleId = window.location.pathname.split("/").pop();
	const comments = articleId + "/comments";

	return (
		<main>
			<List articleId={articleId} />
			<List articleId={comments} />
		</main>
	);
};

export default Article;
