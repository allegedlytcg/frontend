import React from 'react';
// libraries
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

//components
import Menu from './components/Menu';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import DeckEditor from './pages/DeckEditor';

// will begin implementing global state like this is think
// https://www.freecodecamp.org/news/state-management-with-react-hooks/

function App() {
	return (
		<StyledApp>
			<Menu />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/register' component={Register} />
				<Route path='/login' component={Login} />
				<Route path='/deckeditor' component={DeckEditor} />
			</Switch>
		</StyledApp>
	);
}

const StyledApp = styled.div`
	display: flex;
	flex-direction: column;
`;
export default App;
