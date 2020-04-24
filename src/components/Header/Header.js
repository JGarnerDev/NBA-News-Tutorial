import React from "react";
import style from "./header.module.css";
import { Link } from "react-router-dom";

import FontAwesome from "react-fontawesome";

const Header = () => {
	const Nav = () => (
		<div className={style.barsContainer}>
			<FontAwesome
				name="bars"
				style={{ color: "white", padding: "15px", cursor: "pointer" }}
			/>
		</div>
	);

	const logo = () => {
		return (
			<Link to="/" className={style.logo}>
				<img src="/images/nba_logo.png" alt="logo" />
			</Link>
		);
	};

	return (
		<header className={style.header}>
			<div className={style.header_options}>
				{Nav()}
				{logo()}
			</div>
		</header>
	);
};

export default Header;
