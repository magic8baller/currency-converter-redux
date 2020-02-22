import {InputNumber} from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {inputChange} from 'redux/ducks/exchangeData';

const NumericInput = ({theme,inputChange, id, conversionData}) => {
	const handleChange = (e) => {
		return inputChange(e)
	}
	return (
			<InputNumber
				style={{
					width: '6rem',
					fontSize: '1rem', textAlign: 'center',
				}}
				min={0.00}
				max={10000000000000}
				step={0.01}
				value={(id === 'base') ? parseFloat(conversionData.amount) : parseFloat(conversionData.result)}
				formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
				parser={value => value.replace(/\$\s?|(,*)/g, '')}
				onChange={handleChange}
			/>
	)
}

export default connect(state => ({conversionData: state.conversionData}), {inputChange})(NumericInput);