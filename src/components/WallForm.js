import React from 'react';
import {
	 Button, 
	 Form,
	 FormGroup,
	 Input,
	 Label,
} from 'reactstrap';

class Message extends React.Component {
	render() {
	    return (
			<Form className="mb-5">
				<FormGroup>
					<Label for="exampleEmail">Create a new message</Label>
					<Input type="textarea" name="message" id="message" placeholder="What do you want to share with us?" />
				</FormGroup>
				<Button color="tsl">Submit</Button>
			</Form>
		);
	}
}

export default Message;
