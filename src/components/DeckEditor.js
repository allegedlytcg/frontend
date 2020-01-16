import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const DeckEditor = () => {
	//state
	const [cards, setCards] = useState([]);

	const [myDeck, setMyDeck] = useState([]);

	//get request on load
	useEffect(() => {
		axios
			.get('https://api.pokemontcg.io/v1/cards?setCode=base1') // for sure figure out how to get more than one of the sets in one get
			// .get('https://api.pokemontcg.io/v1/cards?setCode=base2')
			.then(res => {
				// console.log(res)
				setCards(res.data.cards);
			})
			.catch(err => console.log(err, '100% error'));
	}, []);

	console.log(cards);

	const addToDeck = cardId => {
		console.log(cardId)
		const updated = myDeck
		updated.push(cardId)
		setMyDeck(updated)
		console.log(myDeck)
	}

	return (
		<>
			<h1>Deck Editor</h1>
			<h3>my deck</h3>
			<h3>available cards</h3>
		<StyledDeckEditor>
			{cards.map(card => {
				return (
					<div key={card.id} className='container'>
						<img src={card.imageUrl} alt='card' onClick={()=> addToDeck(card)}/>
					</div>
				);
			})}
		</StyledDeckEditor>
		</>
	);
};

const StyledDeckEditor = styled.div`
	display: flex;
	text-align: center;
	flex-wrap: wrap;
	flex-direction: row;
		.container {
			display: flex;
			flex-direction: column;
			margin: 1rem;
			img {
				&:hover {
					cursor: pointer;
					transform: scale(1.2);
				}
			}
		}
`;

export default DeckEditor;
