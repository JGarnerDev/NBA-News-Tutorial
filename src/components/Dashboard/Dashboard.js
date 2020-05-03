// Modules

import React, { Component } from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState } from "draft-js";
import { stateToHTML } from "draft-js-export-html";

// Firebase

import { firebase, DBArticles, DBTeams } from "../../firebase";

// Components

import FormField from "../widgets/FormFields/FormFields";
import FileUploader from "../widgets/FileUploader/FileUploader";

// Styling

import style from "./Dashboard.module.css";

// Logic

class Dashboard extends Component {
	state = {
		editorState: EditorState.createEmpty(),
		postError: "",
		loading: false,
		formdata: {
			author: {
				element: "input",
				value: "",
				config: {
					name: "authorInput",
					type: "text",
					placeholder: "Enter your name",
				},
				validation: { required: true },
				valid: false,
				touched: false,
				validationMessage: "",
			},
			title: {
				element: "input",
				value: "",
				config: {
					name: "titleInput",
					type: "text",
					placeholder: "Enter the title",
				},
				validation: { required: true },
				valid: false,
				touched: false,
				validationMessage: "",
			},
			body: {
				element: "texteditor",
				value: "",
				valid: true,
			},
			image: {
				element: "image",
				value: "",
				valid: true,
			},
			team: {
				element: "select",
				value: "",
				config: {
					name: "teamsInput",
					options: [],
				},
				validation: { required: true },
				valid: false,
				touched: false,
				validationMessage: "",
			},
		},
	};

	componentDidMount() {
		this.loadTeams();
	}

	loadTeams = () => {
		DBTeams.once("value").then((snapshot) => {
			let team = [];
			snapshot.forEach((childSnapshot) => {
				team.push({
					id: childSnapshot.val().teamId,
					name: childSnapshot.val().city,
				});
			});

			const newFormdata = { ...this.state.formdata };
			const newEle = { ...newFormdata["team"] };

			newEle.config.options = team;
			newFormdata["team"] = newEle;

			this.setState({
				formdata: newFormdata,
			});
		});
	};

	storeFilename = (filename) => {
		this.updateForm({ id: "image" }, filename);
	};

	submitForm = (e) => {
		e.preventDefault();
		let dataToSubmit = {};
		let formIsValid = true;
		for (let key in this.state.formdata) {
			dataToSubmit[key] = this.state.formdata[key].value;
		}
		for (let key in this.state.formdata) {
			formIsValid = this.state.formdata[key].valid && formIsValid;
		}

		console.log(dataToSubmit);

		if (formIsValid) {
			this.setState({
				loading: true,
				postError: "",
			});

			DBArticles.orderByChild("id")
				.limitToLast(1)
				.once("value")
				.then((snapshot) => {
					let articleId = null;
					snapshot.forEach((childSnapshot) => {
						articleId = childSnapshot.val().id;
					});
					dataToSubmit["date"] = firebase.database.ServerValue.TIMESTAMP;
					dataToSubmit["id"] = 0;
					dataToSubmit["team"] = parseInt(dataToSubmit["team"]);

					DBArticles.push(dataToSubmit)
						.then((article) => {
							this.props.history.push(`/articles/${article.key}`);
						})
						.catch((e) => {
							this.setState({
								postError: e.message,
							});
						});
				});
		} else {
			this.setState({
				postError: "Something went wrong",
			});
		}
	};

	validate = (ele) => {
		let error = [true, ""];

		if (ele.validation.required) {
			const valid = ele.value.trim() !== "";
			const message = `${!valid ? "This field is required" : ""}`;
			error = !valid ? [valid, message] : error;
		}
		return error;
	};

	submitButton = () =>
		this.state.loading ? (
			"Loading..."
		) : (
			<div>
				<button type="submit"> Add Post</button>
			</div>
		);

	showError = () =>
		this.state.postError !== "" ? (
			<div className={style.error}>{this.state.postError}</div>
		) : (
			""
		);

	onEditorStateChange = (editorState) => {
		let contentInHTML = stateToHTML(editorState.getCurrentContent());

		this.updateForm({ id: "body" }, contentInHTML);

		this.setState({
			editorState,
		});
	};

	updateForm = (ele, content = "") => {
		const newFormdata = {
			...this.state.formdata,
		};
		const newEle = {
			...newFormdata[ele.id],
		};

		if (content === "") {
			newEle.value = ele.event.target.value;
		} else {
			newEle.value = content;
		}

		// validation fired when click/touch outside of input field
		if (ele.blur) {
			let validData = this.validate(newEle);
			newEle.valid = validData[0];
			newEle.validationMessage = validData[1];
		}

		newEle.touched = ele.blur;
		newFormdata[ele.id] = newEle;

		console.log(newFormdata);

		this.setState({
			formdata: newFormdata,
		});
	};

	render() {
		return (
			<div className={style.dashboard_wrapper}>
				<form onSubmit={this.submitForm} className={style.dashboard_form}>
					<h2>Make a new post!</h2>

					<FileUploader filename={(filename) => this.storeFilename(filename)} />

					<FormField
						id={"author"}
						formdata={this.state.formdata.author}
						change={(ele) => this.updateForm(ele)}
					/>
					<FormField
						id={"title"}
						formdata={this.state.formdata.title}
						change={(ele) => this.updateForm(ele)}
					/>
					<FormField
						id={"team"}
						formdata={this.state.formdata.team}
						change={(ele) => this.updateForm(ele)}
					/>

					<Editor
						editorState={this.state.editorState}
						wrapperClassName="draftEditor-wrapper"
						editorClassName="draftEditor-editor"
						onEditorStateChange={this.onEditorStateChange}
					/>

					{this.submitButton()}
					{this.showError()}
				</form>
			</div>
		);
	}
}

export default Dashboard;
