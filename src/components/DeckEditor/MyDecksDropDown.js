import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';

const MyDeckDropDown = (props) => {
	const { setEdit, setExisting, setDeckId } = props;
	const [userDecks, setUserDecks] = useState([]);

	// when rendered grab all user decks

	useEffect(() => {
		axiosWithAuth()
			.get('/deck/me')
			.then((res) => {
				setUserDecks(res.data);
			})
			.catch((err) =>
				console.log('no decks for this use or not logged in'),
			);
		return () => {};
	}, []);

	// if deck selected from dropdown update the edit state array
	const addAllToEdit = (deckObj) => {
		// next two lines clear those states when the click the create new option
		setExisting(false);
		setEdit([]);
		let newDeckObj = JSON.parse(deckObj);
		setExisting(true);
		setDeckId(newDeckObj._id);
		setEdit(newDeckObj.cards);
	};

	return (
		<>
			<select onChange={(e) => addAllToEdit(e.target.value)}>
				<option>Create New Deck</option>
				{userDecks.map((deckObj) => {
					return (
						<option
							value={JSON.stringify(deckObj)}

							key={deckObj._id}
						>
							{deckObj.name}
						</option>
					);
				})}
			</select>
		</>
	);
};

export default MyDeckDropDown;
