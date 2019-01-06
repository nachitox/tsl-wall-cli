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
	render() {
		return (
			<Container className="col-md-4 col-md-offset-3">
				<div className="pb-5 pt-5">
					<h3 className="mb-4">Please sign in</h3>
					
					<Form className="form">
						<FormGroup>
							<Input
								id="email"
								name="email"
								placeholder="Email"
								type="email"
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
