import React from 'react';
import styled from 'styled-components';

const SingleCard = (props) => {
	const { selectedCard, addToEdit } = props;
	return (
		<>
			{selectedCard.map((card) => {
				// console.log(card);
				return (
					<SingleCardStyles key={card.imageUrlHiRes}>
						<img src={card.imageUrlHiRes} alt='selected card' />
						<p>{card.name}</p>
						<div>
							<button onClick={() => addToEdit(card)}>+</button>
						</div>
					</SingleCardStyles>
				);
			})}
		</>
	);
};

const SingleCardStyles = styled.div`
	min-width: 50rem;
	display: flex;
	flex-direction: row;
	img {
		width: 22rem;
	}
	button {
		max-width: 2rem;
		max-height: 2rem;
	}
`;

export default SingleCard;
