import React, { Component } from 'react';
import {
	Route,
	Switch,
} from 'react-router-dom'

import Navigation from './components/Navigation';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'

import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			isLoggedIn: false,
			user: {},
		};
	}

	render() {
		return (
			<div>
				<Navigation />
				<main>
					<Switch>
						<Route
							component={Home}
							exact
							path='/'
						/>
						<Route
							component={Login}
							exact
							path='/login'
						/>
						<Route
							component={Register}
							exact
							path='/register'
						/>
					</Switch>
				</main>
			</div>
		);
	}
}

export default App;
