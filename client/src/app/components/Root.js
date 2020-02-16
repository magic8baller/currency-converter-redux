import React, {Component} from 'react'
import {ThemeProvider} from 'emotion-theming';
import {connect, Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {setIsDark} from 'redux/ducks/theme'
import App from 'app/components/App'
import {themeLight, themeDark} from 'styles/darkTheme'
class Root extends Component {
	render () {
		const {store, history} = this.props
		return (
			<Provider store={store}>
				<ThemeProvider theme={this.props.mode.isDark ? themeDark : themeLight}>
					<ConnectedRouter history={history}>
						<App isDark={this.props.mode.isDark} setIsDark={this.props.setIsDark} />
					</ConnectedRouter>
				</ThemeProvider>
			</Provider>
		)
	}
}

const mapStateToProps = state => ({mode: state.theme})
export default connect(mapStateToProps, {setIsDark})(Root)