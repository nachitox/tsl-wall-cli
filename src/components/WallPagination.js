import React from 'react';
import {
	Pagination,
	PaginationItem,
	PaginationLink,
} from 'reactstrap';

class WallPagination extends React.Component {
	constructor(props) {
		super(props);
		
		this.prevDisabled = this.props.prev ? false : true;
		this.prevEnabled = this.props.next ? false : true;
	}
	
	render() {
		return (
			<Pagination aria-label="Wall pagination" listClassName="justify-content-center">
				<PaginationItem disabled={this.prevDisabled}>
					<PaginationLink previous href={this.props.prev} />
				</PaginationItem>
				<PaginationItem disabled={this.prevEnabled}>
					<PaginationLink next href={this.props.next} />
				</PaginationItem>
			</Pagination>
		);
	}
}

export default WallPagination;
