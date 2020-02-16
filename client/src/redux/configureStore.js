import {createStore, applyMiddleware, compose} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createReducer from 'redux/reducers';
import thunkMiddleware from 'redux-thunk'
export default function configureStore (initialState = {}, history) {
	let composeEnhancers = compose;

	if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
		if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
			composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
	}

	const middlewares = [thunkMiddleware, routerMiddleware(history)]
	const enhancers = [applyMiddleware(...middlewares)]

	const store = createStore(
		createReducer(),
		initialState,
		composeEnhancers(...enhancers),
	);

	return store
}