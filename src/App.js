import React, { useReducer, createContext } from 'react';
// libraries
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';

//components
import Menu from './components/Menu';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import DeckEditor from './components/DeckEditor';
import newDeckEditor from './components/newDeckEditor';

// will begin implementing global state like this is think
// https://www.freecodecamp.org/news/state-management-with-react-hooks/

export const Context = createContext();

const initialState = {
	isAuthenticated: false,
	user: null,
	token: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			localStorage.setItem('user', JSON.stringify(action.payload.name));
			localStorage.setItem('token', JSON.stringify(action.payload.token));
			return {
				...state,
				isAuthenticated: true,
				user: action.payload.name,
				token: action.payload.token,
			};
		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				isAuthenticated: false,
				user: null,
			};
		default:
			return state;
	}
};

function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<StyledApp>
			<Menu />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/register' component={Register} />
				<Route path='/login' component={Login} />
				<Route path='/deckeditor' component={newDeckEditor} />
			</Switch>
		</StyledApp>
	);
}

const StyledApp = styled.div`
	display: flex;
	flex-direction: column;
`;
export default App;
