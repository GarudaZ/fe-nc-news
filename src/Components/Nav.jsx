import { Link } from "react-router-dom";
import { UserContext } from "./Contexts/User";
import { useContext } from "react";

const Nav = () => {
	const { user, setUser } = useContext(UserContext);

	return (
		<nav>
			<div>
				<Link to=".">Home</Link>
			</div>
			<div>User: {user}</div>
		</nav>
	);
};

export default Nav;
