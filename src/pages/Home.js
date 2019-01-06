import React, { Component } from 'react';
import {
	Container,
	Jumbotron,
} from 'reactstrap';

import Wall from '../components/Wall';

class Home extends Component {
	render() {
		return (
			<div>
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


export default Home;
