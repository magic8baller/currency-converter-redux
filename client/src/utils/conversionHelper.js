import {Cashify} from 'cashify';
import currency from 'currency.js';

export const getConversionResult = (amount, baseCurrency, quoteCurrency, rates) => {
	const cashify = new Cashify({base: baseCurrency, rates});
	const converted = cashify.convert(amount, {from: baseCurrency, to: quoteCurrency});
	return currency(converted, {symbol: '$', formatWithSymbol: true}).format();
}