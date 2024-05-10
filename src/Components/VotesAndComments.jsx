import { useContext, useState } from "react";
import { patchArticleVotes, postComment } from "../../api";
import { UserContext } from "./Contexts/User";

const VotesAndComments = ({
	votes,
	comments,
	id,
	fullEntry,
	isLoading,
	setNewComment,
}) => {
	const [voteCount, setVoteCount] = useState(votes);
	const [voteChange, setVoteChange] = useState(0);
	const [err, setErr] = useState(null);
	const { user } = useContext(UserContext);

	const handleVote = (vote) => {
		setVoteCount(voteCount + vote);
		setVoteChange(voteChange + vote);
		patchArticleVotes(id, vote).catch(() => {
			setVoteCount((voteCount) => voteCount - vote);
			setVoteChange(0);
			setErr("An error occurred, please try again");
		});
	};

	const handleNewComment = (e) => {
		e.preventDefault();

		const comment = e.target;
		const commentData = new FormData(comment);
		const formJson = Object.fromEntries(commentData.entries());
		const commentBody = formJson.inputBody;

		e.target.elements.inputBody.value = "";
		postComment(id, user, commentBody)
			.then(() => {
				setNewComment(true);
			})
			.catch(() => {
				setErr("An error occurred, please try again");
			});
	};

	return (
		<section className="voting">
			<div>Votes: {voteCount}</div>
			<button
				disabled={voteChange > 0}
				onClick={(e) => {
					e.stopPropagation();
					handleVote(1);
				}}
			>
				+
			</button>
			<button
				disabled={voteChange < 0}
				onClick={(e) => {
					e.stopPropagation();
					handleVote(-1);
				}}
			>
				-
			</button>
			{err ? <p>{err}</p> : null}
			<div>Comments: {comments}</div>
			{fullEntry ? (
				<form method="post" onSubmit={handleNewComment}>
					<label htmlFor="commentForm">Add Comment</label>
					<input
						id="commentForm"
						type="text"
						placeholder="Enter Comment"
						name="inputBody"
						disabled={isLoading}
						required
					></input>
					<button type="submit" disabled={isLoading}>
						Add
					</button>
				</form>
			) : null}
		</section>
	);
};

export default VotesAndComments;
