import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = () => {
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
				<button disabled>Play</button>
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
