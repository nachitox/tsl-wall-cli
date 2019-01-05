import React from 'react';
import {
	Picture,
} from 'react-responsive-picture';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';

class Navigation extends React.Component {
	constructor(props) {
		super(props);
		
		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true,
		};
	}
	
	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}
	
	render() {
		return (
			<div>
				<Navbar color="tsl" dark expand="md">
					<NavbarBrand href="/">
					<Picture alt="Wall logo" sources = {[
						{
							srcSet: "/images/logo.png 1x, /images/logo@2x.png 2x",
						},
					]}
					/>
					</NavbarBrand>
					<NavbarToggler onClick={this.toggleNavbar} />
					<Collapse isOpen={!this.state.collapsed} navbar>
						<Nav className="ml-auto" navbar>
							<NavItem>
								<NavLink href="/login">Login</NavLink>
							</NavItem>
							<NavItem>
								<NavLink href="/register">Sign up</NavLink>
							</NavItem>
						</Nav>
					</Collapse>
				</Navbar>
			</div>
		);
	}
}

export default Navigation;
