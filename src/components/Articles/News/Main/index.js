// Modules

import React from "react";

// Components

import NewsSlider from "../../../widgets/NewsSlider/NewsSlider";
import NewsList from "../../../widgets/NewsList/NewsList";

// Config

// Styling

// Logic

const News = () => (
	<div>
		<NewsSlider
			type="featured"
			settings={{ dots: false }}
			start={0}
			amount={3}
		/>
		<NewsList type="main" loadMore={true} start={3} amount={3} />
	</div>
);

export default News;
