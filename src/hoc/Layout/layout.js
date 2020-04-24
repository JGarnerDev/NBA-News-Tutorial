import React, { Component } from "react";
import "./layout.css";
import Header from "../../components/Header/Header";

class Layout extends Component {
	state = {};

	render() {
		return (
			<div>
				<Header />
				<div>{this.props.children}</div>
				<div>Footer</div>
			</div>
		);
	}
}

export default Layout;
