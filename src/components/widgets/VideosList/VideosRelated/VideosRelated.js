// Modules

import React from "react";

// Components

import VideoTemplate from "../VideoTemplate";

// Config

// Styling

import style from "../VideosList.module.css";

// Logic

const VideosRelated = props => (
	<div className={style.videosRelated}>
		<VideoTemplate data={props.data} teams={props.teams} />
	</div>
);

export default VideosRelated;
