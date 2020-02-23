import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getHistoricalRates} from "redux/ducks/exchangeData";
import RatesTable from './RatesTable';
import SearchBar from './SearchBar';



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
				<RatesTable rates={this.props.historicalData.rates} date={this.props.historicalData.date} filterText={this.state.filterText} getHistoricalRates={this.props.getHistoricalRates}/>
			</div>
		)
	}
}
export default connect(state => ({historicalData: state.conversionData.historical}), {getHistoricalRates})(FilterableRatesTable);