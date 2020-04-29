// Modules
import React, { Component } from "react";

// Firebase

import {
	firebaseDB,
	DBTeams,
	DBVideos,
	firebaseLoop
} from "../../../../firebase";

// Components
import Header from "./Header";

// Config

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
		firebaseDB
			.ref(`videos/${this.props.match.params.id}`)
			.once("value")
			.then(snapshot => {
				let article = snapshot.val();
				DBTeams.orderByChild("teamId")
					.equalTo(article.team)
					.once("value")
					.then(snapshot => {
						const team = firebaseLoop(snapshot);
						this.setState({
							article,
							team
						});
						this.getRelated();
					});
			});
	}

	getRelated = () => {
		DBTeams.once("value").then(snapshot => {
			const teams = firebaseLoop(snapshot);

			DBVideos.orderByChild("team")
				.equalTo(this.state.article.team)
				.limitToFirst(3)
				.once("value")
				.then(snapshot => {
					const related = firebaseLoop(snapshot);
					this.setState({
						teams,
						related
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
