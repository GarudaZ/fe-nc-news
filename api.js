import axios from "axios";

const articlesAPI = axios.create({
	baseURL: "https://nc-news-s5ln.onrender.com/api/",
});

const handleError = (err) => {
	if (err.response) {
		throw new Error(`Error: ${err.message}`);
	} else if (err.request) {
		throw new Error("Network error: No response received from the server");
	} else {
		throw new Error(`Error: ${err.message}`);
	}
};

export const fetchArticles = (articleID = "", urlSearchParams) => {
	return articlesAPI
		.get(`articles/${articleID}${urlSearchParams}`)
		.catch(handleError);
};

export const fetchTopics = () => {
	return articlesAPI.get("/topics").catch(handleError);
};

export const patchArticleVotes = (id, vote) => {
	return articlesAPI
		.patch(`articles/${id}`, { inc_votes: vote })
		.catch((err) => {
			console.error("Error updating article votes:", err);
			throw new Error(
				"Failed to update article votes. Please check your network connection."
			);
		});
};

export const postComment = (id, user, body) => {
	return articlesAPI
		.post(`articles/${id}/comments`, {
			username: user,
			body: body,
		})
		.catch((err) => {
			console.error("Error posting comment:", err);
			throw new Error(
				"Failed to post comment. Please check your network connection."
			);
		});
};

export const deleteComment = (commentId) => {
	return articlesAPI.delete(`comments/${commentId}`).catch((err) => {
		console.error("Error deleting comment:", err);
		throw new Error(
			"Failed to delete comment. Please check your network connection."
		);
	});
};

export const fetchUser = (userId) => {
	return articlesAPI.get(`users/${userId}`).catch((err) => {
		console.error("Error fetching user:", err);
		throw new Error(
			"Failed to fetch user. Please check your network connection."
		);
	});
};
