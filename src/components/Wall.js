import axios from 'axios';
import React, { Component } from 'react';

import Message from './Message';
import WallForm from './WallForm';
import WallPagination from './WallPagination';

class Wall extends Component {
	
	constructor(props) {
		super(props);
		
		this.state = {
			form: {
				message: '',
				errors: '',
			},
			messages: []
		};
	}
	
	componentDidMount() {
		axios.get('http://dev.tsl.com/api/messages')
		.then(response => {
			return response;
		})
		.then(json => {
			if (typeof json.data.error !== 'undefined') {
				alert('Failed getting messages');
				return;
			}
			
			let m;
			let messages = Object.assign([], this.state.messages);
			for (let i = 0; i < json.data.data.data.length; i++) {
				m = json.data.data.data[i];
				messages.push(m);
			}
			
			this.setState({messages: messages});
		})
		.catch(error => {
			this.handleError(error);
		});
	}
	
	handleChange = e => {
		let form = Object.assign({}, this.state.form);
		form.message = e.target.value;
		form.errors = '';
		
		this.setState({form: form});
	}
	
	handleDelete = (id, e) => {
		e.preventDefault();
		e.persist();
		const t = this;
		
		var formData = new FormData();
		axios.delete('http://dev.tsl.com/api/messages/' + id + '?token=' + t.props.accessToken, formData, {headers: {"Access-Control-Allow-Origin": "*"}})
		.then(response => {
			return response;
		})
		.then(json => {
			if (typeof json.data.error !== 'undefined') {
				alert('Deleting a message failed');
				return;
			}
			
			let card = e.target.parentNode.parentNode;
			card.parentNode.removeChild(card);
		})
		.catch(error => {
			this.handleError(error);
		});
	}
	
	handleError = error => {
		if (typeof error.response === 'undefined') {
			alert('Unknown error!');
			return;
		}
		
		//Setup Generic Response Messages
		if (error.response.status === 401) {
			let form = Object.assign({}, this.state);
			form.errors = error.response.data.error.content;
			this.setState({form: form});
		}
		else if (error.response.status === 404) {
			//html = 'API Route is Missing or Undefined';
		}
		else if (error.response.status === 405) {
			//message.html = 'API Route Method Not Allowed';
		}
		else if (error.response.status === 422) {
			let f = Object.assign({}, this.state.form);
			f.errors = error.response.data.errors.content;
			this.setState({form: f});
		}
		else if (error.response.status >= 500) {
			//message.html = 'Server Error';
		}
	}
	
	handleSubmit = e => {
		e.preventDefault();
		const t = this;
		
		var formData = new FormData();
		formData.append('content', t.state.form.message);
		
		axios.post('http://dev.tsl.com/api/messages?token=' + t.props.accessToken, formData, {headers: {}})
		.then(response => {
			return response;
		})
		.then(json => {
			if (typeof json.data.error !== 'undefined') {
				alert('Adding a message failed');
				return;
			}
			
			const m = json.data.data;
			let messages = Object.assign([], this.state.messages);
			let form = Object.assign({}, this.state);
			messages.unshift(m);
			form.message = '';
			form.errors = '';
			
			this.setState({
				form: form,
				messages: messages,
			});
		})
		.catch(error => {
			this.handleError(error);
		});
	}
	
	render() {
		const messagesList = this.state.messages.map((m) => {
			return (
				<Message
					author={m.user.first_name}
					id={m.id}
					isAuthor={this.props.user && m.user_id === this.props.user.id}
					key={m.id}
					text={m.content}
					updated={m.updated_at}
					onDelete={this.handleDelete}
				 />
			)
		});

	    return (
			<div className="wall">
				{this.props.user &&
				<WallForm
					errors={this.state.form.errors}
					message={this.state.form.message}
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
				}
				
				{messagesList}
				
				<WallPagination />
			</div>
		);
	}
}

export default Wall;
