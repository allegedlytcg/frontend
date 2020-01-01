import React from 'react';
import DeckEditor from './DeckEditor';
import styled from 'styled-components';

const Dashboard = () => {
	return (
		<StyledDash>
			<h1>Dashboard</h1>
			<DeckEditor />
		</StyledDash>
	);
};

const StyledDash = styled.div`
	display: flex;
	flex-direction column;
	
`;

export default Dashboard;
