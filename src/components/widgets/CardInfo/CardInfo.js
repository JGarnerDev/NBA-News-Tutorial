// Modules

import React from "react";
import moment from "moment";

// Components

// Styling

import style from "./CardInfo.module.css";
import FontAwesome from "react-fontawesome";

// Logic

const formatDate = date => {
	return moment(date).format("MM-DD-YYYY");
};

const CardInfo = props => {
	const teamName = (teams, team) => {
		let data = teams.find(item => {
			return item.teamId === team;
		});
		if (data) {
			return data.name;
		}
	};

	return (
		<div className={style.cardInfo}>
			<span className={style.teamName}>
				{teamName(props.teams, props.team)}
			</span>
			<span className={style.date}>
				<FontAwesome name="clock-o" />
				{formatDate(props.date)}
			</span>
		</div>
	);
};

export default CardInfo;
