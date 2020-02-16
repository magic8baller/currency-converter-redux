import CurrencySelect from 'app/components/CurrencyConverter';
import DownshiftComponent from 'app/components/CurrencyDropdown';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {baseCurrencyChange, fetchQuote, getCurrencies, getRates, inputChange, quoteCurrencyChange} from 'redux/ducks/exchangeData';
class HomePage extends Component {

	async componentDidMount () {
		await this.props.getCurrencies();
		await this.props.getRates()
	}

	render () {

		// const {itemToString, getItems, handleChange, props: {currencies, baseCurrency, quoteCurrency, baseCurrencyChange, quoteCurrencyChange}} = this.props;
		return (
			<>
				hi
				<CurrencySelect currencies={this.props.currencies}  />

			</>
		);
	}
};
const mapStateToProps = (state) => ({currencies: state.conversionData.currencies, baseCurrency: state.conversionData.baseCurrency, quoteCurrency: state.conversionData.quoteCurrency})
export default connect(mapStateToProps, {getCurrencies, getRates, inputChange, fetchQuote, baseCurrencyChange, quoteCurrencyChange})(HomePage)