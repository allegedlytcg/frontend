import React from 'react';
// libraries
import { Route, Switch } from 'react-router-dom';

//components
import Menu from './components/Menu';
import Home from './pages/Home';
import RegisterAndLogin from './pages/ResisterAndLogin';
import DeckEditor from './pages/DeckEditor';

function App(props) {
	return (
		<>
			<Menu />
			<Switch>
				<Route exact path='/' component={Home} />
				<Route
					path='/registerandlogin'
					component={RegisterAndLogin}
					{...props}
				/>
				<Route path='/deckeditor' component={DeckEditor} />
			</Switch>
		</>
	);
}

export default App;
