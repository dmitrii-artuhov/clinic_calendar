import React, { Component } from 'react';
import {
	Card,
	CardText,
	CardBody,
	CardTitle,
	Button,
} from 'reactstrap';

import axios from 'axios';

// styles
import './Schedule.scss';

export class Schedule extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null
		}
	}

	static getDerivedStateFromProps(props, state) {
    if (props.user !== state.user) {
			// console.log(props.user);
      return {
				user: props.user
      };
    }
    return null;
  }

	deleteFeaturedUser = (featuredId) => {
		let id = this.state.user._id;

		if(!id || !featuredId) {
			return;
		}

		axios.delete('/api/users/deletefeatured', { data: { id: this.state.user._id, featuredId } })
			.then((res) => {
				console.log(res.data);

				this.setState({
					...this.state,
					user: {
						featuredUsers: res.data.list
					}
				});

				window.location.replace('');
			})
			.catch((err) => {
				console.error(err.response);
			});
	}

	render() {
		return (
			<div>
				{this.state.user.role === 'doctor' ? <h2>Ваши пациенты:</h2> : <h2>Ваши врачи:</h2>}
				<div className="user-list">
					{this.state.user.featuredUsers.map((user, index) => {
						return (
							<Card className="user-list__card" key={index}>
								<CardBody>
									<CardTitle>Имя: {user.username}</CardTitle>
									<CardText>Email: {user.email}</CardText>
									<CardText>Телефон: {user.phone}</CardText>
									<Button color="primary" onClick={() => {
										this.deleteFeaturedUser(user._id);
									}}>Удалить</Button>
								</CardBody>
							</Card>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Schedule;
