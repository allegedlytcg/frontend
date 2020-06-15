import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { CSSTransition } from 'react-transition-group';
import { ReactComponent as CogIcon } from '../../icons/cog.svg';
import { ReactComponent as ChevronIcon } from '../../icons/chevron.svg';
import { ReactComponent as ArrowIcon } from '../../icons/arrow.svg';
import { ReactComponent as BoltIcon } from '../../icons/bolt.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faHome, faTh } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function DropdownMenu(props) {
	const { darkMode, toggleMode, logout, open, setOpen } = props;
	const [activeMenu, setActiveMenu] = useState('main');
	const [menuHeight, setMenuHeight] = useState(null);
	const dropdownRef = useRef(null);

	const token = localStorage.getItem('token');
	const username = localStorage.getItem('currentUser');

	function calcHeight(el) {
		const height = el.offsetHeight;
		setMenuHeight(height);
	}
	useEffect(() => {
		setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
	}, [token]);

	function DropdownItem(props) {
		return (
			<DropdownItemStyles
				className='menu-item'
				onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
			>
				<span className='icon-button'>{props.leftIcon}</span>
				{props.children}
				<span className='icon-right'>{props.rightIcon}</span>
			</DropdownItemStyles>
		);
	}

	useEffect(() => {
		function handleOutsideClick(e) {
			if (dropdownRef.current !== null) {
				if (dropdownRef.current.contains(e.target)) return;
				setOpen(false);
			}
		}
		if (open) {
			document.addEventListener('mousedown', handleOutsideClick);
		} else {
			document.removeEventListener('mousedown', handleOutsideClick);
		}
		return () => {};
	}, [open, setOpen]);

	return (
		<DropDownStyles
			className='dropdown'
			style={{ height: menuHeight }}
			ref={dropdownRef}
		>
			{/* Dropdown lvl 1 */}
			<CSSTransition
				in={activeMenu === 'main'}
				timeout={500}
				classNames='menu-primary'
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className='menu'>
					<h2>Main Menu</h2>
					{token ? (
						<DropdownItem
							leftIcon={<FontAwesomeIcon icon={faUser} />}
						>
							{username}
						</DropdownItem>
					) : (
						<Link to='registerandlogin'>
							<DropdownItem
								leftIcon={<FontAwesomeIcon icon={faUser} />}
							>
								Sign in / Create new account
							</DropdownItem>
						</Link>
					)}
					<Link to='/'>
						<DropdownItem
							leftIcon={<FontAwesomeIcon icon={faHome} />}
						>
							Home
						</DropdownItem>
					</Link>
					<Link to='/deckeditor'>
						<DropdownItem
							leftIcon={<FontAwesomeIcon icon={faTh} />}
						>
							Deck Editor
						</DropdownItem>
					</Link>
					<DropdownItem
						leftIcon={<CogIcon />}
						rightIcon={<ChevronIcon />}
						goToMenu='settings'
					>
						<Link>Settings</Link>
					</DropdownItem>
					{token ? (
						<DropdownItem
							leftIcon='🦧'
							// rightIcon={<ChevronIcon />}
							// goToMenu='animals'
							// onClick={logout}
							goToMenu={logout}
						>
							Logout
						</DropdownItem>
					) : null}
				</div>
			</CSSTransition>

			{/* level 2 menus*/}
			{/* Settings */}
			<CSSTransition
				in={activeMenu === 'settings'}
				timeout={500}
				classNames='menu-secondary'
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem goToMenu='main' leftIcon={<ArrowIcon />}>
						<h2>Main Menu</h2>
					</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>
						Dark Mode{' '}
						<div onClick={toggleMode} className='dark-mode__toggle'>
							<div
								className={
									darkMode ? 'toggle toggled' : 'toggle'
								}
							/>
						</div>
					</DropdownItem>
					{/* <DropdownItem leftIcon={<BoltIcon />}>CSS</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>
						JavaScript
					</DropdownItem>
					<DropdownItem leftIcon={<BoltIcon />}>
						Awesome!
					</DropdownItem> */}
				</div>
			</CSSTransition>

			{/* potential neew menu leaving this example here commented out 
            
            
            */}
			{/* <CSSTransition
				in={activeMenu === 'animals'}
				timeout={500}
				classNames='menu-secondary'
				unmountOnExit
				onEnter={calcHeight}
			>
				<div className='menu'>
					<DropdownItem goToMenu='main' leftIcon={<ArrowIcon />}>
						<h2>Animals</h2>
					</DropdownItem>
					<DropdownItem leftIcon='🦘'>Kangaroo</DropdownItem>
					<DropdownItem leftIcon='🐸'>Frog</DropdownItem>
					<DropdownItem leftIcon='🦋'>Horse?</DropdownItem>
					<DropdownItem leftIcon='🦔'>Hedgehog</DropdownItem>
				</div>
			</CSSTransition> */}
		</DropDownStyles>
	);
}

const DropdownItemStyles = styled.div`
	/* .menu-item {
		height: 50px;
		display: flex;
		align-items: center;
		border-radius: 8px;
		transition: background 500ms;
		padding: 0.5rem;
	}

	.menu-item .icon-button {
		margin-right: 0.5rem;
	}

	.menu-item .icon-button:hover {
		filter: none;
	}

	.menu-item:hover {
		background-color: #525357;
		cursor: pointer;
	}

	.icon-right {
		margin-left: auto;
	}

	.menu {
		width: 100%;
	} */
`;

const DropDownStyles = styled.div`
	a {
		color: black;
		text-decoration: none;
	}
	.menu {
		h2 {
			margin: 0 auto;
			text-align: center;
		}
	}
	/* .dark-mode__toggle {
		background: #026a03;
		border-radius: 50px;
		border: 1px solid grey;
		height: 20px;
		position: relative;
		width: 40px;
		justify-self: flex-end;
		justify-self: end;
		left: 5rem;
		cursor: pointer;
	}

	.toggle {
		background: #f8f8f8;
		border-radius: 50px;
		height: 18px;
		left: 1px;
		top: 1px;
		position: absolute;
		transition: 2s;
		width: 20px;
	}

	.toggled {
		left: 19px;
	}

	.dark-mode {
		color: #fff;
		background-color: #313843;
		.navbar {
			background-color: #1f2022;
			border: none;
		}
	} */
`;

export default DropdownMenu;
