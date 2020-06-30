import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StarterDeckDropDown = (props) => {
	const { setEdit, setExisting, setDeckName } = props;
	const user = localStorage.getItem('currentUser');

	const getStarterDeck = (starterDeckName) => {
		setEdit([]);
		setDeckName('');
		setExisting(false);
		const name = starterDeckName.replace(/ /g, '').toLowerCase();
		axios
			.get(
				`https://alleged-mongo-backend.herokuapp.com/api/v1/pokemon/${name}`,
			)
			.then((starter) => {
				console.log(starter);
				setEdit(starter.data);
				setDeckName(`${user}'s ${starterDeckName} Deck`);
			})
			.catch((err) => console.log(err));
	};

	return (
		<DropdownStyles>
			<select onChange={(e) => getStarterDeck(e.target.value)}>
				<option>Starter Decks</option>
				<option>Blackout</option>
				<option>Brushfire</option>
				<option>Overgrowth</option>
				<option>Power Reserve</option>
				<option>Water Blast</option>
				<option>Zap</option>
			</select>
		</DropdownStyles>
	);
};

const DropdownStyles = styled.div``;

export default StarterDeckDropDown;
