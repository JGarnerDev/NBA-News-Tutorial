// Modules
import React from "react";

// Components

// Config

// Styling

import style from "../Articles.module.css";

// Logic

const TeamInfo = props => {
	console.log(props);

	return (
		<div className={style.article_TeamHeader}>
			<div
				className={style.left}
				style={{
					background: `url('/images/teams/${props.team.logo}')`
				}}
			></div>
			<div className={style.right}>
				<div>
					<span>
						{props.team.city} {props.team.name}
					</span>
				</div>
				<div>
					<strong>
						W: {props.team.stats[0].wins} L: {props.team.stats[0].defeats}
					</strong>
				</div>
			</div>
		</div>
	);
};

export default TeamInfo;
