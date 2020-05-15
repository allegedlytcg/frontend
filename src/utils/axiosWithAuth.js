import axios from 'axios';

const axiosWithAuth = () => {
	const token = localStorage.getItem('token');

	return axios.create({
		baseURL: 'https://alleged-mongo-backend.herokuapp.com/api/v1/',
		headers: {
			authorization: token,
		},
	});
};

export default axiosWithAuth;
