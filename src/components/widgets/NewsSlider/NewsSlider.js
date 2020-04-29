// Modules

import React, { Component } from "react";
import { DBArticles, firebaseLoop } from "../../../firebase";
// Components

import SliderTemplates from "./SliderTemplates";

// Styling
// Logic

class NewsSlider extends Component {
	state = {
		news: []
	};

	componentWillMount() {
		DBArticles.limitToFirst(3)
			.once("value")
			.then(snapshot => {
				const news = firebaseLoop(snapshot);
				this.setState({
					news
				});
			})
			.catch(error => {
				console.log(error);
			});
	}

	render() {
		return (
			<SliderTemplates
				data={this.state.news}
				type={this.props.type}
				settings={this.props.settings}
			/>
		);
	}
}

export default NewsSlider;
