import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as lodash from 'lodash'; /* sorts our get request <--------->https://masteringjs.io/tutorials/lodash/sortby*/
import axiosWithAuth from '../utils/axiosWithAuth';

const DeckEditor = () => {
	//state
	const [cards, setCards] = useState([]);

	const [myDeck, setMyDeck] = useState([]);

	// get request on load
	useEffect(() => {
		axiosWithAuth()
			.get('/pokemon/allpokemon')
			.then(res => {
				console.log(res);
				setCards(res.data);
			})
			.catch(err => console.log(err, 'can not get pokemon'));
	}, []);

	// console.log(cards);

	const addToDeck = card => {
		if (card.supertype !== 'Energy') {
			let check = checkNumInDeck(card);
			if (check === false) {
				console.log(
					'error: Can not have more than 4 of the same non-elemental card.',
				);
				return;
			}
		}
		const updated = myDeck;
		updated.push(card);
		setMyDeck(updated);
		console.log(myDeck);
	};

	const checkNumInDeck = card => {
		let duplicate = 0;
		for (let i = 0; i < myDeck.length; i++) {
			if (myDeck[i].id === card.id && duplicate < 3) {
				duplicate = duplicate + 1;
			} else if (duplicate === 3) {
				return false;
			}
		}
		return true;
	};

	return (
		<>
			<h1>Deck Editor</h1>
			<h3>my deck</h3>
			{myDeck.length === 0 ? (
				<p>There are no cards in your deck</p>
			) : (
				myDeck.map(card => {
					console.log('Updated Deck: ', myDeck);
					return (
						<div key={card.id} className='container'>
							<img src={card.imageUrl} alt='card' />{' '}
							{/*onClick={()=> removeFromDeck(card)} */}
						</div>
					);
				})
			)}
			<h3>available cards</h3>
			<StyledDeckEditor>
				{lodash
					.sortBy(cards, 'nationalPokedexNumber', 'supertype')
					.map(card => {
						console.log(card);
						return (
							<div key={card.id} className='container'>
								<img
									src={card.imageUrl}
									alt='card'
									onClick={() => addToDeck(card)}
								/>
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
