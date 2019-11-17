import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Form,
  FormGroup,
  Label,
	Input,
	Spinner
} from 'reactstrap';
import axios from 'axios';

// components
import Message from '../Message/Message';

export class PasswordRecovery extends Component {
	constructor(props) {
		super(props);

		this.state = {
			password: '',
			loading: false,
			info: null,
			error: null,
			processed: false
		}
	}

	inputData = (e) => {
		this.setState({
			...this.state,
			[e.target.name]: e.target.value
		});
	}

	passwordReset = (e) => {
		e.preventDefault();
		const { password } = this.state;
		const { resetToken } = this.props.match.params;

		this.setState({
			loading: true
		});

		axios.post('/api/users/reset', { password, token: resetToken })
			.then((res) => {
				this.setState({
					...this.state,
					password: '',
					loading: false,
					error: null,
					info: res.data.msg,
					processed: true
				});
			})
			.catch((err) => {
				console.error(err);
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
				<Form onSubmit={(e) => {e.preventDefault()}}>
					<FormGroup>
						<Label for='password' className="forgot-form__label">Введите новый пароль:</Label>
						{this.state.loading ? (<Spinner className="loading-spinner" size="sm" color="primary" />) : null}
						<Input
							type='password'
							name='password'
							value={this.state.password}
							placeholder='Пароль'
							className='mb-3'
							onInput={this.inputData}
							required
						/>
						{this.state.processed ? <Link to="/">На главную</Link> : (
						<Button onClick={this.passwordReset} className="submit__button" style={{ marginTop: '2rem' }} block>
							Сохранить
						</Button>
						)}
						<br />
					</FormGroup>
				</Form>
			</div>
		);
	}
}

export default PasswordRecovery;
