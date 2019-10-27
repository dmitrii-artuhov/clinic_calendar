import React, { Component } from 'react';
import {
  Button,
  Form,
  FormGroup,
  Label,
	Input,
	Spinner
} from 'reactstrap';
import axios from 'axios';

// styles
import './PasswordRecovery.scss';

// components
import Message from '../Message/Message';

export class PasswordRecovery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			loading: false,
			info: null,
			error: null
		}
	}

	inputData = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	}

	passwordForgot = (e) => {
		e.preventDefault();
		const { email } = this.state;

		this.setState({
			loading: true
		});

		axios.post('/api/users/forgot', { email })
			.then((res) => {
				console.log(res.data);
				this.setState({
					...this.state,
					loading: false,
					error: null,
					info: res.data.msg
				});
			})
			.catch(err => {
				console.error(err.response);
				this.setState({
					...this.state,
					info: null,
					loading: false,
					error: err.response.data.msg
				});
			});
	}

	render() {
		return (
			<div className="container forgot-form">
				{this.state.error ? <Message msg={this.state.error} type="error" /> : null}
				{this.state.info ? <Message msg={this.state.info} type="info" /> : null}
				<Form>
					<FormGroup>
						<Label for='email' className="forgot-form__label">Введите почту для восстановления пароля:</Label>
						{this.state.loading ? (<Spinner className="loading-spinner" size="sm" color="primary" />) : null}
						<Input
							type='email'
							name='email'
							placeholder='Почта'
							className='mb-3'
							onInput={this.inputData}
							required
						/>
						<Button onClick={this.passwordForgot} className="submit__button" style={{ marginTop: '2rem' }} block>
							Далее
						</Button>
						<br />
					</FormGroup>
				</Form>
			</div>
		);
	}
}

export default PasswordRecovery;
