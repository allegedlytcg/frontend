import React from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import { Router, Route, Switch } from 'react-router-dom';

function App(props) {
	console.log(props);
	return (
		<div className='App'>
			<Sidebar />
			<Route exact path='/' component={Home} />
			<Route path='/login' component={Login} />
		</div>
	);
}

export default App;
