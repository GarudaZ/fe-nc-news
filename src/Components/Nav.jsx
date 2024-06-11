import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./Contexts/User";
import { useContext } from "react";

const Nav = () => {
	const { user } = useContext(UserContext);
	const location = useLocation();

	return (
		<nav>
			<Link
				className={location.pathname === "/" ? "navBox current" : "navBox"}
				to="."
			>
				Home
			</Link>
			<Link
				className={
					location.pathname === "/topics" ? "navBox current" : "navBox"
				}
				to="./topics"
			>
				Topics
			</Link>
			<div className="navBox disable">User: {user}</div>
		</nav>
	);
};

export default Nav;
