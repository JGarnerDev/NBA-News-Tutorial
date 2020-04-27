// Modules
import React from "react";

// Components

import TeamInfo from "../../Elements/TeamInfo";
import PostData from "../../Elements/PostData";

// Styling

// Logic

const Header = props => {
	const renderTeamInfo = team => {
		return team ? <TeamInfo team={team} /> : null;
	};

	const renderPostData = (date, author) => <PostData data={{ date, author }} />;

	return (
		<div>
			{renderTeamInfo(props.teamData)}
			{renderPostData(props.date, props.author)}
		</div>
	);
};

export default Header;
