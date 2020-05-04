// Modules

import React from "react";
import { Link, withRouter } from "react-router-dom";

// Components

//  Firebase

import { firebase } from "../../../firebase";

// Styling

import FontAwesome from "react-fontawesome";
import style from "./SideNav.module.css";

// Logic

const SideNavItems = (props) => {
	const items = [
		{
			type: style.option,
			icon: "home",
			text: "Home",
			link: "/",
			login: "",
		},
		{
			type: style.option,
			icon: "file-text-o",
			text: "News",
			link: "/news",
			login: "",
		},
		{
			type: style.option,
			icon: "play",
			text: "Videos",
			link: "/videos",
			login: "",
		},
		{
			type: style.option,
			icon: "sign-in",
			text: "Dashboard",
			link: "/dashboard",
			login: false,
		},
		{
			type: style.option,
			icon: "sign-in",
			text: "Sign-in",
			link: "/sign-in",
			login: true,
		},
		{
			type: style.option,
			icon: "sign-out",
			text: "Sign-out",
			link: "/sign-out",
			login: false,
		},
	];

	const ele = (item, i) => (
		<div key={i} className={item.type}>
			<Link to={item.link}>
				<FontAwesome name={item.icon} />
				{item.text}
			</Link>
		</div>
	);

	const restricted = (item, i) => {
		let template = null;

		if (props.user === null && item.login) {
			template = ele(item, i);
		}
		if (props.user !== null && !item.login) {
			if (item.link === "/sign-out") {
				template = (
					<div
						key={i}
						className={item.type}
						onClick={() => {
							firebase
								.auth()
								.signOut()
								.then(() => {
									props.history.push("/");
								});
						}}
					>
						<FontAwesome name={item.icon} />
						{item.text}
					</div>
				);
			} else {
				template = ele(item, i);
			}
		}

		return template;
	};

	const showItems = () => {
		return items.map((item, i) => {
			return item.login !== "" ? restricted(item, i) : ele(item, i);
		});
	};

	return <div onClick={props.onHideNav}>{showItems()}</div>;
};

export default withRouter(SideNavItems);
