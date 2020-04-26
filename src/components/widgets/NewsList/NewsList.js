// Modules

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import axios from "axios";

// Config

import { URL } from "../../../config";

// Components

import Button from "../Buttons/Buttons";
import CardInfo from "../CardInfo/CardInfo";

// Styling

import style from "./NewsList.module.css";

// Logic

class NewsList extends Component {
	state = {
		teams: [],
		items: [],
		start: this.props.start,
		end: this.props.start + this.props.amount,
		amount: this.props.amount
	};

	componentWillMount() {
		this.req(this.state.start, this.state.end);
	}

	req = (start, end) => {
		if (this.state.teams.length < 1) {
			axios.get(`${URL}/teams`).then(res => {
				this.setState({
					teams: res.data
				});
			});
		}

		axios.get(`${URL}/articles?_start=${start}&_end=${end}`).then(res => {
			this.setState({
				items: [...this.state.items, ...res.data]
			});
		});
	};

	loadMore = () => {
		let end = this.state.end + this.state.amount;
		this.req(this.state.end, end);
		this.setState({
			end: end
		});
	};

	renderNews = type => {
		let template = null;

		switch (type) {
			case "card":
				template = this.state.items.map((item, i) => (
					<CSSTransition
						classNames={{
							enter: style.wrapper,
							enterActive: style.wrapper_enter
						}}
						timeout={1000}
						key={i}
					>
						<div>
							<div className={style.card}>
								<Link to={`/articles/${item.id}`}>
									<CardInfo
										teams={this.state.teams}
										team={item.team}
										date={item.date}
									/>
									<h2>{item.title} </h2>
								</Link>
							</div>
						</div>
					</CSSTransition>
				));
				break;
			default:
				template = null;
		}
		return template;
	};

	render() {
		return (
			<div>
				<TransitionGroup component="div" className="list">
					{this.renderNews(this.props.type)}
				</TransitionGroup>

				<Button
					type="loadmore"
					loadMore={() => this.loadMore()}
					cta="Load More News"
				/>

				<div onClick={() => this.loadMore()}></div>
			</div>
		);
	}
}

export default NewsList;
