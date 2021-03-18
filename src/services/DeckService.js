import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth';

export const getUserDecks = async () => {
	try {
		const decks = await axiosWithAuth().get('/deck/me');
		return decks.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const getStarterDecks = async (starterDeckName) => {
	const name = starterDeckName.replace(/ /g, '').toLowerCase();

	try {
		const deck = await axios.get(
			`https://alleged-mongo-backend.herokuapp.com/api/v1/pokemon/${name}`,
		);
		return deck.data;
	} catch (error) {
		console.log(error);
		return [];
	}
};

export const saveDeck = async (deckObj) => {
	return await axiosWithAuth().post('/deck', deckObj);
};
export const updateDeck = async (deckId, deckObj) => {
	return await axiosWithAuth().put(`/deck/${deckId}`, deckObj);
};

export const deleteDeck = async (deckId) => {
	return await axiosWithAuth().delete(`/deck/${deckId}`);
};
