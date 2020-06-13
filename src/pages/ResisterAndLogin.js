import React from 'react';
import Register from '../components/RegisterAndLogin/Register';
import Login from '../components/RegisterAndLogin/Login';
import styled from 'styled-components';

const RegisterAndLogin = () => {
	return (
		<RegisterAndLoginStyles>
			<div>
				<p>New user? Sign up here</p>
				<Register />
			</div>
			<span className='border'></span>
			<div>
				<p>Already have an account? Sign in here</p>
				<Login />
			</div>
		</RegisterAndLoginStyles>
	);
};

const RegisterAndLoginStyles = styled.div`
	display: flex;
	justify-content: center;
	/* align-items: center; */
	div {
		text-align: center;
	}
	span {
		margin: 3rem 1rem -1rem 1rem;
		border: 1px solid lightgray;
	}
`;

export default RegisterAndLogin;
