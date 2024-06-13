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
				setErr("An error occurred, please try again");
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
				{err ? <p>{err}</p> : null}
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
			{isPosting ? <p className="postingMsg">Posting...</p> : null}
		</section>
	);
};

export default VotesAndComments;
