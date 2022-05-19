import { combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import {
	productDetailsReducer,
	productListReducer,
} from "./Reducers/ProductReducer";
import { CartReducer } from "./Reducers/CartReducer";
import { UserloginReducer, UserProfileReducer, UserRegisterReducer } from "./Reducers/UserReducer";

const cartItemsFromLStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];
const userInfoFromLStorage = localStorage.getItem("userInfo")
	? JSON.parse(localStorage.getItem("userInfo"))
	: null ;
const intialState = {
	cart: { cartItems: cartItemsFromLStorage },
	userLogin: { userInfo: userInfoFromLStorage },
};

let reducers = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	cart: CartReducer,
	userLogin: UserloginReducer,
	userRegister: UserRegisterReducer,
	userDetails: UserProfileReducer,
});
const middleware = [thunk];

export const Store = configureStore(
	{ reducer: reducers },
	intialState,
	composeWithDevTools(applyMiddleware(...middleware))
);
