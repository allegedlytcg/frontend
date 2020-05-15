import React, { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
	console.log(props);
	const [user, setUser] = useState({
		name: '',
		password: '',
	});

	const userInput = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
		console.log(user);
	};

	const userLogin = (e) => {
		e.preventDefault();
		axios
			.post(
				`https://alleged-mongo-backend.herokuapp.com/api/v1/user/login`,
				user,
			)
			.then((res) => {
				console.log(res, 'res dont you see halo 3');
				localStorage.setItem('currentUser', res.data.name);
				localStorage.setItem('token', res.data.token);
				props.history.push('');
			})
			.catch((err) => console.log(err, 'for sure error'));
	};

	return (
		<div>
			<form onSubmit={userLogin}>
				<label>username</label> <br />
				<input
					name='name'
					placeholder='username'
					type='text'
					onChange={userInput}
					value={user.name}
					autoComplete='off'
				/>
				<br />
				<label>password</label> <br />
				<input
					name='password'
					placeholder='password'
					type='password'
					onChange={userInput}
					value={user.password}
					autoComplete='off'
				/>
				<br />
				<button>log in</button>
			</form>
		</div>
	);
};

export default Login;
