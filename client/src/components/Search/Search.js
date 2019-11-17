import React, { Component } from 'react';
import { Button, InputGroupAddon, InputGroup, Input, Label, FormGroup } from 'reactstrap';

// styles
import './Search.scss';

export class Search extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			role: ''
		}
	}

	inputValue = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	render() {
		return (
			<div className="container">
			
			</div>
		);
	}
}

export default Search;
