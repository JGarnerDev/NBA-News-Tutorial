// Modules

import React, { Component } from "react";
import { firebase, DBArticles, firebaseLoop } from "../../../firebase";
// Components

import SliderTemplates from "./SliderTemplates";

// Styling
// Logic

class NewsSlider extends Component {
	state = {
		news: [],
	};

	componentWillMount() {
		DBArticles.limitToFirst(3)
			.once("value")
			.then((snapshot) => {
				const news = firebaseLoop(snapshot);

				news.forEach((item, i) => {
					firebase
						.storage()
						.ref("images")
						.child(item.image)
						.getDownloadURL()
						.then((url) => {
							news[i].image = url;
							this.setState({ news });
						});
				});
				// this.setState({
				// 	news
				// });
			})
			.catch((error) => {
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
