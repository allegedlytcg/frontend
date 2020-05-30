import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Menu = () => {
	const logOut = () => {
		localStorage.removeItem('token');
	};
	const token = localStorage.getItem('token');
	const name = localStorage.getItem('currentUser');

	return (
		<StyledMenu>
			<NavLink to='/'>
				<h3>Allegedly TCG</h3>
			</NavLink>
			<div className='links'>
				<NavLink to='/'>Home</NavLink>
				{token ? (
					<>
						logged in as {name}
						<NavLink to='/' onClick={logOut}>
							(log out)
						</NavLink>
					</>
				) : (
					<NavLink to='/registerandlogin'>log in</NavLink>
				)}
			</div>
		</StyledMenu>
	);
};
const StyledMenu = styled.div`
	display: flex;
	background-color: lavender;
	justify-content: space-between;
	align-items: center;

	h3,
	a {
		padding: 0 1rem;
		color: black;
		text-decoration: none;
	}
	.links {
		margin-right: 1rem;
		a {
			padding: 0 0.5rem;
			/* text-decoration: none; */
		}
	}
`;

export default Menu;
