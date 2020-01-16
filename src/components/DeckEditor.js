import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DeckEditor = () => {
	//state
	const [cards, setCards] = useState([]);

	const [myDeck, setMyDeck] = useState([]);
	// let myDeck = [];

	//get request on load
	useEffect(() => {
		axios
			.get('https://api.pokemontcg.io/v1/cards?setCode=base1') // for sure figure out how to get more than one of the sets in one get
			// .get('https://api.pokemontcg.io/v1/cards?setCode=base2')
			.then(res => {
				// console.log(res.data.cards)
				setCards(res.data.cards);
			})
			.catch(err => console.log(err, '100% error'));
	}, []);

	console.log(cards);

	return (
		<StyledDeckEditor>
			<h1>Deck Editor</h1>
			<h3>my deck</h3>
			<h3>available cards</h3>
			{cards.map(card => {
				console.log(card);
				return (
					<div key={card.id} className='container'>
						<img src={card.imageUrl} alt='card' />
						<div>
							<button
								onClick={() => {
									setMyDeck(card.imageUrl);
								}}>
								add
							</button>
						</div>
					</div>
				);
			})}
		</StyledDeckEditor>
	);
};

const StyledDeckEditor = styled.div`
	display: flex;
	text-align: center;
	flex-direction: column;
	flex-wrap: wrap;
	.container {
		/* flex-direction: row; */
	}
`;

export default DeckEditor;
