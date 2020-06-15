import React, { useState } from 'react';
// libraries
import { Route, Switch } from 'react-router-dom';

//components
// import Menu from './components/menu/Navbar';
import Menu from './components/menu/Menu';
import MenuItem from './components/menu/MenuItem';
import Dropdown from './components/menu/Dropdown';
import Home from './pages/Home';
import RegisterAndLogin from './pages/ResisterAndLogin';
import DeckEditor from './pages/DeckEditor';
import './index.scss';
import { ReactComponent as CaretIcon } from './icons/caret.svg';

//custom hooks
import useDarkMode from './utils/useDarkMode';

function App() {
	const [open, setOpen] = useState(false);
	const [darkMode, setDarkMode] = useDarkMode(false);
	const toggleMode = (e) => {
		e.preventDefault();
		setDarkMode(!darkMode);
	};

	const logout = () => {
		window.localStorage.clear();
		setOpen(!open);
	};

	return (
		<>
			{/* this might be terrible */}
			<Menu>
				<MenuItem open={open} setOpen={setOpen} icon={<CaretIcon />}>
					<Dropdown
						toggleMode={toggleMode}
						darkMode={darkMode}
						logout={logout}
					/>
				</MenuItem>
			</Menu>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route
					path='/registerandlogin'
					component={() => (
						<RegisterAndLogin open={open} setOpen={setOpen} />
					)}
				/>
				<Route path='/deckeditor' component={DeckEditor} />
			</Switch>
		</>
	);
}

export default App;
