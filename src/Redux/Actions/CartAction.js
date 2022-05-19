import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Constants/CartConstant";

export const addToCartItems = (id, qty) => async (dispatch, getState) => {
	const { data } = await axios.get(
		`https://revision1project.herokuapp.com/product/${id}`
	);
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			title: data.title,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});

	localStorage.setItem(
		"cartItems",
		JSON.stringify(getState().cart.cartItems)
	);
};

export const RemoveFromCart = (product) => async (dispatch, getState) => {

	dispatch({

		type: CART_REMOVE_ITEM,
		payload: product,
	});

	localStorage.setItem(
		"cartItems",
		JSON.stringify(getState().cart.cartItems)
	);
};
