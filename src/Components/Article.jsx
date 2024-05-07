import List from "./List";

const Article = () => {
	const articleId = window.location.pathname.split("/").pop();
	return (
		<main>
			<div>Article</div>
			<List articleId={articleId} />
		</main>
	);
};

export default Article;
