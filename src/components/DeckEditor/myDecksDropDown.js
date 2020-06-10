import React, { useEffect, useState } from 'react';
import axiosWithAuth from '../../utils/axiosWithAuth';

const MyDeckDropDown = (props) => {
	const { setEdit } = props;
	const [userDecks, setUserDecks] = useState([]);

	useEffect(() => {
		axiosWithAuth()
			.get('/deck/me')
			.then((res) => {
				// console.log(res.data);
				setUserDecks(res.data);
			})
			.catch((err) => console.log('no decks fuck face'));
		return () => {};
	}, []);

	const addAllToEdit = (e) => {
		let poop = JSON.parse(e);
		console.log(poop);
		setEdit(poop);
	};
	return (
		<>
			<select onChange={(e) => addAllToEdit(e.target.value)}>
				<option></option>
				{userDecks.map((names) => {
					// console.log(names.cards);
					return (
						<option
							value={JSON.stringify(names.cards)}
							key={names._id}
						>
							{names.name}
						</option>
					);
				})}
			</select>
		</>
	);
};

export default MyDeckDropDown;
