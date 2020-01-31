import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = () => {
	const logOut = () => {
		localStorage.removeItem('token');
	};

	if (localStorage.getItem('token')) {
		return (
			<StyledSidebar>
				<h1>Sidebar</h1>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/' onClick={logOut}>
					log out
				</NavLink>
				<NavLink to='/dashboard'>dashboard</NavLink>
				<NavLink to='/lobby'>lobby</NavLink>
			</StyledSidebar>
		);
	} else {
		return (
			<StyledSidebar>
				<h1>Sidebar</h1>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/register'>Register</NavLink>
				<NavLink to='/login'>log in</NavLink>
			</StyledSidebar>
		);
	}
};

const StyledSidebar = styled.div`
	display: flex;
	flex-direction: column;
	background-color: lavender;
	/* height: 100%; */
`;

export default Sidebar;
