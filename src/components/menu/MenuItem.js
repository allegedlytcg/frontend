import React from 'react';
import styled from 'styled-components';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function MenuItem(props) {
	const { open, setOpen } = props;
	const user = localStorage.getItem('currentUser');
	return (
		<StyledMenuItem>
			{user ? (
				<div className='user'>
					<FontAwesomeIcon icon={faUser} />
					{user}
				</div>
			) : null}
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
	display: flex;
	align-items: center;
	justify-content: center;
	/* cursor: pointer; */

	.user {
		svg {
			margin: 0 1rem;
			color: rgb(120, 122, 128);
		}
		margin: 1rem;
	}
`;

export default MenuItem;
