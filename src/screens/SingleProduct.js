import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link, useNavigate, useParams } from "react-router-dom";
import Message from "../components/Errors/Error";

import { useDispatch, useSelector } from "react-redux";
import { singleProductDetail } from "../Redux/Actions/ProductAction";
import { Loading } from "../components/Errors/Loading";

const SingleProduct = () => {
	const { id } = useParams();
	const navigate = useNavigate();


	const [qty, SetQty] = useState(1);
	const AddtoCart = (e) => {
		e.preventDefault();
		// console.log(id);
		navigate(`/cart/${id}?qty=${qty}`);
	};

	const dispatch = useDispatch();

	const productDetails = useSelector((state) => state.productDetails);
	const { loading, error, product } = productDetails;
	useEffect(() => {
		dispatch(singleProductDetail(id));
	}, [dispatch, id]);

	return (
		<>
			<Header />
			<div className="container single-product">
				{loading ? (
					<Loading />
				) : error ? (
					<Message variant="alert-danger">{error}</Message>
				) : (
					<>
						<div className="row">
							<div className="col-md-6">
								<div className="single-image">
									<img
										src={product.image}
										alt={product.title}
									/>
								</div>
							</div>
							<div className="col-md-6">
								<div className="product-dtl">
									<div className="product-info">
										<div className="product-name">
											{product.title}
										</div>
									</div>
									<p>{product.description}</p>

									<div className="product-count col-lg-7 ">
										<div className="flex-box d-flex justify-content-between align-items-center">
											<h6>Price</h6>
											<span>{product.price} /-</span>
										</div>
										<div className="flex-box d-flex justify-content-between align-items-center">
											<h6>Status</h6>
											{product.countInStock > 0 ? (
												<span>In Stock</span>
											) : (
												<span>unavailable</span>
											)}
										</div>
										<div className="flex-box d-flex justify-content-between align-items-center">
											<h6>Reviews</h6>
											<Rating
												value={product.rating}
												text={`${product.numReviews} reviews`}
											/>
										</div>
										{product.countInStock > 0 ? (
											<>
												<div className="flex-box d-flex justify-content-between align-items-center">
													<h6>Quantity</h6>
													<select value={qty}
													onChange={(e)=>SetQty(e.target.value)}>
														{[
															...Array(
																product.countInStock
															).keys(),
														].map((e) => (
															<option
																key={e + 1}
																value={e + 1}
															>
																{e + 1}
															</option>
														))}
													</select>
												</div>
												<button
													onClick={AddtoCart}
													className="round-black-btn"
												>
													Add To Cart
												</button>
											</>
										) : null}
									</div>
								</div>
							</div>
						</div>

						{/* RATING */}
						<div className="row my-5">
							<div className="col-md-6">
								<h6 className="mb-3">REVIEWS</h6>
								<Message variant={"alert-info mt-3"}>
									No Reviews
								</Message>
								<div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded">
									<strong>User</strong>
									<Rating />
									<span>May 11 2022</span>
									<div className="alert alert-info mt-3">
										Lorem Ipsum is simply dummy text of the
										printing and typesetting industry. Lorem
										Ipsum has been the industry's standard
										dummy text ever since the 1500s, when an
										unknown printer took a galley of type
										and scrambled it to make a type specimen
										book
									</div>
								</div>
							</div>
							<div className="col-md-6">
								<h6>WRITE A CUSTOMER REVIEW</h6>
								<div className="my-4"></div>

								<form>
									<div className="my-4">
										<strong>Rating</strong>
										<select className="col-12 bg-light p-3 mt-2 border-0 rounded">
											<option value="">Select...</option>
											<option value="1">1 - Poor</option>
											<option value="2">2 - Fair</option>
											<option value="3">3 - Good</option>
											<option value="4">
												4 - Very Good
											</option>
											<option value="5">
												5 - Excellent
											</option>
										</select>
									</div>
									<div className="my-4">
										<strong>Comment</strong>
										<textarea
											row="3"
											className="col-12 bg-light p-3 mt-2 border-0 rounded"
										></textarea>
									</div>
									<div className="my-3">
										<button className="col-12 bg-black border-0 p-3 rounded text-white">
											SUBMIT
										</button>
									</div>
								</form>
								<div className="my-3">
									<Message variant={"alert-warning"}>
										Please{" "}
										<Link to="/login">
											" <strong>Login</strong> "
										</Link>{" "}
										to write a review{" "}
									</Message>
								</div>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
};

export default SingleProduct;
