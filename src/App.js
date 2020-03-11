import React from 'react';
// libraries
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

//components
import Menu from './components/Menu';
import Home from './components/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';

function App(props) {
	// console.log(props, 'props');
	return (
		<StyledApp>
			<Menu />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/register' component={Register} />
				<Route path='/login' component={Login} />
				<Route path='/dashboard' component={Dashboard} />
			</Switch>
		</StyledApp>
	);
}

export default App;

const StyledApp = styled.div`
	display: flex;
	flex-direction: column;
	/* margin: 0; */
`;
