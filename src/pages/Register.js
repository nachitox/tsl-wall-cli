import axios from 'axios';
import React, { Component } from 'react';
import {
	Button,
	Col,
	Container,
	Form,
	FormFeedback,
	FormGroup,
	Input,
	Row,
} from 'reactstrap';

class Register extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			first_name: '',
			last_name: '',
			email: '',
			password: '',
			errors: {
				first_name: '',
				last_name: '',
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
			//html = 'UnAuthorized';
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
		
		var formData = new FormData();
		formData.append('first_name', this.state.first_name);
		formData.append('last_name', this.state.last_name);
		formData.append('email', this.state.email);
		formData.append('password', this.state.password);
		
		axios.post('http://dev.tsl.com/api/register', formData)
		.then(response => {
			return response;
		})
		.then(json => {
			if (typeof json.data.error !== 'undefined') {
				alert('Registration Failed!');
				return;
			}
			
			this.props.onRegister(json.data.data)
		})
		.catch(error => {
			this.handleError(error);
		});
	}
	
	render() {
		return (
			<Container className="col-md-4 col-md-offset-3">
				<div className="pb-5 pt-5">
					<h2 className="mb-4">Register for TSL Wall</h2>
					
					<Form className="form" method="post" onSubmit={this.handleSubmit}>
						<Row form>
							<Col md={6}>
								<FormGroup>
									<Input
										autoFocus
										id="first_name"
										invalid={this.state.errors.first_name !== ''}
										name="first_name"
										placeholder="First name"
										type="text"
										value={this.state.first_name}
										onChange={this.handleChange}
									/>
								<FormFeedback>{this.state.errors.first_name}</FormFeedback>
								</FormGroup>
							</Col>
							
							<Col md={6}>
								<FormGroup>
									<Input
										id="last_name"
										invalid={this.state.errors.last_name !== ''}
										name="last_name"
										placeholder="Last name"
										type="text"
										value={this.state.last_name}
										onChange={this.handleChange}
									/>
									<FormFeedback>{this.state.errors.last_name}</FormFeedback>
								</FormGroup>
							</Col>
						</Row>
					
						<FormGroup>
							<Input
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

export default Register;
