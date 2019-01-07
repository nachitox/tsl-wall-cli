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
			errors: {
				email: '',
				password: '',
			},
		};
	}
	
	componentDidMount() {
		this.props.onLoad();
	}
	
	handleChange = e => {
		let input = e.target.id;
		let errors = Object.assign({}, this.state.errors);
		errors[input] = '';
		
		this.setState({
			[input]: e.target.value,
			errors: errors
		});
	}
	
	handleError = error => {
		if (typeof error.response === 'undefined') {
			alert('Unknown error!');
			return;
		}
		
		//Setup Generic Response Messages
		if (error.response.status === 401) {
			let errors = Object.assign({}, this.state.errors);
			errors.password = error.response.data.error;
			this.setState({errors: errors});
		}
		else if (error.response.status === 404) {
			//html = 'API Route is Missing or Undefined';
		}
		else if (error.response.status === 405) {
			//message.html = 'API Route Method Not Allowed';
		}
		else if (error.response.status === 422) {
			let errors = Object.assign({}, this.state.errors);
			errors = Object.assign(errors, error.response.data.errors);
    		this.setState({errors: errors});
	 	}
		else if (error.response.status >= 500) {
			//message.html = 'Server Error';
		}
	}
	
	handleSubmit = e => {
		e.preventDefault();
		const t = this;
		
		var formData = new FormData();
		formData.append('email', t.state.email);
		formData.append('password', t.state.password);
		
		axios.post('http://dev.tsl.com/api/login', formData)
		.then(response => {
			return response;
		})
		.then(json => {
			if (typeof json.data.error !== 'undefined') {
				alert('Login Failed!');
				return;
			}
			
			t.props.onLogin(json.data.data);
		})
		.catch(error => {
			this.handleError(error);
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
								invalid={this.state.errors.email !== ''}
								name="email"
								placeholder="Email"
								type="email"
								value={this.state.email}
								onChange={this.handleChange}
							/>
							<FormFeedback>{this.state.errors.email}</FormFeedback>
						</FormGroup>
						
						<FormGroup>
							<Input
								id="password"
								invalid={this.state.errors.password !== ''}
								name="password"
								placeholder="Password"
								type="password"
								value={this.state.password}
								onChange={this.handleChange}
							/>
							<FormFeedback>{this.state.errors.password}</FormFeedback>
						</FormGroup>

						<Button color="tsl">Submit</Button>
					</Form>
				</div>
			</Container>
		);
	}
}

export default Login;
