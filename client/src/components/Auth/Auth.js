import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

// controllers
import fetchWithRefresh from '../../controllers/fetchWithRefresh';

// components
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
	Input,
	CustomInput,
	Spinner
} from 'reactstrap';

import Message from '../Message/Message';

// styles
import './Auth.scss';
import './media.scss';

export class Auth extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			isAuthenticated: false,
			error: null,
			info: null,
			registerModal: {
				isOpen: false,
				name: '',
				email: '',
				password: '',
				phone: null,
				role: '',
				code: null
			},
			loginModal: {
				isOpen: false,
				email: '',
				password: ''
			}
		}
	}

	componentDidMount = () => {
		try {
			fetchWithRefresh('api/users', 'GET')
				.then((res) => {

					this.setState({
						...this.state,
						user: res ? res.user : {},
						isAuthenticated: res ? true : false
					});
				})
				.catch((err) => {
					console.error(err);
				});

		} catch(err) {
			console.error(err);
		}
	}
	
	clearErrors = () => {
		this.setState({
			...this.state,
			error: null,
			info: null
		});
	}

	toggleRegister = () => {
		this.clearErrors();
		this.setState({
			registerModal: {
				isOpen: !this.state.registerModal.isOpen,
			}
		});
	}

	toggleLogin = () => {
		this.clearErrors();
		this.setState({
			loginModal: {
				isOpen: !this.state.loginModal.isOpen,
			}
		});
	}

	inputRegister = (e) => {
		this.clearErrors();
		this.setState({
			registerModal: {
				...this.state.registerModal,
				[e.target.name]: e.target.value
			}
		});

		if(this.state.registerModal.role === 'patient' && this.state.registerModal.code !== null) {
			this.setState({
				registerModal: {
					...this.state.registerModal,
					code: null
				}
			});
		}
	}

	inputLogin = (e) => {
		this.clearErrors();
		this.setState({
			loginModal: {
				...this.state.loginModal,
				[e.target.name]: e.target.value
			}
		});
	}

	// HTTP Calls to a server
	registerUser = (e) => {
		e.preventDefault();
		this.clearErrors();

		const body = {
			username: this.state.registerModal.name,
			email: this.state.registerModal.email,
			password: this.state.registerModal.password,
			role: this.state.registerModal.role,
			phone: this.state.registerModal.phone,
			mark: this.state.registerModal.code
		}

		this.setState({
			...this.state,
			loading: true
		});

		axios.post('api/users/register', body)
			.then((res) => {
				// this.setState({
				// 	...this.state,
				// 	user: res.data.user,
				// 	isAuthenticated: true,
				// 	registerModal: {}
				// });

				// localStorage.setItem('accessToken', res.data.accessToken);
				// localStorage.setItem('expiresAt', res.data.expiresAt);
				// localStorage.setItem('refreshToken', res.data.refreshToken);
				this.setState({
					...this.state,
					loading: false,
					info: {
						msg: res.data.msg
					},
					registerModal: {}
				});

				setTimeout(() => {
					this.setState({
						...this.state,
						info: null
					});
				}, 5000);

			})
			.catch((err) => {
				this.setState({
					...this.state,
					loading: false,
					error: {
						msg: err.response.data.msg
					}
				});
				console.error('Register Fail:', err.response);
			});
	}

	loginUser = (e) => {
		e.preventDefault();
		this.clearErrors();

		const body = {
			email: this.state.loginModal.email,
			password: this.state.loginModal.password
		}

		this.setState({
			...this.state,
			loading: true
		});

		axios.post('api/users/login', body)
			.then((res) => {
				this.setState({
					...this.state,
					user: res.data.user,
					isAuthenticated: true,
					loading: false,
					loginModal: {}
				});

				localStorage.setItem('accessToken', res.data.accessToken);
				localStorage.setItem('expiresAt', res.data.expiresAt);
				localStorage.setItem('refreshToken', res.data.refreshToken);
			})
			.catch((err) => {
				this.setState({
					...this.state,
					loading: false,
					error: {
						msg: err.response.data.msg
					}
				});
				console.error('Login Fail:', err.response);
			});
	}

	logoutUser = () => {
		localStorage.clear();
		window.location.replace('/');
	}

	// togglePasswordRecovery = (e) => {
	// 	e.preventDefault();

	// 	this.setState({
	// 		...this.state,
	// 		passwordRecovery: !this.state.passwordRecovery
	// 	});
	// }

	render() {
		return (
			<section className="container">
				{this.state.info ? <Message msg={this.state.info.msg} type="info" /> : null}
				<header className="header" id="header">
					<div className="header__logo">
						<a href="/"><img alt="logo" src="imgs/logo.svg" /></a>
					</div>
					<div className="header__controlls">
						{!this.state.isAuthenticated ? (
						<div>
							<button onClick={this.toggleRegister} className="header__controlls__button signup">Регистрация</button>
							<button onClick={this.toggleLogin} className="header__controlls__button signin">Войти</button>
						</div>
						) : (
							<Fragment>
								<Link to={{
									pathname: '/profile',
									state: {
										user: this.state.user,
									}
								}}>Личный кабинет</Link>
								<button onClick={this.logoutUser} className="header__controlls__button">Выйти</button>	
							</Fragment>
						)}
					</div>
				</header>
			
				{/* Register */}
				<Modal isOpen={this.state.registerModal.isOpen} toggle={this.toggleRegister}>
					<ModalHeader toggle={this.toggleRegister}>
						Регистрация   
						{this.state.loading ? (<Spinner className="loading-spinner" size="sm" color="primary" />) : null}
					</ModalHeader>
					<ModalBody>
						{this.state.error ? <Message msg={this.state.error.msg} type="error" /> : null}
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for='name'>Имя</Label>
								<Input
									type='text'
									name='name'
									placeholder='Иван Иванов'
									className='mb-3'
									onInput={this.inputRegister}
									required
								/>

								<Label for='email'>Электронная почта</Label>
								<Input
									type='email'
									name='email'
									placeholder='Почта будет использована для завершения регистрации'
									className='mb-3'
									onInput={this.inputRegister}
									required
								/>

								<Label for='password'>Пароль</Label>
								<Input
									type='password'
									name='password'
									placeholder='Пароль'
									className='mb-3'
									onInput={this.inputRegister}
									required
								/>

								<Label for='number'>Номер телефона</Label>
								<Input
									type='number'
									name='phone'
									placeholder='89184004040'
									className='mb-3'
									onInput={this.inputRegister}
									required
								/>	

								<CustomInput
								checked={this.state.registerModal.role === "doctor"}
								type="radio"
								id="doctor"
								value="doctor"
								name="role"
								label="Врач"
								inline
								onChange={this.inputRegister}
								required />

								<CustomInput
								checked={this.state.registerModal.role === "patient"}
								type="radio"
								id="patient"
								value="patient"
								name="role"
								label="Пациент"
								inline
								onChange={this.inputRegister}
								className="mb-3"
								required />

								{this.state.registerModal.role === 'doctor' ? (
									<div>
										<Label for='number'>Код учреждения</Label>
										<Input
											type='text'
											name='code'
											placeholder='Код учреждения'
											className='mb-3'
											onInput={this.inputRegister}
											required
										/>
									</div>	
								) :	''}

								<Button onClick={this.registerUser} className="submit__button" style={{ marginTop: '2rem' }} block>
									Далее
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>

				{/* Login */}
				<Modal isOpen={this.state.loginModal.isOpen} toggle={this.toggleLogin}>
          <ModalHeader toggle={this.toggleLogin}>
						Войти
						{this.state.loading ? (<Spinner className="loading-spinner" size="sm" color="primary" />) : null}							
					</ModalHeader>
          <ModalBody>
						{this.state.error ? <Message msg={this.state.error.msg} type="error" /> : null}
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
								<Label for='email'>Электронная почта</Label>
								<Input
									type='email'
									name='email'
									placeholder='Почта'
									className='mb-3'
									onInput={this.inputLogin}
									required
								/>

								<Label for='password'>Пароль</Label>
								<Input
									type='password'
									name='password'
									placeholder='Пароль'
									className='mb-3'
									onInput={this.inputLogin}
									required
								/>

                <Button onClick={this.loginUser} className="submit__button" style={{ marginTop: '2rem' }} block>
                  Далее
                </Button>
								<br />
								<Link to="forgot">Забыли пароль?</Link>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
			</section>
		);
	}
}

export default Auth;
