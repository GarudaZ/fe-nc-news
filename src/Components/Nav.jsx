import { Link } from "react-router-dom";
import { UserContext } from "./Contexts/User";
import { useContext } from "react";

const Nav = () => {
	const { user } = useContext(UserContext);

	return (
		<nav>
			<Link to=".">Home</Link>
			<Link to="./topics">Topics</Link>
			<div>User: {user}</div>
		</nav>
	);
};

export default Nav;
