import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const EditingCards = (props) => {
	const { edit, cardClick } = props;

	return (
		<EditingDeckStyles>
			<EditingArr id='editing-arr'>
				{edit.length === 0 ? (
					<div className='no-cards'>
						<p>There are no cards in your deck</p>
						<br></br>
					</div>
				) : (
					<>
						{edit.map((editing, index) => {
							return (
								<img
									src={editing.imageUrl}
									alt='cards to be added'
									key={index}
									onClick={() => cardClick(editing)}
								/>
							);
						})}
					</>
				)}
			</EditingArr>
		</EditingDeckStyles>
	);
};

const EditingDeckStyles = styled.div`
	flex-direction: column;
	cursor: pointer;
	img {
		width: 7rem;
		margin-right: -2.6rem;
		&:hover {
				transform: scale(1.2);

		}
	}
	p {
		margin: 0;
	}
	button {
		margin-top: 1rem;
		width: 8rem;
		padding: 0.5rem 1.5rem;
	}
`;

const EditingArr = styled.div`
	margin-left: -1rem;
	max-height: 44rem; 
	overflow: auto;
	overflow-x: hidden;
	margin-right: 1rem;
	flex-direction: row;
	padding: 2rem 2rem 2rem 1rem;

	&:first-child {
	}
	.editing {
	}
`;

export default EditingCards;
