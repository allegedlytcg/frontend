import React, { useState } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';

const EditingInfo = (props) => {
	const {
		edit,
		setEdit,
		existing,
		setExisting,
		deckName,
		deckId,
		getDecks,
		setDeckName,
	} = props;

	const [updated, setUpdated] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [created, setCreated] = useState(false);

	const userInput = (e) => {
		console.log(e);
		setDeckName(e.target.value);
	};

	// post request to api/v1/deck
	const saveDeck = () => {
		const deckObj = {};
		deckObj.name = deckName;
		deckObj.cards = edit;

		if (deckName.length >= 4) {
			axiosWithAuth()
				.post('/deck', deckObj)
				// # TODO redirect to somewhere makes sense after saving or maybe not
				.then((created) => {
					setCreated(true);
					getDecks();
					setInterval(function () {
						setCreated(false);
					}, 2000);
				})
				.catch((err) => console.log(err, 'error saving deck'));
		}
	};

	// put req to api/v1/deck/deckId
	const updateDeck = () => {
		const deckObj = {};
		deckObj.name = deckName;
		deckObj.cards = edit;
		if (deckName.length >= 4) {
			axiosWithAuth()
				.put(`/deck/${deckId}`, deckObj)
				.then((update) => {
					setUpdated(true);
					getDecks();
					setInterval(function () {
						setUpdated(false);
					}, 2000);
				})
				.catch((err) => console.log(err, 'for sure error'));
		}
	};

	// delete req to api/v1/deck/deckId
	const deleteDeck = () => {
		axiosWithAuth()
			.delete(`/deck/${deckId}`)
			.then((del) => {
				setDeleted(true);
				getDecks();
				setEdit([]);
				setExisting(false);
				setDeckName('');
				setInterval(function () {
					setDeleted(false);
				}, 2000);
			})
			.catch((err) => console.log(err, 'error on dlete'));
	};
	return (
		<EditingInfoStyles>
			<label>
				Deck Name <br></br>
				{deckName.length > 0 && deckName.length < 4 ? (
					<p> * (deck names must be 4 or more characters)</p>
				) : null}
			</label>
			<input name='name' value={deckName} onChange={userInput}></input>
			<p>card quantity {edit.length} / 60</p>

			{existing === false ? (
				<>
					<button onClick={saveDeck}>Save Deck</button>
					<br></br>
					{edit.length >= 1 ? (
						<p>click cards to remove them</p>
					) : null}
					{created ? <p> Deck Succesfully Created!</p> : null}
				</>
			) : (
				<ButtonCont>
					<button onClick={updateDeck}>Save Deck</button>
					<button onClick={deleteDeck}>Delete Deck</button>
					<p>click cards to remove them </p> <br></br>
					{updated ? <p> Deck Succesfully Updated!</p> : null}{' '}
					{deleted ? <p> Deck Succesfully Deleted!</p> : null}
				</ButtonCont>
			)}
		</EditingInfoStyles>
	);
};

const EditingInfoStyles = styled.div``;

const ButtonCont = styled.div``;

export default EditingInfo;
