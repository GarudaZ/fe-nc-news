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
	const [isPosting, setIsPosting] = useState(false);
	const [err, setErr] = useState(null);
	const { user } = useContext(UserContext);

	const handleVote = (vote) => {
		setErr(null);
		setVoteCount(voteCount + vote);
		setVoteChange(voteChange + vote);
		patchArticleVotes(id, vote).catch(() => {
			setVoteCount((voteCount) => voteCount - vote);
			setVoteChange(0);
			setErr("An error occurred, please try voting gain");
		});
	};

	const handleNewComment = (e) => {
		e.preventDefault();
		setErr(null);
		setIsPosting(true);

		const comment = e.target;
		const commentData = new FormData(comment);
		const formJson = Object.fromEntries(commentData.entries());
		const commentBody = formJson.inputBody;

		postComment(id, user.username, commentBody)
			.then(() => {
				e.target.elements.inputBody.value = "";
				setNewComment(true);
				setIsPosting(false);
			})
			.catch(() => {
				setErr("An error occurred, please try  posting again");
				setIsPosting(false);
			});
	};

	return (
		<section className="votes-and-comments">
			<div className="voting">
				Votes: {voteCount}
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
			</div>
			<p>Comments:</p> <div className="comment-count">{comments}</div>
			{fullEntry ? (
				<form method="post" onSubmit={handleNewComment}>
					<input
						id="commentForm"
						type="text"
						placeholder="Enter a comment"
						name="inputBody"
						disabled={isLoading}
						required
					></input>
					<button type="submit" disabled={isLoading}>
						Add
					</button>
				</form>
			) : null}
			{err ? <p>{err}</p> : null}
			{isPosting ? <p className="postingMsg">Posting...</p> : null}
		</section>
	);
};

export default VotesAndComments;
