// Modules
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

// Components

import Home from "./components/Home/Home";
import News from "./components/Articles/News/Main/index";
import VideosMain from "./components/Articles/Videos/Main/index";
import NewsArticle from "./components/Articles/News/Post/index";
import VideoArticle from "./components/Articles/Videos/Video/index";
import Layout from "./hoc/Layout/Layout";

// Styling

// Logic

class Routes extends Component {
	state = {};
	render() {
		return (
			<Layout>
				<Switch>
					<Route path="/" exact component={Home} />
					<Route path="/news" exact component={News} />
					<Route path="/articles/:id" exact component={NewsArticle} />
					<Route path="/videos/:id" component={VideoArticle} />
					<Route path="/videos" exact component={VideosMain} />
				</Switch>
			</Layout>
		);
	}
}

export default Routes;
