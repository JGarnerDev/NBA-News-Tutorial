import * as firebase from "firebase";

var firebaseConfig = {
	apiKey: "AIzaSyAfpiRG6RQTnPid7Ax78YYg4MQDYHc2_II",
	authDomain: "nbaproj-45f6c.firebaseapp.com",
	databaseURL: "https://nbaproj-45f6c.firebaseio.com",
	projectId: "nbaproj-45f6c",
	storageBucket: "nbaproj-45f6c.appspot.com",
	messagingSenderId: "740877133350",
	appId: "1:740877133350:web:9be611971c9faef05368e7",
	measurementId: "G-KKHEDWW7JV"
};

firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();
const DBArticles = firebaseDB.ref("articles");
const DBTeams = firebaseDB.ref("teams");
const DBVideos = firebaseDB.ref("videos");

const firebaseLoop = snapshot => {
	const data = [];
	snapshot.forEach(childSnapshot => {
		data.push({
			...childSnapshot.val(),
			id: childSnapshot.key
		});
	});
	return data;
};

export { firebase, firebaseDB, DBArticles, DBTeams, DBVideos, firebaseLoop };
