import React, { useContext } from 'react';
import styled from 'styled-components';
import { getStarterDecks } from '../../services/DeckService';
import { GlobalContext } from '../../context/GlobalState';

const StarterDeckDropDown = () => {
	const {
		cardCatalogState,
		editingDeckDispatch,
		deckNameDispatch,
		selectedCardDispatch,
		existingDispatch,
	} = useContext(GlobalContext);

	const user = localStorage.getItem('currentUser');

	const handleChange = async (starterDeckName) => {
		existingDispatch({ type: 'RESET' });
		editingDeckDispatch({ type: 'RESET' });

		if (starterDeckName === 'Starter Decks') {
			editingDeckDispatch({ type: 'RESET' });
			deckNameDispatch({ type: 'RESET' });
			selectedCardDispatch({
				type: 'SET_SELECTED_CARD',
				payload: cardCatalogState[0],
			});

			return;
		}

		try {
			let placeholder = '';
			if (user) placeholder = user + "'s ";

			const cards = await getStarterDecks(starterDeckName);
			editingDeckDispatch({ type: 'SET_EDITING_DECK', payload: cards });
			deckNameDispatch({
				type: 'SET_DECK_NAME',
				payload: `${placeholder}${starterDeckName} Deck`,
			});
			selectedCardDispatch({
				type: 'SET_SELECTED_CARD',
				payload: cards[0],
			});
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<DropdownStyles>
			<select onChange={(e) => handleChange(e.target.value)}>
				<option value={'Starter Decks'}>Starter Decks</option>
				<option>Blackout</option>
				<option>Brushfire</option>
				<option>Overgrowth</option>
				<option>Power Reserve</option>
				<option>Water Blast</option>
				<option>Zap</option>
			</select>
		</DropdownStyles>
	);
};

const DropdownStyles = styled.div``;

export default StarterDeckDropDown;
