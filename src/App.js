import React, { Component } from 'react';
import {
	Container,
	Jumbotron,
} from 'reactstrap';

import Navigation from './components/Navigation';
import Wall from './components/Wall';

import './App.css';


class App extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<Jumbotron>
					<h1 className="display-3 text-center">TSL Wall</h1>
				</Jumbotron>
				<Container>
					<Wall />
				</Container>
			</div>
		);
	}
}

export default App;
