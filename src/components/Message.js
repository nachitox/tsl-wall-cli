import React from 'react';
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardText,
} from 'reactstrap';

class Message extends React.Component {
	render() {
	    return (
			<Card className="mb-4">
				<CardBody>
					{this.props.isAuthor &&
					<Button
						aria-hidden="true"
						className="card-close"
						onClick={(e) => this.props.onDelete(this.props.id, e)}
					>
					×
					</Button>
					}
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
