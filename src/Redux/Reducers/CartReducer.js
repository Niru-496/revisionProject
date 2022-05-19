import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../Constants/CartConstant";

export const CartReducer = (state = { cartItems: [] }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			const item = action.payload;
			const existItem = state.cartItems.find(
				(e) => e.product === item.product
			);
			if (existItem) {
				return {
					...state,
					cartItems: state.cartItems.map((e) =>
						e.product === existItem.product ? item : e
					),
				};
			} else {
				return {
					...state,
					cartItems: [...state.cartItems, item],
				};
			}
		case CART_REMOVE_ITEM:
			const cart = state.cartItems.filter((x) => {
				return x.product !== action.payload.product;
			});
			return {
				...state,

				cartItems: cart,
			};
		default:
			return state;
	}
};
