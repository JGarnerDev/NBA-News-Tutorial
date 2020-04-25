// Modules

import React from "react";
import SideNav from "react-simple-sidenav";

// Components

import SideNavItems from "./SideNavItems";

// Styling
// Logic

const SideNavigation = props => {
	return (
		<div>
			<SideNav showNav={props.showNav} onHideNav={props.onHideNav}>
				<SideNavItems />
			</SideNav>
		</div>
	);
};

export default SideNavigation;
