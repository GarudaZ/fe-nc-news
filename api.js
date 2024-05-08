import axios from "axios";

const articlesAPI = axios.create({
	baseURL: "https://nc-news-s5ln.onrender.com/api/",
});
export const fetchArticles = (articleID = "") => {
	return articlesAPI.get(`articles/${articleID}`);
};
export const patchArticleVotes = (id, vote) => {
	return articlesAPI.patch(`articles/${id}`, { inc_votes: vote });
};
