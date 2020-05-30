import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const Register = () => {
	const history = useHistory();
	const [user, setUser] = useState({
		name: '',
		password: '',
	});

	const userInput = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const userRegistration = (e) => {
		e.preventDefault();
		axios
			.post(
				`https://alleged-mongo-backend.herokuapp.com/api/v1/user/register`,
				user,
			)
			.then((res) => {
				localStorage.setItem('currentUser', res.data.name);
				localStorage.setItem('token', res.data.token);
				history.push('/');
			})
			.catch((err) => console.log(err, 'for sure error'));
	};

	return (
		<RegisterStyles>
			<h4>Register</h4>
			<form onSubmit={userRegistration}>
				<div className='labelAndInput'>
					<label>username</label> <br />
					<input
						name='name'
						placeholder='username'
						type='text'
						onChange={userInput}
						value={user.name}
						autoComplete='off'
					/>
				</div>
				<br />
				<div className='labelAndInput'>
					<label>password</label> <br />
					<input
						name='password'
						placeholder='password'
						type='password'
						onChange={userInput}
						value={user.password}
						autoComplete='off'
					/>
				</div>

				<br />
				<div className='buttonDiv'>
					<button>Register</button>
				</div>
			</form>
		</RegisterStyles>
	);
};
const RegisterStyles = styled.div`
	align-items: center;
	margin: 5rem 2rem 1rem 1rem;
	/* border: 1px solid blue; */
	border-radius: 14px;
	padding: 2rem;
	background-color: #726ca8;
	color: #fff;
	h4 {
		text-align: center;
	}
	.labelAndInput {
		input {
			border-radius: 0.25rem;
			border-style: none;
			padding: 0.25rem 0.25rem 0.25rem 0.5rem;
		}
	}
	.buttonDiv {
		display: flex;
		justify-content: center;
	}
`;
export default Register;
