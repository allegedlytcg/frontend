import React from 'react';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Login from './components/Login';
import { Router, Route, Switch } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App(props) {
	console.log(props, 'props');
	return (
		<div className='App'>
			<Sidebar />
			<Route exact path='/' component={Home} />
			<Route path='/login' component={Login} />
			<Route path='/dashboard' component={Dashboard} />
		</div>
	);
}

export default App;
