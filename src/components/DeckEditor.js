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
	let keys = Object.keys(tags)
	console.log(keys);

	useEffect(() => {
		axios

			.get('https://alleged-mongo-backend.herokuapp.com/api/v1/pokemon')
			.then((res) => {
				setCards(res.data);
        setVisible(res.data.cards)
			})
			.catch((err) => console.log(err));
		return () => {};
	}, []);



	useEffect(() => {
		let count = 0;

		filterCards()
		_.values(tags).map((tag) => {
			if (tag === true) {
				count++
			} else {

			}
		})
		if (count === 0) {
			setVisible(cards);
		}
	}, [tags]);



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
		if (myDeck.length === 60) {
			console.log('Too many cards!');
			return;
		}

		const newDeck = [...myDeck, card];
		if (!card.quantity) card.quantity = 0;
		card.quantity = card.quantity += 1;
		setMyDeck(newDeck);
	};

	const removeCard = (card) => {
		const newDeck = [...myDeck];
		card.quantity = card.quantity -= 1;
		const cardIndex = _.indexOf(newDeck, card);
		_.pullAt(newDeck, cardIndex);
		setMyDeck(newDeck);
	};

	const checkNumInDeck = (card) => {
		let duplicate = 0;
		for (let i = 0; i < myDeck.length; i++) {
			if (myDeck[i].name === card.name && duplicate < 3) {
				duplicate = duplicate + 1;
			} else if (duplicate === 3) {
				return false;
			}
		}
		return true
	}


	const toggleCheck = (e) => {
		const type = e.target.name;

		setTag({ ...tags, [type]: !tags[type] });

	}

	const filterCards = () => {

		let filteredCards = {}; // [...Water , ...Grass , ...]
		let fixed = [];
		let newTest;

		_.forIn(tags, (value, key) => {
			// console.log(value, key)
			//filter 
			if (value === true) {
				let test = _.filter(cards, _.matches({ types: [key] }))
				// let Energy = _.filter(cards, { name: `${key} Energy` })
				// let ColorlessEnergy = _.filter(cards, { name: `Double Colorless Energy` })
				// let SpecialEnergy = _.filter(cards, { supertype: `Energy`, subtype: "Special" })
				// [...Energy], ...[ColorlessEnergy], ...[SpecialEnergy]
				fixed.push(test);
				delete filteredCards[key]

			} else {
				filteredCards = { ...filteredCards, [key]: [] }
				_.merge(filteredCards, filteredCards[key])
				delete filteredCards[key]

			}
		})

		// console.log(fixed)
		newTest = _.flattenDeep(fixed)
		console.log(newTest);

		setVisible(newTest);

	}
	return (
		<DeckWrapper>
			<div className="filters">
				{keys.map(key => {
					return (

						<button value={tags.key} className={`filter ${tags[key] ? "enabled" : null}`} name={key} label={key} onClick={(e) => toggleCheck(e)}>{key}</button>
					)
				})}
			</div>
			<StyledMyDeck>
				<h1>Deck Editor</h1>
				<h3>my deck</h3>
				<div className='deck-container'>
					{myDeck.length === 0 ? (
						<p>There are no cards in your deck</p>
					) : (

							myDeck.map(card => {
								console.log('Updated Deck: ', myDeck);
								return (
									<div
										key={Math.random()}
										onClick={() => removeCard(card)}
									>
										<img src={card.imageUrl} alt='card' />
									</div>
								);
							})
						)}

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
									<img src={card.imageUrl} alt='card' />
									<div className='buttons'>
										<h1>
											{card.quantity
												? card.quantity
												: '0'}
										</h1>
										<div
											onClick={() => addToDeck(card)}
											className='button add'
										>
											+
										</div>
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
`;

const StyledMyDeck = styled.div`
display:flex;
width: 40%;
flex-wrap: wrap;
order: 1;
flex-direction: column;

.deck-container {
	margin: 0px;
	padding:  0px;
	display: flex;
	width: 40%;
	flex-wrap: wrap;
	width: 100%;
	:hover {
	}
	div {
		width: 20%;
		margin:4px;

	.deck-container {
		margin: 0px;
		padding: 0px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		width: 100%;
		:hover {
			z-index: 100;
		}
		div {
			width: 20%;
			margin: 4px;

			img {
				width: 100%;
			}
		}
	}
`;

const DeckWrapper = styled.div`
display:flex;
width: 100%;
flex-direction: column;
.filters{
	display: flex;
	flex-wrap: nowrap;
	height: 50px;
	
}
.filter {
	height: 50px;
}
.enabled {
	background-color: red;
}

`
export default DeckEditor;
