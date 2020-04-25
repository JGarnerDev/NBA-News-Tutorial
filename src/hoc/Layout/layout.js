// Modules

import React, { Component } from "react";

// Components

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

// Styling

import "./Layout.module.css";

// Logic

class Layout extends Component {
	state = {
		showNav: false
	};

	toggleSidenav = action => {
		this.setState({
			showNav: action
		});
	};

	render() {
		return (
			<div>
				<Header
					showNav={this.state.showNav}
					onHideNav={() => this.toggleSidenav(false)}
					onOpenNav={() => this.toggleSidenav(true)}
				/>
				<div>{this.props.children}</div>
				<Footer />
			</div>
		);
	}
}

export default Layout;
