import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';

const MyDeckDropDown = (props) => {
	const { setEdit } = props;
	const [userDecks, setUserDecks] = useState([]);

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

	const addAllToEdit = (e) => {
		let deckArr = JSON.parse(e);
		setEdit(deckArr);
	};
	return (
		<>
			<select onChange={(e) => addAllToEdit(e.target.value)}>
				<option></option>
				{userDecks.map((deckObj) => {
					return (
						<option
							value={JSON.stringify(deckObj.cards)}
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
