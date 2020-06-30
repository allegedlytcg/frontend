import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AvaiableCards from '../components/DeckEditor/AvailableCards';
import SingleCard from '../components/DeckEditor/SingleCard';
import EditingInfo from '../components/DeckEditor/EditingInfo';
import EditingCards from '../components/DeckEditor/EditingCards';
import MyDeckDropDown from '../components/DeckEditor/MyDecksDropDown';
import StarterDeckDropDown from '../components/DeckEditor/StarterDeckDropDown';
import * as _ from 'lodash';
import axiosWithAuth from '../utils/axiosWithAuth';

const DeckEditor = () => {
	// states yo
	const [cards, setCards] = useState([]);
	const [selectedCard, setSelectedCard] = useState([]);
	const [edit, setEdit] = useState([]);
	const [existing, setExisting] = useState(false);
	const [deckId, setDeckId] = useState('');
	const [userDecks, setUserDecks] = useState([]);
	const [deckName, setDeckName] = useState('');

	// on load fills available cards array and sends bulbasaur to the singlecard component
	useEffect(() => {
		axios
			.get('https://alleged-mongo-backend.herokuapp.com/api/v1/pokemon')
			.then((res) => {
				setCards(res.data);
				setSelectedCard([res.data[70]]);
			})
			.catch((err) => console.log(err));
		return () => {};
	}, []);

	// get this out of this file later
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

	// adds the button text to the end of request endpoint
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

	// sends this to the singlecard component
	const cardClick = (card) => {
		const singleCard = [...selectedCard, card];
		if (singleCard.length > 1) singleCard.shift();
		setSelectedCard(singleCard);
	};

	// limits pokemon and trainer cards to 4
	const checkNumInDeck = (card) => {
		let duplicate = 0;
		for (let i = 0; i < edit.length; i++) {
			if (edit[i].name === card.name && duplicate < 3) {
				duplicate = duplicate + 1;
			} else if (duplicate === 3) {
				return false;
			}
		}
		return true;
	};

	// add to editing array
	const addToEdit = (card) => {
		if (
			card.supertype !== 'Energy' ||
			card.name === 'Double Colorless Energy'
		) {
			let check = checkNumInDeck(card);
			if (check === false) return;
		}
		if (edit.length === 60) return;

		const temp = [...edit, card];

		setEdit(temp);
	};

	// get user decks
	const getDecks = () => {
		axiosWithAuth()
			.get('/deck/me')
			.then((res) => {
				setUserDecks(res.data);
			})
			.catch((err) =>
				console.log('no decks for this use or not logged in'),
			);
		return () => {};
	};

	// remove from editing state array
	const removeFromEdit = (card) => {
		const newDeck = [...edit];
		let cardIndex = _.indexOf(newDeck, card);
		_.pullAt(newDeck, cardIndex);
		setEdit(newDeck);
	};

	return (
		<>
			<Container>
				<AvaiableCards
					buttons={buttons}
					cards={cards}
					requestBytype={requestBytype}
					cardClick={cardClick}
				/>
				<div>
					<SingleCard
						selectedCard={selectedCard}
						addToEdit={addToEdit}
						removeFromEdit={removeFromEdit}
					/>
				</div>
				<RightContainer>
					<DropdownContainer>
						<StarterDeckDropDown
							className='starterDecks'
							setEdit={setEdit}
							setExisting={setExisting}
							setDeckName={setDeckName}
						/>
						<MyDeckDropDown
							className='myDecks'
							setDeckName={setDeckName}
							setEdit={setEdit}
							setExisting={setExisting}
							setDeckId={setDeckId}
							getDecks={getDecks}
							userDecks={userDecks}
						/>
					</DropdownContainer>
					<EditingInfo
						edit={edit}
						addToEdit={addToEdit}
						setEdit={setEdit}
						existing={existing}
						setExisting={setExisting}
						deckName={deckName}
						deckId={deckId}
						getDecks={getDecks}
						setDeckName={setDeckName}
					/>
					<EditingStyles>
						<EditingCards edit={edit} cardClick={cardClick} />
					</EditingStyles>
				</RightContainer>
			</Container>
		</>
	);
};

// css yo
const Container = styled.div`
	display: flex;
`;

const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 1rem 1rem 0rem 0.4rem;
`;

const EditingStyles = styled.div`
	flex-direction: row;
	flex-wrap: wrap;
`;

const DropdownContainer = styled.div`
	display: flex;
	margin: 0.9rem 0 0 0;
`;

export default DeckEditor;
