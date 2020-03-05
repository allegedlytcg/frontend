import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as lodash from 'lodash'; /* sorts our get request <--------->https://masteringjs.io/tutorials/lodash/sortby*/

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
				console.log(res)
				setCards(res.data.cards);
			})
			.catch(err => console.log(err, '100% error'));
	}, []);

	// console.log(cards);

	const addToDeck = card => {
		if (card.supertype !== 'Energy'){
			let check = checkNumInDeck(card)
			if (check === false){
				console.log("error: Can not have more than 4 of the same non-elemental card.")
				return
			}
		}
		if (myDeck.length === 60) {
			console.log("Too many cards!")
			return
		}
		
		const newDeck = [...myDeck, card]
		console.log("shooting before update state", myDeck)
		setMyDeck(newDeck);
	};

	const checkNumInDeck=(card) => {
		let duplicate = 0
			for (let i = 0; i < myDeck.length; i++) {
					if (myDeck[i].id === card.id && duplicate < 3) {
						duplicate = duplicate + 1
					}
					else if (duplicate === 3){
						return false
					}
			}
			return true
	}
       
	return (
		<>
			<h1>Deck Editor</h1>
			<h3>my deck</h3>
		<StyledMyDeck>
			{myDeck.length === 0 ? <p>There are no cards in your deck</p> : myDeck.map(card => {
				console.log("Updated Deck: ", myDeck)
				return (
					<div key={Math.random()} >
						 <img src={card.imageUrl} alt='card' /> 
					</div>
				)
			})}
			</StyledMyDeck>
			<h3>available cards</h3>
			<StyledDeckEditor>
				{lodash
					.sortBy(cards, 'nationalPokedexNumber', 'supertype')
					.map(card => {
						return (
							<div key={card.id} className='container'>
								<img
									src={card.imageUrl}
									alt='card'
								/>
								<div className="buttons">
									<div className="button remove">-</div>
									<div onClick={() => addToDeck(card)} className="button add">+</div>
								</div>
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
		.buttons {
			width: 100%;
			display: flex;
			height: 60px;
		.button {
			width: 50%;
			align-items: center;
			justify-content: center;
			display: flex;

		}
		.add {
			background-color: green;
			font-weight: 800;
			font-size: 30px;
			color: white;

		}
		.remove {
			background-color: red;
			font-weight: 800;
			font-size: 30px;
			color: white;
		}
		}

		}
	}
`;

const StyledMyDeck = styled.div`
display:flex;
width: 75%;
flex-wrap: wrap;
div {
	margin: 0px;
	padding:  0px;
	display: flex;
	img {

	}
}
`
export default DeckEditor;
