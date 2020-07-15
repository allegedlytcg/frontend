import React from 'react';
import styled from 'styled-components';
import * as _ from 'lodash';
import { Roller } from 'react-awesome-spinners';

const AvailableCards = (props) => {
	const {
		buttons,
		cards,
		requestBytype,
		cardClick,
		handleAvailableSearch,
		loading,
	} = props;
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
				<input
					onChange={handleAvailableSearch}
					placeholder='Search...'
				></input>
				<br />
				{loading ? (
					<div className='roller'>
						<Roller />
					</div>
				) : (
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
				)}
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
		:focus {
			background-color: #121e7c;
			color: white;
			outline: none;
			border-style: none;
		}
	}
	p {
		margin: 0.5rem 0rem;
	}
	.roller {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 78vh;
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
