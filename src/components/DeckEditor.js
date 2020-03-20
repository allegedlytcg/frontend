import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as _ from 'lodash'; /* sorts our get request <--------->https://masteringjs.io/tutorials/lodash/sortby  <--------->  https://lodash.com/docs/4.17.15  */

const DeckEditor = () => {
	//state
	const [cards, setCards] = useState([]);
	const [visible, setVisible] = useState([])
	const [myDeck, setMyDeck] = useState([]);
	const [tags, setTag] = useState({
		"Colorless": false,
		"Darkness": false,
		"Dragon": false,
		"Fairy": false,
		"Fighting": false,
		"Fire": false,
		"Grass": false,
		"Lightning": false,
		"Metal": false,
		"Psychic": false,
		"Water": false
	});



	//get request on load
	useEffect(() => {
		axios
			.get('https://api.pokemontcg.io/v1/cards?pageSize=1000?&setCode=base1|base2|base3|base4|base5|basep|gym1|gym2') // for sure figure out how to get more than one of the sets in one get
			.then(res => {
				setCards(res.data.cards);
				setVisible(res.data.cards)
			})
	}, []);

	useEffect(() => {
		
	
		filterCards()
		_.values(tags).map((tag) => {
			if (tag === true) {
			} else {
			}
		})

	}, [tags]);



	const addToDeck = card => {
		if (card.supertype !== 'Energy') {
			let check = checkNumInDeck(card)
			if (check === false) {
				console.log("error: Can not have more than 4 of the same non-elemental card.")
				return
			}
		}
		if (myDeck.length === 60) {
			console.log("Too many cards!")
			return
		}

		const newDeck = [...myDeck, card]
		if (!card.quantity) card.quantity = 0;
		card.quantity = card.quantity += 1;
		setMyDeck(newDeck);
	};

	const removeCard = card => {
		const newDeck = [...myDeck]
		card.quantity = card.quantity -= 1;
		const cardIndex = _.indexOf(newDeck, card)
		_.pullAt(newDeck, cardIndex);
		setMyDeck(newDeck);
	}

	const checkNumInDeck = (card) => {
		let duplicate = 0
		for (let i = 0; i < myDeck.length; i++) {
			if (myDeck[i].name === card.name && duplicate < 3) {
				duplicate = duplicate + 1
			}
			else if (duplicate === 3) {
				return false
			}
		}
		return true
	}

	const toggleCheck = (e) => {
		const type = e.target.name;
		setTag({ ...tags, [type]: !tags[type] });


		// let Energy = _.filter(cards, { name: `${type} Energy` })
		// let ColorlessEnergy = _.filter(cards, { name: `Double Colorless Energy` })
		// let SpecialEnergy = _.filter(cards, { supertype: `Energy`, subtype: "Special" })
		// let update = [...filteredCards, ...Energy, ...ColorlessEnergy, ...SpecialEnergy]
		// console.log(filteredCards)
	}

	const filterCards = () => {

		let filteredCards = {}; // [...Water , ...Grass , ...]

		_.forIn(tags, (value, key) => {
			//filter 
			if (value === true) {
				let additional = _.filter(cards, { types: [key] })
				filteredCards[key] = additional;
				_.merge(filteredCards, filteredCards[key])
				delete filteredCards[key]

			} else {
				filteredCards = { ...filteredCards, [key]: [] }
				_.merge(filteredCards, filteredCards[key])
				delete filteredCards[key]

			}
		})
		
		console.log(filteredCards)
		setVisible(filteredCards);

	}
	return (
		<DeckWrapper>
			<button value={tags.Water} className={tags.Water ? "enabled" : null} name="Water" label="Water" onClick={(e) => toggleCheck(e)}>Water</button>
			<button value={tags.Grass} className={tags.Grass ? "enabled" : null} name="Grass" label="Grass" onClick={(e) => toggleCheck(e)}>Grass</button>
			<button value={tags.Fire} className={tags.Fire ? "enabled" : null} name="Fire" label="Fire" onClick={(e) => toggleCheck(e)}>Fire</button>

			<StyledMyDeck>
				<h1>Deck Editor</h1>
				<h3>my deck</h3>
				<div className="deck-container">
					{myDeck.length === 0 ? <p>There are no cards in your deck</p> : myDeck.map(card => {
						console.log("Updated Deck: ", myDeck)
						return (
							<div key={Math.random()} onClick={() => removeCard(card)} >
								<img src={card.imageUrl} alt='card' />
							</div>
						)
					})}
				</div>
			</StyledMyDeck>
			<StyledDeckEditor>
				<h3>available cards</h3>
				<div>
					{(_
						.sortBy(visible, 'nationalPokedexNumber', 'supertype')
						.map(card => {
						
								return (
								<div key={card.id} className='container'>
									<img
										src={card.imageUrl}
										alt='card'
									/>
									<div className="buttons">
										<h1>{card.quantity ? card.quantity : '0'}</h1>
										<div onClick={() => addToDeck(card)} className="button add">+</div>
									</div>
								</div>
							);
							}

						))}
				</div>

			</StyledDeckEditor>
		</DeckWrapper>
	);
};

const StyledDeckEditor = styled.div`
	order: 1;
	display: flex;
	text-align: center;
	flex-wrap: wrap;
	width: 80%;
	flex-direction: column;
	div {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}
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
width: 40%;
flex-wrap: wrap;
order: 2;
flex-direction: column;

.deck-container {
	margin: 0px;
	padding:  0px;
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 100%;
	:hover {
	}
	div {
		width: 20%;
		margin:4px;

		img {
			width: 100%;
		}
	}
}
`

const DeckWrapper = styled.div`
display:flex;
width: 100%;
.enabled {
	background-color: red;
}

`
export default DeckEditor;
