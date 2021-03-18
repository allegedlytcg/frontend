import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Roller } from 'react-awesome-spinners';
import { GlobalContext } from '../../context/GlobalState';
import { buttons } from './utils/buttons';
import { cardClick } from './utils/cardClick';

const CardCatalog = () => {
	const {
		cardCatalogState,
		selectedCardDispatch,
		selectedCardState,
	} = useContext(GlobalContext);

	const [filterButton, setFilterButton] = useState('All');
	const [searchTerm, setSearchTerm] = useState('');

	const handleChange = (e) => {
		setFilterButton('All');
		setSearchTerm(e.target.value);
	};

	if (!cardCatalogState.length) {
		return (
			<AvailableCardsStyles>
				<div className='roller'>
					<Roller />
				</div>
			</AvailableCardsStyles>
		);
	}

	return (
		<>
			<AvailableCardsStyles>
				<p>Sort By</p>
				{buttons.map((buttonText) => {
					return (
						<button
							key={buttonText}
							onClick={() => setFilterButton(buttonText)}
						>
							{buttonText}
						</button>
					);
				})}
				<input onChange={handleChange} placeholder='Search...'></input>
				<br />
				<br />
				{filterButton !== 'All' ? (
					<CardPool>
						{cardCatalogState
							.filter((card) => {
								if (card.supertype !== 'Pokémon') {
									return card.supertype === filterButton;
								} else {
									return card.types.includes(filterButton);
								}
							})
							.map((card) => {
								return (
									<div key={card.id} className='cards'>
										<img
											src={card.imageUrl}
											alt='card'
											onClick={() =>
												cardClick(
													card,
													selectedCardState,
													selectedCardDispatch,
												)
											}
										/>
									</div>
								);
							})}
					</CardPool>
				) : searchTerm ? (
					<CardPool>
						{cardCatalogState
							.filter((card) =>
								card.name.toLowerCase().includes(searchTerm),
							)
							.map((card) => {
								return (
									<div key={card.id} className='cards'>
										<img
											src={card.imageUrl}
											alt='card'
											onClick={() =>
												cardClick(
													card,
													selectedCardState,
													selectedCardDispatch,
												)
											}
										/>
									</div>
								);
							})}
					</CardPool>
				) : (
					<CardPool>
						{_.sortBy(
							cardCatalogState,
							'nationalPokedexNumber',
							'supertype',
							'name',
						).map((card) => {
							return (
								<div key={card.id} className='cards'>
									<img
										src={card.imageUrl}
										alt='card'
										onClick={() =>
											cardClick(
												card,
												selectedCardState,
												selectedCardDispatch,
											)
										}
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
	}
	p {
		margin: 0.5rem 0rem;
	}
	.roller {
		min-width: 45rem;
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

export default CardCatalog;
