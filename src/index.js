// Modules

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

// Components

import Routes from "./routes";

// Firebase

import { firebase } from "./firebase";

// Styling

// Logic

const App = props => {
	return (
		<BrowserRouter>
			<Routes {...props} />
		</BrowserRouter>
	);
};

firebase.auth().onAuthStateChanged(user => {
	ReactDOM.render(<App user={user} />, document.getElementById("root"));
});
