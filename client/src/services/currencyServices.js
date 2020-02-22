import axios from 'axios';

export const fetchExchangeData = (baseCurrency) => {
	return axios.get(`https://openexchangerates.org/api/latest.json?app_id=b023f6f6c1ba4d36a86a79a229e5b7d6
&base=${baseCurrency}&show_alternative=1`);
}
export const fetchUSDRates = () => {
	return axios.get('http://localhost:5000/rates');
}
export const fetchHistoricalRates = date => {
	return axios.get(`http://localhost:5000/rates/${date}`);
}
export const fetchCurrencyData = () => {
	return axios.get('https://openexchangerates.org/api/currencies.json');
}