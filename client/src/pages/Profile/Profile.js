import React, { Component } from 'react';

// styles
import './Profile.scss';

export class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			phone: null,
		}
	}

	componentDidMount = () => {
		if(!this.props.location.state) {
			window.location.replace('/404');
			return;
		}

		const { user } = this.props.location.state;

		this.setState({
			username: user.username,
			email: user.email,
			phone: user.phone
		});
	}

	render() {
		return (
			<div>
				<ul>
					<li>{this.state.username}</li>
					<li>{this.state.email}</li>
					<li>{this.state.phone}</li>
				</ul>
			</div>
		);
	}
}

export default Profile;
