// Modules

import React, { Component } from "react";
import axios from "axios";

// Components

import Button from "../widgets/Buttons/Buttons";

// Config

import { URL } from "../../config";

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

	renderTitle = () => {
		return this.props.title ? (
			<h3>
				<strong>NBA</strong> Videos
			</h3>
		) : null;
	};

	loadmore = () => {};

	renderButton = () => {
		return this.props.loadmore ? (
			<Button
				type="loadmore"
				loadmore={() => this.loadmore()}
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
				{this.renderButton()}
			</div>
		);
	}
}

export default VideosList;
