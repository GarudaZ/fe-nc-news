// import { useLocation } from "react-router-dom";
import { UserContext } from "./Contexts/User";
import { useContext } from "react";

const User = () => {
	const { user } = useContext(UserContext);
	// const location = useLocation();
	console.log(user);
	return (
		<div>
			<h2>Welcome {user.username}</h2>
			<p>Here are your user details.</p>
			<h3>Username: {user.username}</h3>
			<p>Name: {user.name}</p>
			<img className="avatar home" src={user.avatar_url} />
		</div>
	);
};

export default User;
