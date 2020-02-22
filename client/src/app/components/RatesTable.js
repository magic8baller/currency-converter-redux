import React, {Component} from 'react';
import {connect} from 'react-redux';
import {debounce} from "utils/tableHelpers";
const CurrencyRateRow = ({currency, rate}) => (
	<tr>
		<td>{currency}</td>
		<td>{rate}</td>
	</tr>
)
class RatesTable extends Component {
	constructor (props) {
		super(props);

		this.state = {
			error: false,
			hasMore: true,
			isLoading: false
		}
		window.onscroll = debounce(() => {
			const {state: {error, hasMore, isLoading}, loadRates} = this;
			if (error || isLoading || !hasMore) return;
			if (window.innerHeight + document.documentElement.scrollTop
				=== document.documentElement.offsetHeight) {
				loadRates()
			}
		}, 100)
	}

	loadRates = () => {
		this.props.getHistoricalRates()
		this.setState({
			hasMore: (this.props.rates.length <100),
			isLoading: false
		})
	}
	render () {
		const {rates, filterText} = this.props;
		const rows = [];
		rates.map((curr, idx) => {
			if (curr[0].toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
				return
			}
			rows.push(<CurrencyRateRow key={idx} currency={curr[0]} rate={curr[1]} />)
			return rows;
		})
		return (
			<div ref="myscroll"
				style={{height: "420px", overflow: "auto"}}>
				<table>
					<thead>
						<tr>
							<th>Currency</th>
							<th>Rate</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table></div>
		)
	}
}
export default connect()(RatesTable)
