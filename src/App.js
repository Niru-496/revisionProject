import React from "react";
import "./css/App.css";
import "./css/Media.Queries.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import Login from "./screens/Login";
import Register from "./screens/Register";
import CartScreen from "./screens/CartScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotFound from "./screens/NotFound";

const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/" element={<HomeScreen />} />
				<Route path="/products/:id" element={<SingleProduct />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/profile" element={<ProfileScreen />} />
				<Route path={`/cart/:id`} element={<CartScreen />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>

	);
};

export default App;
