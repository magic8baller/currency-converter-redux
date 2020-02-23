import React, {Component} from 'react';
import {connect} from 'react-redux';
import {debounce, formatCurrency} from "utils/tableHelpers";
import CurrencyRateRow from './CurrencyRateRow';
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
		this.props.getHistoricalRates(this.props.date)
		this.setState({
			hasMore: (this.props.rates.length < 100),
			isLoading: false
		})
	}
	componentWillMount () {
		this.loadRates()
	}

	shouldComponentUpdate(nextProps, nextState){
		if (this.props.rates !== nextProps.rates){
			return true
		}
		return false;
	}
	render () {
		const {rates, filterText} = this.props;
		const rows = [];

		rates.slice(0, 10).map((curr, idx) => {
			if (curr[0].toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
				return;
			}
			let formattedRate = formatCurrency(curr[0], Number(curr[1]))
			rows.push(<CurrencyRateRow key={idx} currency={curr[0]} rate={formattedRate} />)
			return rows;
		})
		return (
			<div ref="myscroll"
				style={{height: "420px", overflow: "auto", border: '2px red solid', justifyContent: "center"}}>
				<table style={{textAlign: "center"}}>
					<thead>
						<tr>
							<th>Currency</th>
							<th>Rate</th>
						</tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				</div>
		)
	}
}
export default connect()(RatesTable)
