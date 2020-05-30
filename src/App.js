import React from 'react';
// libraries
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

//components
import Menu from './components/Menu';
import Home from './pages/Home';
import RegisterAndLogin from './pages/ResisterAndLogin';
import DeckEditor from './pages/DeckEditor';

function App() {
	return (
		<StyledApp>
			<Menu />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/registerandlogin' component={RegisterAndLogin} />
				<Route path='/deckeditor' component={DeckEditor} />
			</Switch>
		</StyledApp>
	);
}

const StyledApp = styled.div`
	/* display: flex;
	flex-direction: column; */
`;
export default App;
