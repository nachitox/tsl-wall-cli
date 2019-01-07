import React from 'react';
import {
	 Button, 
	 Form,
	 FormFeedback,
	 FormGroup,
	 Input,
	 Label,
} from 'reactstrap';

class Message extends React.Component {
	render() {
	    return (
			<Form className="mb-5" onSubmit={this.props.onSubmit}>
				<FormGroup>
					<Label for="message">Create a new message</Label>
					<Input
						id="message"
						invalid={this.props.errors !== ''}
						name="message"
						placeholder="What do you want to share with us?"
						type="textarea"
						value={this.props.message}
						onChange={this.props.onChange}
					/>
					<FormFeedback>{this.props.errors}</FormFeedback>
				</FormGroup>
				<Button color="tsl">Submit</Button>
			</Form>
		);
	}
}

export default Message;
