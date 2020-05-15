import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import AvaiableCards from '../components/DeckEditor/AvailableCards';
import SingleCard from '../components/DeckEditor/SingleCard';
import EditingCards from '../components/DeckEditor/EditingCards';

const DeckEditor = () => {
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

	const cardClick = (card) => {
		const singleCard = [...selectedCard, card];
		if (singleCard.length > 1) {
			singleCard.shift();
		}
		setSelectedCard(singleCard);
	};

	const addToEdit = (card) => {
		if (card.supertype !== 'Energy') {
			let check = checkNumInDeck(card);
			if (check === false) {
				console.log(
					'error: Can not have more than 4 of the same non-elemental card.',
				);
				return;
			}
		}
		if (edit.length === 60) {
			console.log('Too many cards!');
			return;
		}

		const temp = [...edit, card];
		setEdit(temp);
	};

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

	return (
		<>
			<Container>
				<AvaiableCards
					buttons={buttons}
					cards={cards}
					requestBytype={requestBytype}
					cardClick={cardClick}
				/>
				<RightContainer>
					<SingleCard
						selectedCard={selectedCard}
						addToEdit={addToEdit}
					/>
					<EditingCards edit={edit} />
				</RightContainer>
			</Container>
		</>
	);
};

const Container = styled.div`
	display: flex;
`;

const RightContainer = styled.div``;

export default DeckEditor;
