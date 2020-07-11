import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
const Home = () => {
	const token = localStorage.getItem('token');
	let angularCall = axios.create({
		baseURL: 'https://localhost:6000/api/v1/socket/jesus',
		headers: {
			authorization: token,
		},
	});
	const toAngular= ()=> {
		// angularCall().then(res => console.log(res)).catch(err => console.log(err))
		axios.get('https://localhost:6000/api/v1/socket/jesus').then(res => console.log(res)).catch(err => console.log(err))
	}
	return (
		<StyledHome>
			<h1>Welcome to Allegedly TCG</h1>
			<div className='buttons'>
				<Link to='registerandlogin'>
					<button>Create New Account</button>
				</Link>
				<Link to='deckeditor'>
					<button>Deck Editor</button>
				</Link>
				<p>coming soon</p>
				<a href="http://localhost:4200"><button onClick={toAngular}>Play</button></a>
			</div>
		</StyledHome>
	);
};

const StyledHome = styled.div`
	margin: 0 auto;
	h1 {
		text-align: center;
	}
	.buttons {
		display: flex;
		flex-direction: column;
		align-items: center;
		button {
			margin: 1rem;
			width: 10rem;
			padding: 1rem 2rem;
		}
	}
`;

export default Home;
