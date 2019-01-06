import React, { Component } from 'react';

import Message from './Message';
import WallForm from './WallForm';
import WallPagination from './WallPagination';

class Wall extends Component {
	render() {
	    return (
			<div className="wall">
				<WallForm />
			
				<Message author="Luke C." text="Lorem ipsum dolor sit amet, consectetur adipiscing elit." updated="Posted just now" />
				<Message author="Carl D." text="Duis pretium, odio in malesuada ornare, lectus lacus maximus purus, eu malesuada erat lorem vitae mi." updated="Posted 3 mins ago" />
				<Message author="Mike E." text="Quisque leo lorem, iaculis a sem ullamcorper, aliquam gravida erat. Vestibulum lectus eros, varius gravida mi vitae, fermentum pulvinar dui." updated="Posted 1 day ago" />
				<Message author="Tom F." text="Vestibulum suscipit volutpat augue, id fermentum nunc pellentesque quis. Etiam eget tincidunt augue." updated="Posted 2 weeks ago" />
				<Message author="Frank G." text="Pellentesque venenatis, nibh nec fringilla porttitor, nisi leo tempus nunc, vitae sollicitudin diam urna sed risus. In quis magna ut ligula ultricies cursus." updated="Posted on 10th July, 2014" />
				
				<WallPagination />
			</div>
		);
	}
}

export default Wall;
