// Modules

import React, { Component } from "react";
import FileUploader from "react-firebase-file-uploader";

// Firebase

import { firebase } from "../../../firebase";

// Components

// Config

// Styling

// Logic

class Uploader extends Component {
	state = {
		name: "",
		isUploading: false,
		progress: 0,
		fileURL: "",
	};

	handleUploadStart = () => {
		this.setState({ isUploading: true, progress: 0 });
	};
	handleUploadError = (error) => {
		console.log(error);

		this.setState({ isUploading: false });
	};
	handleUploadSuccess = (filename) => {
		this.setState({ name: filename, progress: 100, isUploading: false });
		firebase
			.storage()
			.ref("images")
			.child(filename)
			.getDownloadURL()
			.then((url) => {
				this.setState({ fileURL: url });
			});

		this.props.filename(filename);
	};
	handleProgress = (progress) => {
		this.setState({ progress });
	};

	render() {
		return (
			<div>
				<FileUploader
					accept="image/*"
					name="image"
					randomizeFilename
					storageRef={firebase.storage().ref("images")}
					onUploadStart={this.handleUploadStart}
					onUploadError={this.handleUploadError}
					onUploadSuccess={this.handleUploadSuccess}
					onProgress={this.handleUploadProgress}
				/>{" "}
				{this.state.isUploading ? (
					<p>Progress: {this.state.progress} </p>
				) : null}
				{this.state.fileURL ? (
					<img style={{ width: "300px" }} src={this.state.fileURL} alt="" />
				) : null}
			</div>
		);
	}
}

export default Uploader;
