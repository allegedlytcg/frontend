import React from 'react';
import styled from 'styled-components';

const SingleCard = (props) => {
	const { selectedCard, addToEdit } = props;
	return (
		<>
			{selectedCard.map((card) => {
				return (
					<SingleCardStyles key={Math.random()}>
						<img src={card.imageUrlHiRes} alt='selected card' />
						<button onClick={() => addToEdit(card)}>+</button>
					</SingleCardStyles>
				);
			})}
		</>
	);
};

const SingleCardStyles = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 6.7rem;
	button {
		margin-top: 2rem;
		align-self: center;
		padding: 1rem 2.5rem;
	}
`;

export default SingleCard;
