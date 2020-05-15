import React from 'react';
import styled from 'styled-components';

const EditingCards = (props) => {
	const { edit } = props;
	return (
		<>
			{edit.map((editing) => {
				return (
					<EditingStyles>
						<img
							src={editing.imageUrl}
							alt='cards to be added'
							key={Math.random()}
						/>
					</EditingStyles>
				);
			})}
		</>
	);
};

const EditingStyles = styled.div`
	img {
		width: 8rem;
	}
`;

export default EditingCards;
