import React from 'react';

import {connect} from 'react-redux';
import {getHistoricalRates} from 'redux/ducks/exchangeData';
import {formatISODate} from "utils/dateHelper";
import {DatePicker} from 'antd';
import FilterableRatesTable from '../Table/FilterableRatesTable'




const DateCal = ({getHistoricalRates, conversionData}) => {
	const handleChange = (date) => {
		console.log(date)
		return getHistoricalRates(formatISODate(date))
	}

	const selectedDate = () => {
		return new Date(conversionData.historical.date)
	}


	return (
		<>
		<DatePicker selected={selectedDate()} onChange={handleChange} />
		<FilterableRatesTable/>
		</>
	)
}

export default connect(state => ({conversionData: state.conversionData}), {getHistoricalRates})(DateCal);