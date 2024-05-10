import axios from "axios";

const articlesAPI = axios.create({
	baseURL: "https://nc-news-s5ln.onrender.com/api/",
});
export const fetchArticles = (articleID = "", urlSearchParams) => {
	return articlesAPI.get(`articles/${articleID}${urlSearchParams}`);
};
export const fetchTopics = () => {
	return articlesAPI.get("/topics");
};

export const patchArticleVotes = (id, vote) => {
	return articlesAPI.patch(`articles/${id}`, { inc_votes: vote });
};
export const postComment = (id, user, body) => {
	return articlesAPI
		.post(`articles/${id}/comments`, {
			username: user,
			body: body,
		})
		.catch((err) => {
			console.log(err);
		});
};
export const deleteComment = (commentId) => {
	return articlesAPI.delete(`comments/${commentId}`);
};
