import {Cashify} from 'cashify';
import {fetchCurrencyData, fetchExchangeData, fetchHistoricalRates} from 'services/currencyServices';
import dummyRates from 'utils/tableHelpers';
const initialState = {
	rates: null,
	baseCurrency: 'USD',
	quoteCurrency: 'EUR',
	amount: 1,
	result: '0.92',
	currencies: [],
	isError: false,
	historical: {
		date: '2019-01-01',
		rates: dummyRates
	}
}

export const FETCH_RATES = 'FETCH_RATES';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const FETCH_ERROR = 'FETCH_ERROR';
export const SET_BASE_AMOUNT = 'SET_BASE_AMOUNT';
export const SET_BASE_CURRENCY = 'SET_BASE_CURRENCY';
export const SET_QUOTE_CURRENCY = 'SET_QUOTE_CURRENCY';
export const SET_QUOTE_AMOUNT = 'SET_QUOTE_AMOUNT';
export const SWAP_CURRENCY = 'SWAP_CURRENCY';
export const FETCH_QUOTE = 'FETCH_QUOTE';
export const REMOVE_BASE_CURRENCY = 'REMOVE_BASE_CURRENCY';

export const FETCH_HISTORICAL_RATES = 'FETCH_HISTORICAL_RATES';
export const REMOVE_QUOTE_CURRENCY = 'REMOVE_QUOTE_CURRENCY'

/**
 * @route '${baseApiUrl}/rates'
 * @response object {"AED": "3.6731", "AFN": "77.254999", "ALL": "111.739761"}
 */
export const getRates = (base) => async (dispatch, getState) => {
	const {conversionData} = getState();
	try {

		const ratesResponse = await fetchExchangeData(conversionData.baseCurrency);
		let ratesArray = Object.entries(ratesResponse.data.rates)
		let rates = ratesResponse.data.rates
		dispatch({type: FETCH_RATES, payload: rates});
	} catch (e) {
		dispatch({type: FETCH_ERROR, payload: e.message});
	}
}

export const getHistoricalRates = (date) => async (dispatch, getState) => {
	try {
		const ratesResponse = await fetchHistoricalRates(date);

		dispatch({type: FETCH_HISTORICAL_RATES, payload: {date, rates: Object.entries(ratesResponse.data.rates)}})
	} catch (e) {
		dispatch({type: FETCH_ERROR, payload: e.message});
	}
}
const formatResponse = (results) => {
	return results.map(curr => ({code: `${curr[0]}`, fullName: `${curr[1]}`}));
}
/**
 *
 * @route 'https://openexchangerates.org/api/currencies.json'
 * @response Array  [{code: 'AED',fullName: 'United Arab Emirates Dirham'},{code: 'AFN',fullName: 'Afghan Afghani'}]
 * @desc fetch currencies list
 */
export const getCurrencies = () => async (dispatch) => {
	try {
		const currenciesResponse = await fetchCurrencyData();
		console.log(`%c currenciesResponse: ${currenciesResponse}`, 'font-size: 15px;color: blue; background: goldenrod')
		const results = await Object.entries(currenciesResponse.data.currencies)
		let formattedResponse = formatResponse(results);
		dispatch({type: FETCH_CURRENCIES, payload: formattedResponse})
	} catch (e) {
		dispatch({type: FETCH_ERROR, payload: e.message});
	}
}

/**
 * utility conversion + formatting function
 * @pkgs @cashify, @currency.js
 * @desc fetch conversion result quote amount
 */
export const fetchQuote = () => async (dispatch, getState) => {
	const {conversionData} = getState();
	try {
		// await getRates()
		// const quoteResult = await getConversionResult(amount, baseCurrency, quoteCurrency, rates);
		const ratesResponse = await fetchExchangeData(conversionData.baseCurrency);
		await dispatch({type: FETCH_RATES, payload: ratesResponse.data.rates});
		const {amount, baseCurrency, quoteCurrency, rates} = conversionData;
		const cashify = await new Cashify({base: baseCurrency, rates});
		const converted = await cashify.convert(amount, {from: baseCurrency, to: quoteCurrency}).toFixed(2);
		await dispatch({type: SET_QUOTE_AMOUNT, payload: converted})
	} catch (e) {
		dispatch({type: FETCH_ERROR, payload: e.message});
	}
}

export const swapCurrency = () => async (dispatch, getState) => {
	const {conversionData} = getState();
	dispatch({type: SWAP_CURRENCY})
	try {
		if (conversionData.amount) {
			await getRates();
			const {amount, baseCurrency, quoteCurrency, rates} = conversionData;
			const cashify = await new Cashify({base: baseCurrency, rates});
			const converted = await cashify.convert(amount, {from: baseCurrency, to: quoteCurrency}).toFixed(2);
			await dispatch({type: SET_QUOTE_AMOUNT, payload: converted})
		}

	} catch (e) {
		dispatch({type: FETCH_ERROR, payload: e.message});
	}
}

export const inputChange = (amount) => (dispatch, getState) => {
	dispatch({type: SET_BASE_AMOUNT, payload: amount})
}

export const baseCurrencyChange = option => dispatch => {
	return dispatch({type: SET_BASE_CURRENCY, payload: option});
}

export const quoteCurrencyChange = option => dispatch => {
	return dispatch({type: SET_QUOTE_CURRENCY, payload: option});
}
export default (state = initialState, action) => {
	switch (action.type) {
		case FETCH_RATES:
			return {...state, rates: action.payload, fetchError: false, errors: null};
		case FETCH_CURRENCIES:
			return {...state, currencies: action.payload, fetchError: false, errors: null};
		case FETCH_ERROR:
			return {...state, fetchError: true, errors: action.payload};
		case SET_BASE_CURRENCY:
			return {...state, baseCurrency: action.payload};
		case SET_QUOTE_CURRENCY:
			return {...state, quoteCurrency: action.payload};
		case SET_BASE_AMOUNT:
			return {...state, amount: action.payload};
		case SET_QUOTE_AMOUNT:
			return {...state, result: action.payload};
		case REMOVE_BASE_CURRENCY:
			return {...state, baseCurrency: action.payload};
		case REMOVE_QUOTE_CURRENCY:
			return {...state, quoteCurrency: action.payload};
		case FETCH_HISTORICAL_RATES:
			return {...state, historical: {...state.historical, ...action.payload}};
		case SWAP_CURRENCY:
			const prevState = {...state}
			return {...state, baseCurrency: prevState.quoteCurrency, quoteCurrency: prevState.baseCurrency, amount: prevState.result, result: prevState.amount};
		default:
			return state;
	}
}