import React, { useContext } from 'react';
import styled from 'styled-components';
import { GlobalContext } from '../../context/GlobalState';

const MyDeckDropDown = () => {
	const {
		userDecksState,
		editingDeckDispatch,
		deckNameDispatch,
		existingDispatch,
		deckIdDispatch,
		selectedCardDispatch,
		cardCatalogState,
	} = useContext(GlobalContext);

	const handleChange = (deckObj) => {
		if (deckObj === 'Create New Deck') {
			editingDeckDispatch({ type: 'RESET' });
			existingDispatch({ type: 'RESET' });
			deckNameDispatch({ type: 'RESET' });
			selectedCardDispatch({
				type: 'SET_SELECTED_CARD',
				payload: cardCatalogState[0],
			});

			return;
		}

		existingDispatch({ type: 'RESET' });
		editingDeckDispatch({ type: 'RESET' });
		deckNameDispatch({ type: 'RESET' });
		const newDeckObj = JSON.parse(deckObj);
		deckNameDispatch({ type: 'SET_DECK_NAME', payload: newDeckObj.name });
		existingDispatch({ type: 'SET_EXISTING' });
		deckIdDispatch({ type: 'SET_DECK_ID', payload: newDeckObj._id });
		selectedCardDispatch({
			type: 'SET_SELECTED_CARD',
			payload: newDeckObj.cards[0],
		});
		editingDeckDispatch({
			type: 'SET_EDITING_DECK',
			payload: newDeckObj.cards,
		});
	};

	return (
		<StyledDropdown className='select'>
			<select onChange={(e) => handleChange(e.target.value)}>
				<option value={'Create New Deck'}>Create New Deck</option>
				{userDecksState.map((deckObj) => {
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
		</StyledDropdown>
	);
};

const StyledDropdown = styled.div`
	select {
		width: 140px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
`;

export default MyDeckDropDown;
