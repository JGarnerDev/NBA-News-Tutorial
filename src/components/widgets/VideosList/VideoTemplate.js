// Modules

import React from "react";
import { Link } from "react-router-dom";

// Components

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
					<h2>{item.title}</h2>
				</div>
			</div>
		</Link>
	));
};

export default VideoTemplate;
