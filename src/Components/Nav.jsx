import { Link, useLocation } from "react-router-dom";
import { UserContext } from "./Contexts/User";
import { useContext } from "react";

const Nav = () => {
	const { user } = useContext(UserContext);
	const location = useLocation();

	return (
		<nav>
			<Link
				className={location.pathname === "/" ? "nav-box current" : "nav-box"}
				to="."
			>
				<p>Home</p>
			</Link>
			<Link
				className={
					location.pathname === "/topics" ? "nav-box current" : "nav-box"
				}
				to="./topics"
			>
				<p>Topics</p>
			</Link>
			<Link
				className={
					location.pathname === "/user" ? "nav-box current" : "nav-box"
				}
				to="./user"
			>
				<p className="userLabel" alt="link to userpage">
					{user.username}
				</p>
				<img className="avatar" src={user.avatar_url} />
			</Link>
		</nav>
	);
};

export default Nav;
