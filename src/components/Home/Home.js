// Modules

import React from "react";

// Components

import NewsSlider from "../widgets/NewsSlider/NewsSlider";
import NewsList from "../widgets/NewsList/NewsList";

// Styling
// Logic

const Home = () => {
	return (
		<div>
			<NewsSlider
				type="featured"
				start={0}
				amount={3}
				settings={{
					dots: false
				}}
			/>

			<NewsList type="card" loadmore={true} start={3} amount={3} />

			{/* <NewsSlider
				type="secondary"
				start={0}
				amount={3}
				settings={{
					dots: false
				}}
			/> */}
		</div>
	);
};

export default Home;
