import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const ENDPOINT = 'http://localhost:6000';

const Lobby = () => {
	useEffect(() => {
		const socket = io(ENDPOINT);
		socket.on('connection', () => {
			console.log(socket.id); // x8WIv7-mJelg7on_ALbx
		});
		return () => {};
	}, []);

	return <div>for sure the lobby</div>;
};

export default Lobby;

// for using socket on a different domain aka what we will have to do eventually
// the following forms are similar
// const socket = io("https://server-domain.com");
// const socket = io("wss://server-domain.com");
// const socket = io("server-domain.com"); // only in the browser when the page is served over https (will not work in Node.js)
