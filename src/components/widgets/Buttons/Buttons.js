import React from "react";
import { Link } from "react-router-dom";

import style from "./Buttons.module.css";

const buttons = props => {
	let template = null;

	switch (props.type) {
		case "loadmore":
			template = (
				<div className={style.button} onClick={props.loadMore}>
					{props.cta}
				</div>
			);
			break;
		case "linkTo":
			template = (
				<Link to={props.linkTo} className={style.button}>
					{props.cta}
				</Link>
			);
			break;
		default:
			template = null;
	}

	return template;
};

export default buttons;
