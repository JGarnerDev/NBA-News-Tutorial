// Modules
import React, { Component } from "react";
import axios from "axios";

// Components
import Header from "./Header";

// Config

import { URL } from "../../../../config";

// Styling

import style from "../../Articles.module.css";

// Logic

class NewsArticle extends Component {
	state = {
		article: [],
		team: []
	};

	componentWillMount() {
		axios.get(`${URL}/articles?id=${this.props.match.params.id}`).then(res => {
			let article = res.data[0];
			axios.get(`${URL}/teams?id=${article.team}`).then(res => {
				this.setState({
					article: article,
					team: res.data
				});
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
						style={{ background: `url('/images/articles/${article.image}')` }}
					></div>
					<div className={style.article_text}>{article.body}</div>
				</div>
			</div>
		);
	}
}

export default NewsArticle;
