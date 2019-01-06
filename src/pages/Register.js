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
	render() {
		return (
			<Container className="col-md-4 col-md-offset-3">
				<div className="pb-5 pt-5">
					<h2 className="mb-4">Register for TSL Wall</h2>
					
					<Form className="form">
						<Row form>
							<Col md={6}>
								<FormGroup>
									<Input
										id="first_name"
										name="first_name"
										placeholder="First name"
										type="text"
									/>
								</FormGroup>
							</Col>
							
							<Col md={6}>
								<FormGroup>
									<Input
										id="last_name"
										name="last_name"
										placeholder="Last name"
										type="text"
									/>
								</FormGroup>
							</Col>
						</Row>
					
						<FormGroup>
							<Input
								id="exampleEmail"
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

export default Register;
