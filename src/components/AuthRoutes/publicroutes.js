import React from "react";
import { Route, Redirect } from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";

const PublicRoutes = ({ user, component: Comp, ...rest }) => {
	return (
		<Route
			{...rest}
			component={(props) =>
				rest.restricted ? (
					user ? (
						<Redirect to={Dashboard} />
					) : (
						<Comp {...props} user={user} />
					)
				) : (
					<Redirect to="/sign-in" />
				)
			}
		/>
	);
};

export default PublicRoutes;
