import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Main from 'app/components/Main'
import HomePage from 'app/pages/Homepage';
import NotFoundPage from 'app/pages/NotFoundPage';

const App = (props) =>{
	return (
		<Main {...props}>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route component={NotFoundPage} />
			</Switch>
		</Main>
	);
}

export default App;