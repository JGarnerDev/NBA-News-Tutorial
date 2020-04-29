// Modules
import React from "react";
import moment from "moment";

// Components

// Styling

import style from "../Articles.module.css";

// Logic

const formatDate = date => {
	return moment(date).format("MM-DD-YYYY");
};

const PostData = props => {
	return (
		<div className={style.article_PostData}>
			<div>
				Date: <span>{formatDate(props.data.date)}</span>
			</div>
			<div>
				Author: <span>{props.data.author}</span>
			</div>
		</div>
	);
};

export default PostData;
