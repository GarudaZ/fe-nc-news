// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Article from "./Components/Article";

function App() {
	return (
		<>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/articles" element={<Home />} />
				<Route path="/articles/:article_id" element={<Article />} />
			</Routes>
		</>
	);
}

export default App;
