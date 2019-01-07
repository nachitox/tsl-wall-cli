import React, { Component } from 'react';
import {
	Route,
	Switch,
	withRouter,
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
			access_token: null,
			user: null,
		};
	}
	
	componentDidMount() {
		let state = localStorage["appState"];
		if (state) {
			let AppState = JSON.parse(state);
			
			this.setState({
				access_token: AppState.access_token,
				user: AppState.user,
			});
		}
	}
	
	handleLogin = data => {
		const { access_token, user } = data;
		const state = {
			access_token: access_token,
			user: user,
		};
		this.setState(state);
		localStorage["appState"] = JSON.stringify(state);
		
		this.props.history.push('/');
	}
	
	handleLogout = e => {
		if (typeof e !== 'undefined')
			e.preventDefault();
		
		const state = {
			access_token: null,
			user: null,
		};
		this.setState(state);
		localStorage["appState"] = JSON.stringify(state);
	}

	render() {
		return (
			<div>
				<Navigation
					isLoggedIn={this.state.access_token !== null}
					onLogout={this.handleLogout}
				/>
				<main>
					<Switch>
						<Route
							exact
							path='/'
							render={(props) => <Home {...props} accessToken={this.state.access_token} user={this.state.user} />}
						/>
						<Route
							exact
							path='/login'
							render={(props) => <Login {...props} onLoad={this.handleLogout} onLogin={this.handleLogin} />}
						/>
						<Route
							exact
							path='/register'
							render={(props) => <Register {...props} onLoad={this.handleLogout} onRegister={this.handleLogin.bind(this)} />}
						/>
					</Switch>
				</main>
			</div>
		);
	}
}

export default withRouter(App);
