import { createContext, useState } from "react";
// import { fetchUser } from "../../api";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState({
		username: "jessjelly",
		name: "Jess Jelly",
		avatar_url:
			"https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141",
	});
	// useEffect(() => {
	// 			fetchUsers(user)
	// 				.then((response) => {
	// 					// setError(null);
	// 					// setArticles(response.data);
	// 					// setIsLoading(false);
	// 					if (newComment) {
	// 						setNewComment(false);
	// 					}
	// 				})
	// 				.catch((err) => {
	// 					setError({ err });
	// 					console.log(err);
	// 				});
	// 		}
	// 	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
