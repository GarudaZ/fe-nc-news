import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Article from "./Components/Article";
import Nav from "./Components/Nav";
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
				</Routes>
			</UserProvider>
		</>
	);
}

export default App;
