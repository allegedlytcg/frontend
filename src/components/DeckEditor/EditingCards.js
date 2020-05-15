import React, { useState } from 'react';
import styled from 'styled-components';
import axiosWithAuth from '../../utils/axiosWithAuth';
import * as _ from 'lodash';

const EditingCards = (props) => {
	const { edit, removeFromEdit } = props;

	const [deckName, setDeckName] = useState('');

	const userInput = (e) => {
		setDeckName(e.target.value);
	};

	const saveDeck = () => {
		const deckObj = {};
		deckObj.name = deckName;
		deckObj.cards = edit;

		axiosWithAuth()
			.post('/deck', deckObj)
			.then(console.log('cool'))
			.catch((err) => console.log(err, 'fuck you'));
	};

	return (
		<>
			<label>Deck Name</label>
			<input name='name' value={deckName} onChange={userInput}></input>
			{edit.length} / 60
			{edit.length === 0 ? <p>There are no cards in your deck</p> : null}
			{edit.map((editing, index) => {
				return (
					<img
						src={editing.imageUrl}
						alt='cards to be added'
						key={Math.random()}
						style={{ width: '8rem' }}
						onClick={() => removeFromEdit(editing)}
					/>
				);
			})}
			<button
				style={{
					marginTop: '2rem',
					alignSelf: 'center',
					padding: '0.5rem 1.5rem',
				}}
				onClick={saveDeck}
			>
				Save Deck
			</button>
		</>
	);
};

export default EditingCards;
