// Modules

import React from "react";
import { Link } from "react-router-dom";

// Config

import { CURRENT_YEAR } from "../../config";

// Components
// Styling

import style from "./Footer.module.css";

// Logic

const Footer = () => {
	return (
		<footer className={style.footer}>
			<Link to="/" className={style.logo}>
				<img src="/images/nba_logo.png" alt="logo" />
			</Link>
			<div className={style.right}>
				@CompanyName {CURRENT_YEAR} All rights reserved
			</div>
		</footer>
	);
};

export default Footer;
