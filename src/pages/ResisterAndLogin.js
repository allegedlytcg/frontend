import React from 'react';
import Register from '../components/RegisterAndLogin/Register';
import Login from '../components/RegisterAndLogin/Login';
import styled from 'styled-components';

const RegisterAndLogin = () => {
	return (
		<RegisterAndLoginStyles>
			<Register />
			<span classname='border'></span>
			<Login />
		</RegisterAndLoginStyles>
	);
};

const RegisterAndLoginStyles = styled.div`
	display: flex;
	justify-content: center;
	span {
		margin: 3rem 1rem -1rem 1rem;
		border: 1px solid lightgray;
	}
`;

export default RegisterAndLogin;
