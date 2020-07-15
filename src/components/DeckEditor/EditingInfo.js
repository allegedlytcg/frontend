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
	const [err, setErr] = useState('');

	const userInput = (e) => {
		setDeckName(e.target.value);
	};

	// post request to api/v1/deck
	const saveDeck = () => {
		const deckObj = {};
		deckObj.name = deckName;
		deckObj.cards = edit;

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
			.catch((err) => {
				console.log(err, 'error saving deck');
				setErr('error saving deck');
				setInterval(function () {
					setErr('');
				}, 2000);
			});
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
			<label>Deck Name</label>
			<StyledDiv>
				<input
					name='name'
					value={deckName}
					onChange={userInput}
				></input>

				{existing === false ? (
					<ButtonCont>
						<button onClick={saveDeck}>Save</button>
					</ButtonCont>
				) : (
					<ButtonCont>
						<button onClick={updateDeck}>Save</button>

						<button onClick={deleteDeck}>Delete</button>
						{deleted ? <p> Deck Succesfully Deleted!</p> : null}
					</ButtonCont>
				)}
			</StyledDiv>
			{deckName.length < 4 ? (
				<p className='validation'>
					* deck names must be at least 4 characters
				</p>
			) : null}

			{updated ? <p> Deck Succesfully Updated!</p> : null}
			{deleted ? <p> Deck Succesfully Deleted!</p> : null}
			{created ? <p> Deck Succesfully Created!</p> : null}
			{err ? <p>{err}</p> : null}
		</EditingInfoStyles>
	);
};

const EditingInfoStyles = styled.div`
	margin: 1rem 0 0 0;
	input {
		height: 1rem;
	}
	.validation {
		color: red;
		font-size: 12px;
		margin-top: 0px;
	}
`;

const ButtonCont = styled.div`
	button {
		margin: 0 0 0 1rem;
		cursor: pointer;
	}
`;

const StyledDiv = styled.div`
	display: flex;
	align-items: center;
`;

export default EditingInfo;
