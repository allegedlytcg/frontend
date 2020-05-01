import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as _ from 'lodash'; /* sorts our get request <--------->https://masteringjs.io/tutorials/lodash/sortby  <--------->  https://lodash.com/docs/4.17.15  */

const NewDeckEditor = () => {
	const [cards, setCards] = useState([]);
	const [selectedCard, setSelectedCard] = useState([]);
	const [edit, setEdit] = useState([]);

	useEffect(() => {
		axios
			.get('https://alleged-mongo-backend.herokuapp.com/api/v1/pokemon')
			.then((res) => {
				// console.log(res);
				setCards(res.data);
			})
			.catch((err) => console.log(err));
		return () => {};
	}, []);

	let buttons = [
		'all',
		'colorless',
		'grass',
		'fighting',
		'fire',
		'lightning',
		'psychic',
		'water',
		'trainer',
		'energy',
	];

	const requestBytype = (buttonText) => {
		if (buttonText === 'all') buttonText = '';
		axios
			.get(
				`https://alleged-mongo-backend.herokuapp.com/api/v1/pokemon/${buttonText}`,
			)
			.then((res) => {
				setCards(res.data);
			})
			.catch((err) => console.log(err));
	};

	const focused = (card) => {
		const showCase = [...selectedCard, card];
		if (showCase.length > 1) {
			showCase.shift();
		}
		setSelectedCard(showCase);
	};

	const addToEdit = (card) => {
		const temp = [...edit, card];
		setEdit(temp);
	};

	return (
		<>
			<div>
				<p>filters</p>
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
			</div>
			<Editor>
				<AvailableCards>
					{_.sortBy(cards, 'nationalPokedexNumber', 'supertype').map(
						(card) => {
							return (
								<div key={card.id} className='cards'>
									<img
										src={card.imageUrl}
										alt='card'
										onClick={() => focused(card)}
									/>
								</div>
							);
						},
					)}
				</AvailableCards>
				<div>
					{selectedCard.map((card) => {
						return (
							<ShowCase>
								<img
									src={card.imageUrlHiRes}
									alt='selected card'
								/>
								<button onClick={() => addToEdit(card)}>
									+
								</button>
							</ShowCase>
						);
					})}
					{edit.map((editing) => {
						return (
							<img
								src={editing.imageUrl}
								alt='cards to be added'
							/>
						);
					})}
				</div>
			</Editor>
		</>
	);
};

const ShowCase = styled.div`
	display: flex;
	flex-direction: column;
	img {
		max-width: 30rem;
	}
`;

const Editor = styled.div`
	display: flex;
`;

const AvailableCards = styled.div`
	display: flex;
	flex-wrap: wrap;
	width: 60rem;
	max-height: 10rem;
`;
export default NewDeckEditor;
