import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

import Home from "./components/Home";

// Auth or User imports
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";

// Admin Imports
import Dashboard from "./components/admin/Dashboard";
import UsersList from "./components/admin/UsersList";
import UpdateUser from "./components/admin/UpdateUser";

import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userActions";
import { useSelector } from "react-redux";
import store from "./store";

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	const { user, isAuthenticated, loading } = useSelector(state => state.auth);
	return (
		<Router>
			<div className="App">
				<Header />
				<div className="container container-fluid">
					<ProtectedRoute path="/" component={Home} exact />
					<ProtectedRoute path="/search/:keyword" component={Home} />

					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/password/forgot" component={ForgotPassword} exact />
					<Route path="/password/reset/:token" component={NewPassword} exact />
					<ProtectedRoute path="/me" component={Profile} exact />
					<ProtectedRoute path="/me/update" component={UpdateProfile} exact />
					<ProtectedRoute
						path="/password/update"
						component={UpdatePassword}
						exact
					/>
				</div>

				<ProtectedRoute
					path="/dashboard"
					isAdmin={true}
					component={Dashboard}
					exact
				/>
				<ProtectedRoute
					path="/admin/users"
					isAdmin={true}
					component={UsersList}
					exact
				/>
				<ProtectedRoute
					path="/admin/user/:id"
					isAdmin={true}
					component={UpdateUser}
					exact
				/>

				{!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
			</div>
		</Router>
	);
}

export default App;
