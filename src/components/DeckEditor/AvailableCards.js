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
	margin: 0.5rem 1rem;
	cursor: pointer;
	button {
		margin: 0 1rem 1rem 0;
		margin-right: 1rem;
		cursor: pointer;
	}
	p {
		margin: 0.5rem 0rem;
	}
`;

const CardPool = styled.div`
	display: flex;
	flex-wrap: wrap;
	min-width: 45rem;
	max-width: 45rem;
	max-height: 78vh;
	overflow: auto;
	overflow-x: hidden;

	img {
		width: 10rem;
		margin: 0 1rem 1rem 0;
	}
`;

export default AvailableCards;
