import axios from 'axios';
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
			refresh_at: null,
			user: null,
		};
	}
	
	componentDidMount() {
		let state = localStorage["appState"];
		if (state) {
			let AppState = JSON.parse(state);
			
			this.setState({
				access_token: AppState.access_token,
				refresth_at: AppState.refresh_at,
				user: AppState.user,
			});
			
			this.handleRefresh();
		}
	}
	
	handleLogin = data => {
		const { access_token, expires_in, user } = data;
		const expire_ms = (expires_in * 60 - 15) * 1000;
		const state = {
			access_token: access_token,
			refresh_at: Date.now() + expire_ms,
			user: user,
		};
		this.setState(state);
		localStorage["appState"] = JSON.stringify(state);
		
		setTimeout(this.handleRefresh, expire_ms);
		
		this.props.history.push('/');
	}
	
	handleLogout = e => {
		if (typeof e !== 'undefined')
			e.preventDefault();
		
		const state = {
			access_token: null,
			refresh_at: null,
			user: null,
		};
		this.setState(state);
		localStorage["appState"] = JSON.stringify(state);
	}
	
	handleRefresh = () => {
		if (this.state.access_token === null)
			return;
		
		axios.post('http://dev.tsl.com/api/refresh?token=' + this.state.access_token)
		.then(response => {
			return response;
		})
		.then(json => {
			if (typeof json.data.error !== 'undefined')
				this.handleLogout();
			
			this.handleLogin(json.data.data);
		})
		.catch(error => {
			this.handleLogout();
		});
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
