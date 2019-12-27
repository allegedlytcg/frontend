import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
	const logOut = () => {
		localStorage.removeItem('token');
	};

	if (localStorage.getItem('token')) {
		return (
			<div>
				<h1>Sidebar</h1>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/' onClick={logOut}>
					log out
				</NavLink>
				<NavLink to='/dashboard'>dashboard</NavLink>
				<NavLink to='/lobby'>lobby</NavLink>
			</div>
		);
	} else {
		return (
			<div>
				<h1>Sidebar</h1>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/login'>log in</NavLink>
				<NavLink to='/dashboard'>Dashboard</NavLink>
				<NavLink to='/lobby'>lobby</NavLink>
			</div>
		);
	}
};

export default Sidebar;
