import React, { Component } from 'react';
import {
	Picture,
} from 'react-responsive-picture';
import {
	NavLink as RRNavLink,
} from "react-router-dom";
import {
	Collapse,
	Container,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
} from 'reactstrap';

class Navigation extends Component {
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
			<div className="bg-tsl">
				<Container className="pl-0 pr-0">
					<Navbar color="tsl" dark expand="md">
						<NavbarBrand tag={RRNavLink} to="/">
						<Picture alt="Wall logo" sources = {[
							{
								srcSet: "/images/logo.png 1x, /images/logo@2x.png 2x",
							},
						]}
						/>
						</NavbarBrand>
						<NavbarToggler onClick={this.toggleNavbar} />
						<Collapse isOpen={!this.state.collapsed} navbar>
							{!this.props.isLoggedIn &&
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink tag={RRNavLink} to="/login">Login</NavLink>
								</NavItem>
								<NavItem>
									<NavLink tag={RRNavLink} to="/register">Sign up</NavLink>
								</NavItem>
							</Nav>
							}
							{this.props.isLoggedIn &&
							<Nav className="ml-auto" navbar>
								<NavItem>
									<NavLink href="/logout" onClick={this.props.onLogout}>Logout</NavLink>
								</NavItem>
							</Nav>
							}
						</Collapse>
					</Navbar>
				</Container>
			</div>
		);
	}
}

export default Navigation;
