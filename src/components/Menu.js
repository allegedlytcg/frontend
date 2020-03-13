import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Menu = () => {
	const logOut = () => {
		localStorage.removeItem('token');
	};
	const token = localStorage.getItem('token');
	const username = localStorage.getItem('user').slice(8, 250);
	console.log(username);
	return (
		<StyledMenu>
			<h1>Allegedly TCG</h1>
			<div className='links'>
				<NavLink to='/'>Home</NavLink>
				{token ? (
					<>
						logged in as {username}
						<NavLink to='/' onClick={logOut}>
							(log out)
						</NavLink>
					</>
				) : (
					<NavLink to='/login'>log in</NavLink>
				)}
				{/* <NavLink to='/dashboard'>dashboard</NavLink>
				<NavLink to='/lobby'>lobby</NavLink> */}
			</div>
		</StyledMenu>
	);
};
const StyledMenu = styled.div`
	display: flex;
	background-color: lavender;
	justify-content: space-between;
	align-items: center;
	h1 {
		padding: 0 1rem;
	}
	.links {
		a {
			padding: 0 0.5rem;
			text-decoration: none;
		}
	}
`;

export default Menu;
