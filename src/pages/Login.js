import axios from 'axios';
import React, { Component } from 'react';
import {
	Button,
	Container,
	Form,
	FormFeedback,
	FormGroup,
	Input,
} from 'reactstrap';

class Login extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			email: '',
			password: '',
		};
	}
	
	handleChange = e => {
		this.setState({
			[e.target.id]: e.target.value
		});
	}
	
	handleSubmit = e => {
		e.preventDefault();
		
		var formData = new FormData();
		formData.append('email', this.state.email);
		formData.append('password', this.state.password);
		
		axios.post('http://dev.tsl.com/api/login', formData)
		.then(response => {
			console.log(response);
			return response;
		})
		.then(json => {
			if (json.data.error) {
				alert("Login Failed!");
				return;
			}
			
			const { name, id, email, auth_token } = json.data.data;
			
			let userData = {
				name,
				id,
				email,
				auth_token,
				timestamp: new Date().toString(),
			};
			let appState = {
				isLoggedIn: true,
				user: userData,
			};
			
			// save app state with user date in local storage
			localStorage["appState"] = JSON.stringify(appState);
			this.setState({
				isLoggedIn: appState.isLoggedIn,
				user: appState.user
			});
		})
		.catch(error => {
			console.log(error);
		});
	}
	
	render() {
		return (
			<Container className="col-md-4 col-md-offset-3">
				<div className="pb-5 pt-5">
					<h3 className="mb-4">Please sign in</h3>
					
					<Form className="form" method="post" onSubmit={this.handleSubmit}>
						<FormGroup>
							<Input
								autoFocus
								id="email"
								name="email"
								placeholder="Email"
								type="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<FormFeedback valid>That's a tasty looking email you've got there.</FormFeedback>
							<FormFeedback>Uh oh! Looks like there is an issue with your email. Please input a correct email.</FormFeedback>
						</FormGroup>
						
						<FormGroup>
							<Input
								id="password"
								name="password"
								placeholder="Password"
								type="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
						</FormGroup>

						<Button color="tsl">Submit</Button>
					</Form>
				</div>
			</Container>
		);
	}
}

export default Login;
