import axios from 'axios';

export const fetchExchangeData = () => {
	return axios.get('http://localhost:5000/rates');
}

export const fetchCurrencyData = () => {
	return axios.get('https://openexchangerates.org/api/currencies.json');
}