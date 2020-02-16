
import React from 'react';
import ReactDOM from 'react-dom';
import Root from 'app/components/Root'
import 'sanitize.css';
import history from 'utils/history';
import './index.css';
import configureStore from 'redux/configureStore';
import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV !== 'production') {
	const whyDidYouRender = require('@welldone-software/why-did-you-render');
	whyDidYouRender(React);
}
const initialState = {};
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');
ReactDOM.render(
<Root history={history} store={store}/>,
	MOUNT_NODE,
);

serviceWorker.unregister();
