import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import history from 'utils/history';
import {themeReducer, exchangeReducer} from 'redux/ducks'
export default function createReducer () {
	const rootReducer = combineReducers({
		router: connectRouter(history),
		theme: themeReducer,
		conversionData: exchangeReducer,
		test: () => 'hello'
	});

	return rootReducer;
}