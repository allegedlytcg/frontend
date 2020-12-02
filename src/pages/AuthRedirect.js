import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const AuthRedirect = () => {
    const location = useLocation();
    const history = useHistory()
	const parseToken = () => {

        
        const token = location.hash.slice(10)
        localStorage.setItem('token', token);
        history.push("/")
    };
    parseToken();
	return <div>Loading </div>;
};

export default AuthRedirect;
