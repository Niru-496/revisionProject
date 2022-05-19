import React, { useEffect } from "react";
import Header from "./../components/Header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCartItems } from "../Redux/Actions/CartAction";

const CartScreen = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// console.log(id);
	const qty = window.location.search
		? Number(window.location.search.split("=")[1])
		: 1;

	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	useEffect(() => {
		if (id) {
			dispatch(addToCartItems(id, qty));
		}
	}, [dispatch, id, qty]);
	const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0);

	const chaneRouteToLogin = () => {
		navigate(`/login?redirect=shipping`);
	};
	const RemoveCartItem = (product) => {
		// console.log(product);
		dispatch(RemoveCartItem(product));
	};

	return (
		<>
			<Header />
			{/* Cart */}
			<div className="container">
				{cartItems.length === 0 ? (
					<div className=" alert alert-info text-center mt-3">
						Your cart is empty
						<Link
							className="btn btn-success mx-5 px-5 py-3"
							to="/"
							style={{
								fontSize: "12px",
							}}
						>
							SHOPPING NOW
						</Link>
					</div>
				) : (
					<>
						<div className=" alert alert-info text-center mt-3">
							Total Cart Products
							<Link
								className="text-success mx-2"
								to={`/cart/${id}`}
							>
								({cartItems.length})
							</Link>
						</div>
						{/* cartiterm */}
						{cartItems.map((item, i) => (
							<div className="cart-iterm row" key={i}>
								<div
									onClick={() => RemoveCartItem(item.product)}
									className="remove-button d-flex justify-content-center align-items-center"
								>
									<i className="fas fa-times"></i>
								</div>
								<div className="cart-image col-md-3">
									<img src={item.image} alt={item.title} />
								</div>
								<div className="cart-text col-md-5 d-flex align-items-center">
									<Link to={`/products/${item.product}`}>
										<h4>{item.title}</h4>
									</Link>
								</div>
								<div className="cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column justify-content-center">
									<h6>{item.qty}</h6>
									<select
										value={item.qty}
										onChange={(y) =>
											dispatch(
												addToCartItems(
													item.product,
													Number(y.target.value)
												)
											)
										}
									>
										{[
											...Array(item.countInStock).keys(),
										].map((x) => (
											<option key={x + 1} value={x + 1}>
												{x + 1}
											</option>
										))}
									</select>
								</div>
								<div className="cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-start  d-flex flex-column justify-content-center col-sm-7">
									<h6>Price</h6>
									<h4>{item.price}/-</h4>
								</div>
							</div>
						))}

						{/* End of cart iterms */}
						<div className="total">
							<span className="sub">total:</span>
							<span className="total-price">{total}/-</span>
						</div>
						<hr />
						<div className="cart-buttons d-flex align-items-center row">
							<Link to="/" className="col-md-6 ">
								<button>Continue To Shopping</button>
							</Link>
							{total > 0 && (
								<div className="col-md-6 d-flex justify-content-md-end mt-3 mt-md-0">
									<button onClick={chaneRouteToLogin}>
										Checkout
									</button>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default CartScreen;
