import VotesAndComments from "./VotesAndComments";
import { useState, useContext } from "react";
import { UserContext } from "./Contexts/User";
import { deleteComment } from "../../api";

const Card = ({
	item,
	fullEntry,
	comments,
	id,
	isLoading,
	setNewComment,
	getTopics,
}) => {
	const { user } = useContext(UserContext);
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDelComment = (e) => {
		e.preventDefault();
		setIsDeleting(true);
		deleteComment(item.comment_id).then(() => {
			setIsDeleting(false);
			setNewComment(true);
		});
	};

	if (getTopics) {
		return (
			<div className="card">
				<h3>{item.slug}</h3>
				<p>{item.description}</p>
			</div>
		);
	}

	if (comments) {
		return (
			<div className="card comment">
				<h3>{item.author}</h3>
				<p>{item.body}</p>
				<p>Votes: {item.votes}</p>
				{item.author === user ? (
					<button disabled={isDeleting} onClick={handleDelComment}>
						delete
					</button>
				) : null}
			</div>
		);
	}

	return (
		<div className={"card" + (!fullEntry ? " highlight" : "")}>
			<h3>nc/{item.topic}</h3>
			{fullEntry && <p>{new Date(item.created_at).toDateString()}</p>}
			<h2>{item.title}</h2>
			<img src={item.article_img_url} />
			{fullEntry && <p>{item.body}</p>}
			<VotesAndComments
				votes={item.votes}
				comments={item.comment_count}
				id={id}
				fullEntry={fullEntry}
				isLoading={isLoading}
				setNewComment={setNewComment}
			/>
		</div>
	);
};

export default Card;
