import React, { useState } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';

const EditingCards = (props) => {
	const {
		edit,
		setEdit,
		removeFromEdit,
		existing,
		setExisting,
		deckId,
		getDecks,
		deckName,
		setDeckName,
	} = props;

	const [updated, setUpdated] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [created, setCreated] = useState(false);

	const userInput = (e) => {
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
		// forceUpdate();
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
		<EditingDeckStyles>
			<EditingInfo>
				<div>
					<label>
						Deck Name{' '}
						{deckName.length < 4 ? (
							<p> * (deck names must be 4 or more characters)</p>
						) : null}
					</label>
					<br />
					<input
						name='name'
						value={deckName}
						onChange={userInput}
					></input>
					<p>Card quantity {edit.length} / 60</p>
				</div>
				{existing === false ? (
					<>
						<button onClick={saveDeck}>Save Deck</button>
						<br></br>

						{created ? <p>Deck Succesfully Created!</p> : null}
					</>
				) : (
					<ButtonCont>
						<button onClick={updateDeck}>Save Deck</button>
						<button onClick={deleteDeck}>Delete Deck</button>
						{updated ? <p>Deck Succesfully Updated!</p> : null}
						{deleted ? <p>Deck Succesfully Deleted!</p> : null}
					</ButtonCont>
				)}
			</EditingInfo>
			<EditingArr>
				{edit.length === 0 ? (
					<>
						<p>There are no cards in your deck</p>
						<br></br>
					</>
				) : (
					<>
						<p>Click cards to remove them</p>
						{edit.map((editing, index) => {
							return (
								<img
									src={editing.imageUrl}
									alt='cards to be added'
									key={index}
									onClick={() => removeFromEdit(editing)}
								/>
							);
						})}
					</>
				)}
			</EditingArr>
		</EditingDeckStyles>
	);
};

const ButtonCont = styled.div`
	flex-direction: row;
	button {
		margin: 0rem 1rem 0rem 0rem;
		width: 8rem;
	}
`;

const EditingDeckStyles = styled.div`
	flex-direction: column;
	img {
		width: 7rem;
	}
	p {
		margin: 0;
	}
	button {
		margin-top: 1rem;
		width: 8rem;
		padding: 0.5rem 1.5rem;
	}
`;

const EditingInfo = styled.div`
	display: flex;
	flex-direction: column;
	input {
		width: 10rem;
	}
	label {
		display: flex;
	}
`;

const EditingArr = styled.div`
	max-height: 15rem;
	overflow: auto;
	overflow-x: hidden;
	margin-right: 1rem;
`;

export default EditingCards;
