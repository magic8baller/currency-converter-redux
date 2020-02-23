import React from 'react';

const CurrencyRateRow = ({currency, rate}) => (
	<tr>
		<td>{currency}</td>
		<td>{rate}</td>
	</tr>
)
export default CurrencyRateRow;