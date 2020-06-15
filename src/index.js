import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//global styles
import './index.scss';

ReactDOM.render(
	<Router>
		<Route component={App} />
	</Router>,
	document.getElementById('root'),
);
