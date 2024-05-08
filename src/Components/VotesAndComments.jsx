import { useState } from "react";
import { patchArticleVotes } from "../../api";

// eslint-disable-next-line react/prop-types
const VotesAndComments = ({ votes, comments, id }) => {
	const [voteCount, setVoteCount] = useState(votes);
	const [voteChange, setVoteChange] = useState(0);
	const [err, setErr] = useState(null);

	const handleVote = (vote) => {
		setVoteCount(voteCount + vote);
		setVoteChange(voteChange + vote);
		patchArticleVotes(id, vote).catch(() => {
			setVoteCount((voteCount) => voteCount - vote);
			setVoteChange(0);
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
		</section>
	);
};

export default VotesAndComments;
