
import {Select} from 'antd';
import React, {Component} from "react";
import CurrencyFlag from "react-currency-flags";
import {connect} from "react-redux";
import {baseCurrencyChange, fetchQuote, inputChange, quoteCurrencyChange} from "redux/ducks/exchangeData";



const {Option} = Select;

class CurrencySelect extends Component {

	handleChange = e => {
		if (this.props.id === 'base') {
			return this.props.baseCurrencyChange(e)
		} else {
			return this.props.quoteCurrencyChange(e)
		}
	}
	handleLabel = (code) => (
		<span>
			<CurrencyFlag currency={code} size="sm" />
			&nbsp;&nbsp;{`${code}`}
		</span>
	);

	handleSearch = (inputValue) => {
		return this.handleChange(inputValue)
	}

	render () {
		const {
			handleLabel,
			handleChange,
			props
		} = this;
		const {data, id}
			= props;
		return (
			<Select
				showSearch={true}
				value={(props.id === 'base') ? handleLabel(data.baseCurrency) : handleLabel(data.quoteCurrency)}
				// placeholder={(props.id === 'base') ? handleLabel(data.baseCurrency) : handleLabel(data.quoteCurrency)}
				notFoundContent='No matching currency found'
				onSearch={this.handleSearch}
				onChange={handleChange}
			// filterOption={(input, option) => option.props.children.indexOf(input) !== -1}
			>
				{props.data.currencies.map(currency => (
					<Option key={`${currency.code}, (${currency.fullName})`} value={currency.code}>
						{handleLabel(currency.code)}
					</Option>
				))}
			</Select>
		);
	}
}

const mapStateToProps = ({conversionData}) => ({data: conversionData});

export default connect(
	mapStateToProps,
	{inputChange, fetchQuote, baseCurrencyChange, quoteCurrencyChange}
)(CurrencySelect);
