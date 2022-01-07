import { storage } from "./firebase/config";
import React, { useState } from "react";
import { Progress } from "antd";
import "antd/dist/antd.css";
import "./App.css";

function App() {
	const [images, setImages] = useState([]);
	const [urls, setUrls] = useState([]);
	const [progress, setProgress] = useState(0);

	const handleChange = (e) => {
		for (let i = 0; i < e.target.files.length; i++) {
			const newImage = e.target.files[i];
			newImage["id"] = Math.random();
			setImages((prevState) => [...prevState, newImage]);
		}
	};

	const handleUpload = () => {
		const promises = [];
		// eslint-disable-next-line array-callback-return
		images.map((image) => {
			const uploadTask = storage.ref(`images/${image.name}`).put(image);
			promises.push(uploadTask);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					let progress = Math.round(
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					setProgress(progress);
				},
				(error) => {
					console.log(error);
				},
				async () => {
					await storage
						.ref("images")
						.child(image.name)
						.getDownloadURL()
						.then((urls) => {
							setUrls((prevState) => [...prevState, urls]);
						});
				}
			);
		});

		Promise.all(promises)
			.then(() => console.log("All images uploaded"))
			.catch((err) => console.log(err));
	};

	console.log("images: ", images);
	console.log("urls", urls);

	return (
		<div>
			<Progress
				type="circle"
				strokeColor={{
					"0%": "#108ee9",
					"100%": "#87d068",
				}}
				percent={progress}
			/>
			<br />
			<br />
			<input type="file" multiple onChange={handleChange} />
			<button onClick={handleUpload}>Upload</button>
			<br />
			{urls.map((url, i) => (
				<div key={i}>
					<a href={url}>{url}</a>
				</div>
			))}
			<br />
			{urls.map((url, i) => (
				<img
					className="resize-image"
					key={i}
					src={url || "http://via.placeholder.com/300"}
					alt=""
				/>
			))}
		</div>
	);
}

export default App;
