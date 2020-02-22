import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getHistoricalRates} from "redux/ducks/exchangeData";
import RatesTable from './RatesTable';
const SearchBar = ({filterText, handleFilterText}) => {
	const handleChange = e => {
		handleFilterText(e.target.value);
	}
	return (
		<form>
			<input type="text" placeholder="Search for a currency" value={filterText} onChange={handleChange} />
		</form>
	)
}


class FilterableRatesTable extends Component {

	state = {
		filterText: ''
	}

	handleFilterText = (input) => {
		console.log(input)
		this.setState({filterText: input})
	}
	render () {
		return (
			<div>
				<SearchBar filterText={this.state.filterText} handleFilterText={this.handleFilterText} />
				<RatesTable rates={this.props.rates} filterText={this.state.filterText} getHistoricalRates={this.props.getHistoricalRates}/>
			</div>
		)
	}
}
export default connect(state => ({rates: state.conversionData.historical.rates}), {getHistoricalRates})(FilterableRatesTable);