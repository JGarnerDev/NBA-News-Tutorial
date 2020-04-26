// Modules

import React from "react";
import { Link } from "react-router-dom";
import Slick from "react-slick";

// Components

// Styling

import style from "./NewsSlider.module.css";

// Logic

const SliderTemplates = props => {
	let template = null;

	const settings = {
		dots: true,
		infinite: true,
		arrows: false,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,

		// bring in settings assigned in Home.js and overrides the above when conflicts occur
		...props.settings
	};

	switch (props.type) {
		case "featured":
			template = props.data.map((item, i) => {
				return (
					<div key={i}>
						<div className={style.featuredItem}>
							<div
								className={style.featuredImage}
								style={{
									background: `url(../images/articles/${item.image})`
								}}
							></div>
							<Link to={`/articles/${item.id}`}>
								<div className={style.featuredCaption}>{item.title}</div>
							</Link>
						</div>
					</div>
				);
			});
			break;
		// case "secondary":
		// 	template = template = props.data.map((item, i) => {
		// 		return (
		// 			<div key={i}>
		// 				<div className={style.featuredItem}>
		// 					<div
		// 						className={style.featuredImage}
		// 						style={{
		// 							background: `url(../images/articles/${item.image})`
		// 						}}
		// 					></div>
		// 					<Link to={`/articles/${item.id}`}>
		// 						<div className={style.featuredCaption}>{item.title}</div>
		// 					</Link>
		// 				</div>
		// 			</div>
		// 		);
		// 	});
		// 	break;
		default:
			template = null;
	}

	return <Slick {...settings}>{template}</Slick>;
};

export default SliderTemplates;
