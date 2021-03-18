import React, { useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import { Roller } from 'react-awesome-spinners';
import { GlobalContext } from '../../context/GlobalState';
import { cardClick } from './utils/cardClick';

const EditingCards = () => {
	const {
		editingDeckState,
		selectedCardState,
		selectedCardDispatch,
	} = useContext(GlobalContext);

	if (!editingDeckState)
		return (
			<RollerContainer>
				<Roller></Roller>
			</RollerContainer>
		);

	return (
		<EditingDeckStyles>
			<EditingArr id='editing-arr'>
				{editingDeckState.length === 0 ? (
					<div className='no-cards'>
						<p
							style={{
								color: 'red',
							}}
						>
							* There are no cards in your deck, you must add at
							least 1 card to save
						</p>
						<br></br>
					</div>
				) : (
					<>
						{_.sortBy(
							editingDeckState,
							'type',
							'nationalPokedexNumber',
							'supertype',
							'name',
						).map((editing, index) => {
							return (
								<img
									src={editing.imageUrl}
									alt='cards to be added'
									key={index}
									onClick={() =>
										cardClick(
											editing,
											selectedCardState,
											selectedCardDispatch,
										)
									}
								/>
							);
						})}
					</>
				)}
			</EditingArr>
		</EditingDeckStyles>
	);
};

const EditingDeckStyles = styled.div`
	flex-direction: column;
	cursor: pointer;
	margin-left: 0rem;
	width: 100%;

	img {
		width: 9rem;
		margin-right: -2.1rem;
		&:hover {
			transform: scale(1.2);
		}
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

const EditingArr = styled.div`
	max-height: 78vh;
	overflow: auto;
	overflow-x: hidden;
	flex-direction: row;
	padding: 0 10px 0 0;
	box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
`;

const RollerContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default EditingCards;
