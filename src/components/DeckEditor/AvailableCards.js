import React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';

const AvailableCards = (props) => {
	const { buttons, cards, requestBytype, cardClick } = props;
	return (
		<>
			<AvailableCardsStyles>
				<p>Sort By</p>
				{buttons.map((buttonText) => {
					return (
						<button
							key={buttonText}
							onClick={() => requestBytype(buttonText)}
						>
							{buttonText.toUpperCase()}
						</button>
					);
				})}
				<CardPool>
					{_.sortBy(
						cards,
						'nationalPokedexNumber',
						'supertype',
						'name',
					).map((card) => {
						return (
							<div key={card.id} className='cards'>
								<img
									src={card.imageUrl}
									alt='card'
									onClick={() => cardClick(card)}
								/>
							</div>
						);
					})}
				</CardPool>
			</AvailableCardsStyles>
		</>
	);
};

const AvailableCardsStyles = styled.div`
	margin: 1rem;
	cursor: pointer;
	button {
		margin: 0 1rem 1rem 0;
		margin-right: 1rem;
		cursor: pointer;
	}
`;

const CardPool = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 65rem;
	max-height: 80vh;
	overflow: scroll;
	overflow-x: hidden;
	/* width */
	::-webkit-scrollbar {
		width: 10px;
	}

	/* Track */
	::-webkit-scrollbar-track {
		background: #f1f1f1;
		border-radius: 10px;
	}

	/* Handle */
	::-webkit-scrollbar-thumb {
		background: #888;
		border-radius: 10px;
	}

	/* Handle on hover */
	::-webkit-scrollbar-thumb:hover {
		background: #555;
	}
	img {
		width: 11rem;
		margin: 0 1rem 1rem 0;
	}
`;

export default AvailableCards;
