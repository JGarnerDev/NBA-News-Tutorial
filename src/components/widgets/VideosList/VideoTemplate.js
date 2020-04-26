// Modules

import React from "react";
import { Link } from "react-router-dom";

// Components

import CardInfo from "../CardInfo/CardInfo";
import Button from "../Buttons/Buttons";

// Config

// Styling

import style from "./VideosList.module.css";

// Logic

const VideoTemplate = props => {
	return props.data.map((item, i) => (
		<Link to={`/videos/${item.id}`} key={i}>
			<div className={style.video}>
				<div
					className={style.left}
					style={{
						background: `url(/images/videos/${item.image})`
					}}
				>
					<div></div>
				</div>
				<div className={style.right}>
					<CardInfo teams={props.teams} team={item.team} date={item.date} />
					<h2>{item.title}</h2>
				</div>
			</div>
		</Link>
	));
};

export default VideoTemplate;
