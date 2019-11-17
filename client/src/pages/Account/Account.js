import React, { Component } from 'react';
import axios from 'axios';

// styles
import './Account.scss';
import Profile from '../../components/Profile/Profile';
import Schedule from '../../components/Schedule/Schedule';

export class Account extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: this.props.location.state.user,
		}
	}

	componentWillMount = () => {
		if(!this.props.location.state) {
			window.location.replace('/404');
			return;
		}

		axios.get(`/api/users/listfeatured/${this.state.user._id}`)
			.then((user) => {
				this.setState({
					...this.state,
					user: user.data
				});
			})
			.catch((err) => {
				console.error(err);
			});

	}

	render() {
		return (
			<div className="container">
				<Profile user={this.state.user} />
				<Schedule user={this.state.user} />
			</div>
		);
	}
}

export default Account;
