import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../Redux/Actions/userLoginAction";

const Header = () => {
	const cart = useSelector((state) => state.cart);
	const { cartItems } = cart;
	const userLogin = useSelector((state) => state.userLogin);
	const { error, loading, userInfo } = userLogin;
	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logOut());

	};
	return (
		<div>
			<div className="header">
				<div className="container">
					{/* MOBILE HEADER */}
					<div className="mobile-header">
						<div className="container ">
							<div className="row ">
								<div className="col-6 d-flex align-items-center">
									<Link className="navbar-brand" to="/">
										<img
											alt="Home"
											src="https://images-platform.99static.com//IfMNVgqrW-tazVgq0o3e2u-gmp8=/271x245:1749x1723/fit-in/500x500/99designs-contests-attachments/112/112138/attachment_112138805"
										/>
									</Link>
								</div>
								<div className="col-6 d-flex align-items-center justify-content-end Login-Register">
									{userInfo ? (
										<div className="btn-group">
											<button
												type="button"
												className="name-button dropdown-toggle"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											>
												<i class="fas fa-user"></i>
											</button>
											<div className="dropdown-menu">
												<Link
													className="dropdown-item"
													to="/profile"
												>
													Profile
												</Link>

												<Link
													className="dropdown-item"
													to="#"
													onClick={logoutHandler}
												>
													Logout
												</Link>
											</div>
										</div>
									) : (
										<div className="btn-group">
											<button
												type="button"
												className="name-button dropdown-toggle"
												data-toggle="dropdown"
												aria-haspopup="true"
												aria-expanded="false"
											>
												Hi, user
											</button>
											<div className="dropdown-menu">
												<Link
													className="dropdown-item"
													to="/login"
												>
													Login
												</Link>

												<Link
													className="dropdown-item"
													to="/register"
												>
													Register
												</Link>
											</div>
										</div>
									)}

									<Link
										to="/cart/:id?"
										className="cart-mobile-icon"
									>
										<i className="fas fa-shopping-bag"></i>
										<span className="badge">
											{cartItems.length}
										</span>
									</Link>
								</div>
								<div className="col-12 d-flex align-items-center">
									<form className="input-group">
										<input
											type="search"
											className="form-control rounded search"
											placeholder="Search"
										/>
										<button
											type="submit"
											className="search-button"
										>
											search
										</button>
									</form>
								</div>
							</div>
						</div>
					</div>

					{/* PC HEADER */}
					<div className="pc-header">
						<div className="row">
							<div className="col-md-3 col-4 d-flex align-items-center">
								<Link className="navbar-brand" to="/">
									<img
										alt="Home"
										src="https://images-platform.99static.com//IfMNVgqrW-tazVgq0o3e2u-gmp8=/271x245:1749x1723/fit-in/500x500/99designs-contests-attachments/112/112138/attachment_112138805"
									/>
								</Link>
							</div>
							<div className="col-md-6 col-8 d-flex align-items-center">
								<form className="input-group">
									<input
										type="search"
										className="form-control rounded search"
										placeholder="Search"
									/>
									<button
										type="submit"
										className="search-button"
									>
										search
									</button>
								</form>
							</div>
							<div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
								{userInfo ? (
									<div className="btn-group">
										<button
											type="button"
											className="name-button dropdown-toggle"
											data-toggle="dropdown"
											aria-haspopup="true"
											aria-expanded="false"
										>
											Hi , {userInfo.data.fullName}
										</button>
										<div className="dropdown-menu">
											<Link
												className="dropdown-item"
												to="/profile"
											>
												profile
											</Link>
											<Link
												className="dropdown-item"
												to="#"
												onClick={logoutHandler}
											>
												Logout
											</Link>
										</div>
									</div>
								) : (
									<>
										<Link to="/register">Register</Link>
										<Link to="/login">Login</Link>
									</>
								)}

								<Link to="/cart">
									<i className="fas fa-shopping-bag"></i>
									<span className="badge">
										{cartItems.length}
									</span>
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Header;
