import React from 'react';
import styled from 'styled-components';
import {
	CardCatalog,
	SingleCard,
	EditingInfo,
	EditingCards,
	MyDecksDropDown,
	StarterDeckDropDown,
} from '../components/DeckEditor';

const DeckEditor = () => {
	return (
		<>
			<Container>
				<CardCatalog />
				<RightContainer>
					<DropdownContainer>
						<StarterDeckDropDown />
						<MyDecksDropDown />
					</DropdownContainer>
					<EditingInfo />
					<div style={{ display: 'flex' }}>
						<SingleCard />
						<EditingStyles>
							<EditingCards />
						</EditingStyles>
					</div>
				</RightContainer>
			</Container>
		</>
	);
};

// css yo
const Container = styled.div`
	display: flex;
`;

const RightContainer = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin: 0rem 1rem 0rem 0.4rem;
`;

const EditingStyles = styled.div`
	flex-direction: column;
	flex-wrap: wrap;
	justify-content: flex-end;
`;

const DropdownContainer = styled.div`
	margin-top: 1.8rem;
	display: flex;
`;

export default DeckEditor;
