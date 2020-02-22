import CurrencySelect from 'app/components/CurrencyConverter';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getCurrencies, getRates} from 'redux/ducks/exchangeData';
import DatePicker from 'app/components/DatePicker';
class HomePage extends Component {

	async componentDidMount () {
		await this.props.getCurrencies();
		await this.props.getRates(this.props.baseCurrency)
	}

	render () {
		return (
			<>
				<CurrencySelect currencies={this.props.currencies}  />
				<DatePicker/>
			</>
		);
	}
};
const mapStateToProps = (state) => ({currencies: state.conversionData.currencies, baseCurrency: state.conversionData.baseCurrency})
export default connect(mapStateToProps, {getCurrencies, getRates})(HomePage)