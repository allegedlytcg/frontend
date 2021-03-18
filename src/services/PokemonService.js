import { doDelete, doPut, doGet, doPost } from './ApiService';

const serviceUrl = '/pokemon';

export const getPokemon = () => {
	return doGet(serviceUrl);
};
