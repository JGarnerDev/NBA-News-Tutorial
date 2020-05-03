// Modules
import React, { Component } from "react";

// Firebase

import {
	firebase,
	firebaseDB,
	DBTeams,
	firebaseLoop,
} from "../../../../firebase";

// Components
import Header from "./Header";

// Styling

import style from "../../Articles.module.css";

// Logic

class NewsArticle extends Component {
	state = {
		article: [],
		team: [],
		imageURL: "",
	};

	getImageURL = (filename) => {
		firebase
			.storage()
			.ref("images")
			.child(filename)
			.getDownloadURL()
			.then((url) => {
				this.setState({
					imageURL: url,
				});
			});
	};

	componentWillMount() {
		firebaseDB
			.ref(`articles/${this.props.match.params.id}`)
			.once("value")
			.then((snapshot) => {
				let article = snapshot.val();
				DBTeams.orderByChild("teamId")
					.equalTo(article.team)
					.once("value")
					.then((snapshot) => {
						const team = firebaseLoop(snapshot);
						this.setState({
							article,
							team,
						});
						this.getImageURL(article.image);
					});
			});
	}

	render() {
		const article = this.state.article;
		const team = this.state.team;

		return (
			<div className={style.article}>
				<Header
					teamData={team[0]}
					date={article.date}
					author={article.author}
				/>
				<div className={style.article_body}>
					<h1>{article.title}</h1>
					<div
						className={style.article_image}
						style={{ background: `url('${this.state.imageURL}')` }}
					></div>
					<div
						className={style.article_text}
						dangerouslySetInnerHTML={{ __html: article.body }}
					></div>
				</div>
			</div>
		);
	}
}

export default NewsArticle;
