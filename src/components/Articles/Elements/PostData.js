// Modules
import React from "react";

// Components

// Styling

import style from "../Articles.module.css";

// Logic

const PostData = props => {
	return (
		<div className={style.article_PostData}>
			<div>
				Date: <span>{props.data.date}</span>
			</div>
			<div>
				Author: <span>{props.data.author}</span>
			</div>
		</div>
	);
};

export default PostData;
