import React, { useReducer, createContext, useEffect } from 'react';
import {
	cardCatalog,
	initialCatalog,
	selectedCard,
	initialSelectedCard,
	deckName,
	initialDeckName,
	userDecks,
	initialUserDecks,
	existing,
	initialExisting,
	deckId,
	initialDeckId,
	editingDeck,
	initialEdit,
} from './reducers';
import { getPokemon } from '../services/PokemonService';
import { getUserDecks } from '../services/DeckService';

export const GlobalContext = createContext();

export const GlobalState = (props) => {
	const [cardCatalogState, cardCatalogDispatch] = useReducer(
		cardCatalog,
		initialCatalog,
	);
	const [selectedCardState, selectedCardDispatch] = useReducer(
		selectedCard,
		initialSelectedCard,
	);
	const [editingDeckState, editingDeckDispatch] = useReducer(
		editingDeck,
		initialEdit,
	);
	const [deckNameState, deckNameDispatch] = useReducer(
		deckName,
		initialDeckName,
	);
	const [userDecksState, userDecksDispatch] = useReducer(
		userDecks,
		initialUserDecks,
	);

	const [existingState, existingDispatch] = useReducer(
		existing,
		initialExisting,
	);

	const [deckIdState, deckIdDispatch] = useReducer(deckId, initialDeckId);
	useEffect(() => {
		async function getState() {
			// we can move thse to the respective components later
			// i wanted to see how hitting the api worked here
			try {
				const pokemon = await getPokemon();
				const userDecks = await getUserDecks();
				cardCatalogDispatch({
					type: 'SET_INITIAL_CATALOG',
					payload: pokemon.json,
				});
				userDecksDispatch({
					type: 'SET_USER_DECKS',
					payload: userDecks,
				});
				existingDispatch({ type: 'RESET' });
				editingDeckDispatch({ type: 'RESET' });
				deckNameDispatch({ type: 'RESET' });
			} catch (error) {}
		}

		getState();
		return () => {};
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				cardCatalogState,
				cardCatalogDispatch,
				selectedCardState,
				selectedCardDispatch,
				editingDeckState,
				editingDeckDispatch,
				deckNameState,
				deckNameDispatch,
				userDecksState,
				userDecksDispatch,
				existingState,
				existingDispatch,
				deckIdState,
				deckIdDispatch,
			}}
		>
			{props.children}
		</GlobalContext.Provider>
	);
};
