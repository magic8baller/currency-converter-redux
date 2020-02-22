import {ThemeProvider, withTheme} from 'emotion-theming';
import React, {Component} from 'react';
import CurrencyFlag from 'react-currency-flags';
import {FaExchangeAlt} from 'react-icons/fa';
import {connect} from 'react-redux';
import {baseCurrencyChange, fetchQuote, inputChange, quoteCurrencyChange, swapCurrency} from 'redux/ducks/exchangeData';
import CurrencyDropdown from './CurrencyDropdown';
import NumericInput from './NumericInput';

class CurrencyConverter extends Component {

	handleLabel = ({code}) => (
		<span>
			<CurrencyFlag currency={code} size="sm" />
			&nbsp;&nbsp;{`${code})`}
		</span>
	);

	handleOptions = () => {
		return this.props.data.currencies.map(curr => <option key={curr.code} value={curr.code}>{this.handleLabel(curr)}</option>)
	}

	getQuote = () => {
		return this.props.fetchQuote()
	}
	render () {
		const {getQuote, props: {theme, swapCurrency}} = this;
		return (
			<ThemeProvider theme={theme}>
				<section>
					<article>
						<NumericInput id='base' />
						<CurrencyDropdown id='base' />
					</article>
					<button style={{
						fontSize: '2rem', textAlign: 'center',
						color: theme.buttonText, borderColor: theme.buttonBorder, background: theme.buttonBg
					}} onClick={() => swapCurrency()}><FaExchangeAlt /></button>	<button style={{
						color: theme.buttonText, borderColor: theme.buttonBorder, background: theme.buttonBg
					}} onClick={getQuote}>convert</button>
					<article>
						<NumericInput id='quote' /><CurrencyDropdown id='quote' />
					</article>
				</section>
			</ThemeProvider>
		);
	}
};

const mapStateToProps = ({conversionData}) => ({data: conversionData})

const CurrencyConverterWithTheme = withTheme(CurrencyConverter)
export default connect(mapStateToProps, {inputChange, fetchQuote, baseCurrencyChange, quoteCurrencyChange, swapCurrency})(CurrencyConverterWithTheme)
