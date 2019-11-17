import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export class Verify extends Component {
	constructor(props) {
		super(props);

		this.state = {
			msg: '',
		}
	}

	componentDidMount = () => {
		const token = this.props.match.params.verificationToken;

		axios.post('/api/users/verify', {token})
			.then((res) => {
				console.log(res);
				this.setState({
					msg: res.data.msg
				});
			})
			.catch((err) => {
				console.error(err, err.response);
				this.setState({
					msg: err.response.data.msg
				});
			});
	}

	render() {
		return (
			<div>
				<div>{this.state.msg}</div>
				<Link to="/">Home</Link>
			</div>
		);
	}
}

export default Verify;
