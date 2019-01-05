import React from 'react';
import {
	Card,
	CardBody,
	CardFooter,
	CardText,
} from 'reactstrap';

class Message extends React.Component {
	render() {
	    return (
			<Card>
				<CardBody>
					<CardText>{this.props.text}</CardText>
				</CardBody>
				<CardFooter className="blockquote-footer">
					{this.props.author}<br />
					<small className="text-muted">{this.props.updated}</small>
				</CardFooter>
			</Card>
		);
	}
}

export default Message;
