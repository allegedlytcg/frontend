import React from 'react';
import styled from 'styled-components';

function Menu(props) {
	return (
		<MenuStyles>
			<nav className='navbar'>
				<h3>Allgedly TCG</h3>
				<ul className='navbar-nav'>{props.children}</ul>
			</nav>
		</MenuStyles>
	);
}

const MenuStyles = styled.div`
	.navbar {
		height: 4rem;
		background-color: lavender;
		padding: 0 1rem;
		border-bottom: 1px #6e6b6b;
		h3 {
			position: absolute;
		}
	}

	/* <ul> */
	.navbar-nav {
		max-width: 100%;
		height: 100%;
		display: flex;
		justify-content: flex-end;
	}
`;

export default Menu;
