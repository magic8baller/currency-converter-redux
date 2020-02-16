import React, {Component} from 'react';
import CurrencyFlag from 'react-currency-flags';
import {FaExchangeAlt} from 'react-icons/fa';
import {connect} from 'react-redux';
import {baseCurrencyChange, fetchQuote, inputChange, quoteCurrencyChange} from 'redux/ducks/exchangeData';
import CurrencyDropdown from './CurrencyDropdown';
import NumericInput from './NumericInput';

class CurrencyConverter extends Component {

	// filterOptions = (inputValue) => {
	// 	return conversionData.
	// }
	handleLabel = ({code}) => (
		<span>
			<CurrencyFlag currency={code} size="sm" />
			&nbsp;&nbsp;{`${code})`}
		</span>
	);

	handleOptions = () => {
		const {props} = this;
		return this.props.data.currencies.map(curr => <option key={curr.code} value={curr.code}>{this.handleLabel(curr)}</option>)
	}

	getQuote = () => {
		return this.props.fetchQuote()
	}
	render () {
		const {handleOptions, handleLabel, getQuote, props} = this;
		return (
			<secion>
				<article>
					<NumericInput id='base' />
					{/* <input type='number' step='0.01' value={props.data.amount} onChange={e => props.inputChange(e.target.value)} /> */}
					<br />
					{/* <CurrencyDropdown data-id='base' placeholder={handleLabel(props.data.baseCurrency)} onChange={e => props.baseCurrencyChange(e.target.value)}>
					{this.handleOptions()} */}
					<CurrencyDropdown id='base' />
					{/* <CurrencyDropdown data-id='base' placeholder={handleLabel(props.data.baseCurrency)} onChange={e => props.baseCurrencyChange(e.target.value)}> */}
					{/* {this.handleOptions()} */}
				</article>
				<button ><FaExchangeAlt /></button>
				<article>
					<CurrencyDropdown id='quote' />>
			</article>
				<button onClick={getQuote}>convert</button>
				<NumericInput id='quote' />
				{/* <input type='number' step='0.01' value={props.data.result} /> */}
			</secion>
		);
	}
};

const mapStateToProps = ({conversionData}) => ({data: conversionData})

export default connect(mapStateToProps, {inputChange, fetchQuote, baseCurrencyChange, quoteCurrencyChange})(CurrencyConverter)
