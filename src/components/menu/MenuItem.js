import React from 'react';
import styled from 'styled-components';

function MenuItem(props) {
	const { open, setOpen } = props;

	return (
		<StyledMenuItem className='nav-item'>
			<div
				href='#'
				className='icon-button'
				onClick={() => setOpen(!open)}
			>
				{props.icon}
			</div>
			{open && props.children}
		</StyledMenuItem>
	);
}

const StyledMenuItem = styled.li`
	/* .nav-item {
		width: calc(var(--nav-size) * 0.8);
		display: flex;
		align-items: center;
		justify-content: center;
	} */
`;

export default MenuItem;
