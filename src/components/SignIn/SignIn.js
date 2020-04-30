// Modules

import React, { Component } from "react";

// Firebase

import { firebase } from "../../firebase";

// Components

import FormField from "../widgets/FormFields/FormFields";

// Config

// Styling

import style from "./SignIn.module.css";

// Logic

class SignIn extends Component {
	state = {
		registerError: "",
		loading: false,
		formdata: {
			email: {
				element: "input",
				value: "",
				config: {
					name: "emailInput",
					type: "email",
					placeholder: "Enter your email"
				},
				validation: { required: true, email: true },
				valid: false,
				touched: false,
				validationMessage: ""
			},
			password: {
				element: "input",
				value: "",
				config: {
					name: "passwordInput",
					type: "password",
					placeholder: "Enter your password"
				},
				validation: { required: true, password: true },
				valid: false,
				touched: false,
				validationMessage: ""
			}
		}
	};

	validate = ele => {
		let error = [true, ""];

		if (ele.validation.email) {
			const valid = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
				ele.value
			);
			const message = `${!valid ? "Must be a valid email!" : ""}`;
			error = !valid ? [valid, message] : error;
		}
		if (ele.validation.password) {
			const valid = ele.value.length >= 5;
			const message = `${
				!valid ? "Your password's gotta be longer than 5 characters!" : ""
			}`;
			error = !valid ? [valid, message] : error;
		}

		if (ele.validation.required) {
			const valid = ele.value.trim() !== "";
			const message = `${!valid ? "This field is required" : ""}`;
			error = !valid ? [valid, message] : error;
		}
		return error;
	};

	submitForm = (event, type) => {
		event.preventDefault();
		if (type !== null) {
			let dataToSubmit = {};
			let formIsValid = true;

			for (let key in this.state.formdata) {
				dataToSubmit[key] = this.state.formdata[key].value;
			}
			for (let key in this.state.formdata) {
				formIsValid = this.state.formdata[key].valid && formIsValid;
			}
			if (formIsValid) {
				this.setState({
					loading: true,
					registerError: ""
				});
				if (type) {
					firebase
						.auth()
						.signInWithEmailAndPassword(
							dataToSubmit.email,
							dataToSubmit.password
						)
						.then(() => {
							this.props.history.push("/");
						})
						.catch(error => {
							this.setState({ loading: false, registerError: error.message });
						});
				} else {
					firebase
						.auth()
						.createUserWithEmailAndPassword(
							dataToSubmit.email,
							dataToSubmit.password
						)
						.then(() => {
							this.props.history.push("/");
						})
						.catch(error => {
							this.setState({ loading: false, registerError: error.message });
						});
				}
			}
		}
	};

	submitButton = () =>
		this.state.loading ? (
			"Loading..."
		) : (
			<div>
				<button
					onClick={event => {
						this.submitForm(event, false);
					}}
				>
					Register!{" "}
				</button>
				<button
					onClick={event => {
						this.submitForm(event, true);
					}}
				>
					Log in!{" "}
				</button>
			</div>
		);

	updateForm = ele => {
		const newFormdata = {
			...this.state.formdata
		};
		const newEle = {
			...newFormdata[ele.id]
		};
		newEle.value = ele.event.target.value;

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
			formdata: newFormdata
		});
	};

	showError = () =>
		this.state.registerError !== "" ? (
			<div className={style.error}>{this.state.registerError}</div>
		) : (
			""
		);

	render() {
		return (
			<div className={style.logContainer}>
				<form
					onSubmit={event => {
						this.submitForm(event, null);
					}}
				>
					<h2> Register or log in! </h2>
					<FormField
						id={"email"}
						formdata={this.state.formdata.email}
						change={ele => this.updateForm(ele)}
					/>
					<FormField
						id={"password"}
						formdata={this.state.formdata.password}
						change={ele => this.updateForm(ele)}
					/>

					{this.submitButton()}
					{this.showError()}
				</form>
			</div>
		);
	}
}

export default SignIn;
