import React, { useState } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';
// import * as _ from 'lodash';

const EditingCards = (props) => {
	const { edit, removeFromEdit } = props;

	const [deckName, setDeckName] = useState('');

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
			.then(console.log('cool'))
			.catch((err) => console.log(err, 'fuck you'));
	};

	return (
		<EditingDeckStyles>
			<label>Deck Name</label>
			<input name='name' value={deckName} onChange={userInput}></input>
			{edit.length} / 60
			{edit.length === 0 ? (
				<p>There are no cards in your deck</p>
			) : (
				edit.map((editing, index) => {
					return (
						<img
							src={editing.imageUrl}
							alt='cards to be added'
							key={Math.random()}
							onClick={() => removeFromEdit(editing)}
						/>
					);
				})
			)}
			<button onClick={saveDeck}>Save Deck</button>
		</EditingDeckStyles>
	);
};

const EditingDeckStyles = styled.div`
	img {
		width: 8rem;
	}

	button {
		margin-top: 2rem;
		align-self: center;
		padding: 0.5rem 1.5rem;
	}
`;

export default EditingCards;
