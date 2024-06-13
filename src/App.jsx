import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Article from "./Components/Article";
import Nav from "./Components/Nav";
import User from "./Components/User"
import Topics from "./Components/Topics";
import ErrorPage from "./Components/ErrorPage";
import { useState } from "react";
import { UserProvider } from "./Components/Contexts/User";

function App() {
	const [user, setUser] = useState("jessjelly");

	return (
		<>
			<UserProvider>
				<Header />
				<Nav user={user} setUser={setUser} />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/articles" element={<Home />} />
					<Route path="/articles/:article_id" element={<Article />} />
					<Route path="/topics" element={<Topics />} />
					<Route path="/user" element={<User />} />
					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</UserProvider>
		</>
	);
}

export default App;
