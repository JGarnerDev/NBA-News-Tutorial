// Modules

import React, { Component } from "react";

// Firebase

import { DBTeams, DBVideos, firebaseLoop } from "../../../firebase";

// Components

import Button from "../Buttons/Buttons";
import VideoTemplate from "./VideoTemplate";

// Config

// Styling

import style from "./VideosList.module.css";

// Logic

class VideosList extends Component {
	state = {
		teams: [],
		videos: [],
		start: this.props.start,
		end: this.props.start + this.props.amount,
		amount: this.props.amount
	};

	componentWillMount() {
		this.req(this.state.start, this.state.end);
	}

	req = (start, end) => {
		if (this.state.teams.length < 1) {
			DBTeams.once("value").then(snapshot => {
				const teams = firebaseLoop(snapshot);
				this.setState({
					teams
				});
			});
		}

		DBVideos.orderByChild("id")
			.startAt(start)
			.endAt(end)
			.once("value")
			.then(snapshot => {
				const videos = firebaseLoop(snapshot);
				this.setState({
					videos: [...this.state.videos, ...videos],
					start,
					end
				});
			})
			.catch(error => {
				console.log(error);
			});
	};

	renderTitle = () => {
		return this.props.title ? (
			<h3>
				<strong>NBA</strong> Videos
			</h3>
		) : null;
	};

	renderVideos = () => {
		let template = null;
		switch (this.props.type) {
			case "card":
				template = (
					<VideoTemplate data={this.state.videos} teams={this.state.teams} />
				);
				break;
			default:
				template = null;
		}
		return template;
	};

	loadMore = () => {
		let end = this.state.end + this.state.amount;
		// "this.state.end + 1" to avoid duplication of items
		this.req(this.state.end + 1, end);
		this.setState({
			end: end
		});
	};

	renderButton = () => {
		return this.props.loadmore ? (
			<Button
				type="loadmore"
				loadMore={() => this.loadMore()}
				cta="Load More Videos"
			/>
		) : (
			<Button type="linkTo" cta="More videos" linkTo="/videos" />
		);
	};

	render() {
		return (
			<div className={style.videoList}>
				{this.renderTitle()}
				{this.renderVideos()}
				{this.renderButton()}
			</div>
		);
	}
}

export default VideosList;
