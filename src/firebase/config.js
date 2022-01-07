import firebase from "firebase/app";
import "firebase/storage";
const firebaseConfig = {
	apiKey: "AIzaSyBNf4IdV0qqDeUmXz9k7FP5ASKRXvqYhtw",
	authDomain: "fir-react-image-uploads-a1faa.firebaseapp.com",
	databaseURL: "gs://fir-react-image-uploads-a1faa.appspot.com",
	projectId: "fir-react-image-uploads-a1faa",
	storageBucket: "fir-react-image-uploads-a1faa.appspot.com",
	messagingSenderId: "5403535133",
	appId: "1:5403535133:web:c1d9d73b80ea26dc5f23f4",
	measurementId: "G-TM3HK9MZ6Y",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
export { storage, firebase as default };
