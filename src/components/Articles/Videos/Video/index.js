// Modules
import React, { Component } from "react";
import axios from "axios";

// Components
import Header from "./Header";

// Config

import { URL } from "../../../../config";

// Styling

import style from "../../Articles.module.css";
import VideosRelated from "../../../widgets/VideosList/VideosRelated/VideosRelated";

// Logic

class Video extends Component {
	state = {
		article: [],
		team: [],
		teams: [],
		related: []
	};

	componentWillMount() {
		axios.get(`${URL}/videos?id=${this.props.match.params.id}`).then(res => {
			let article = res.data[0];
			axios.get(`${URL}/teams?id=${article.team}`).then(res => {
				this.setState({
					article: article,
					team: res.data
				});
				this.getRelated();
			});
		});
	}

	getRelated = () => {
		axios.get(`${URL}/teams`).then(res => {
			let teams = res.data;
			axios
				.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
				.then(res => {
					this.setState({
						teams: teams,
						related: res.data
					});
				});
		});
	};

	render() {
		const article = this.state.article;
		const team = this.state.team;
		return (
			<div>
				<Header teamData={team[0]} />
				<div className={style.video_body}>
					<h1>{article.title}</h1>
					<iframe
						title="videoplayer"
						width="100%"
						height="300px"
						src={`https://www.youtube.com/embed/${article.url}`}
						frameborder="0"
					/>
				</div>
				<VideosRelated data={this.state.related} />
			</div>
		);
	}
}

export default Video;
