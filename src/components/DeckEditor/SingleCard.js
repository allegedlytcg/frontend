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

	img {
		width: 25rem;
		align-self: center;
	}

	button {
		margin-top: 2rem;
		align-self: center;
		padding: 0.5rem 1.5rem;
	}
`;

export default SingleCard;
