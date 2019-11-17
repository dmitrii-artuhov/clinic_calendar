import React, { Component } from 'react';
import {
	InputGroup,
	InputGroupAddon,
	Input
} from 'reactstrap';

// styles
import './Profile.scss';

export class Profile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			phone: null,
			role: ''
		}
	}

	componentDidMount = () => {
		const { user } = this.props;
		this.setState({
			username: user.username,
			email: user.email,
			phone: user.phone,
			role: user.role
		});
	}

	render() {
		return (
			<div className="profile">
				<h2 className="profile__info-text">Информация профиля:</h2>
				<InputGroup>
					<InputGroupAddon className="profile__addon-tag" addonType="prepend">Email</InputGroupAddon>
					<Input disabled type="email" name="email" placeholder={this.state.email} />
				</InputGroup>
				<br />
				<InputGroup>
					<InputGroupAddon className="profile__addon-tag" addonType="prepend">Username</InputGroupAddon>
					<Input disabled type="text" name="username" placeholder={this.state.username} />
				</InputGroup>
				<br />
				<InputGroup>
					<InputGroupAddon className="profile__addon-tag" addonType="prepend">Phone</InputGroupAddon>
					<Input disabled type="phone" name="phone" placeholder={this.state.phone} />
				</InputGroup>
			</div>
		);
	}
}

export default Profile;
