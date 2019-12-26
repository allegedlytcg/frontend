import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
	const [user, setUser] = useState({
		username: '',
		password: '',
	});

	const userInput = e => {
		setUser({
			[e.target.name]: e.target.value,
		});
		console.log(user);
	};

	const userLogin = e => {
		e.preventDefault();
		axios
			.post('https://newpkmtcg.herokuapp.com/api-token-auth/')
			.then(res => {
				console.log(res, 'res dont you see halo 3');
			})
			.catch(err => console.log(err, 'for sure error'));
	};

	return (
		<div>
			<form onSubmit={userLogin}>
				<label>username</label> <br />
				<input
					name='username'
					placeholder='username'
					type='text'
					onChange={userInput}
					value={user.username}
				/>
				<br />
				<label>password</label> <br />
				<input
					name='password'
					placeholder='password'
					type='password'
					onChange={userInput}
					value={user.password}
				/>
				<br />
				<button>log in</button>
			</form>
		</div>
	);
};

export default Login;
