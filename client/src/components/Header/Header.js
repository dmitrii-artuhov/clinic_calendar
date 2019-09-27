import React, { Component } from 'react';

// components
//import { Form, Button } from 'react-bootstrap';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
	Input,
	CustomInput
} from 'reactstrap';

import './Header.scss';
import './media.scss';

export class Header extends Component {
	constructor(props) {
		super(props);

		this.state = {
			registerModal: {
				isOpen: false,
				name: '',
				email: '',
				password: '',
				phone: '',
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

	toggleRegister = () => {
		this.setState({
			registerModal: {
				isOpen: !this.state.registerModal.isOpen,
			}
		});
	}

	toggleLogin = () => {
		this.setState({
			loginModal: {
				isOpen: !this.state.loginModal.isOpen,
			}
		});
	}

	inputRegister = (e) => {
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
			console.log('changed');
		}
		console.log(this.state.registerModal);
	}

	inputLogin = (e) => {
		this.setState({
			loginModal: {
				...this.state.loginModal,
				[e.target.name]: e.target.value
			}
		});
	}

	render() {
		return (
			<section className="container">
				<header className="header" id="header">
					<div className="header__logo">
						<a href="/"><img alt="logo" src="imgs/logo.svg" /></a>
					</div>
					<div className="header__controlls">
						<button onClick={this.toggleRegister} className="header__controlls__button signup">Регистрация</button>
						<button onClick={this.toggleLogin} className="header__controlls__button signin">Войти</button>
						{/* <button className="header__controlls__button search">Поиск</button> */}
					</div>
				</header>

				{/* Register */}
				<Modal isOpen={this.state.registerModal.isOpen} toggle={this.toggleRegister}>
					<ModalHeader toggle={this.toggleRegister}>Регистрация</ModalHeader>
					<ModalBody>
						<Form onSubmit={this.onSubmit}>
							<FormGroup>
								<Label for='name'>Имя</Label>
								<Input
									type='text'
									name='name'
									placeholder='Иван Иванов'
									className='mb-3'
									onChange={this.inputRegister}
									required
								/>

								<Label for='email'>Электронная почта</Label>
								<Input
									type='email'
									name='email'
									placeholder='Почта будет использована для завершения регистрации'
									className='mb-3'
									onChange={this.inputRegister}
									required
								/>

								<Label for='password'>Пароль</Label>
								<Input
									type='password'
									name='password'
									placeholder='Пароль'
									className='mb-3'
									onChange={this.inputRegister}
									required
								/>

								<Label for='number'>Номер телефона</Label>
								<Input
									type='number'
									name='number'
									placeholder='89184004040'
									className='mb-3'
									onChange={this.inputRegister}
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
										<Label for='number'>Личный код врача</Label>
										<Input
											type='number'
											name='code'
											placeholder='Личный код'
											className='mb-3'
											onChange={this.inputRegister}
											required
										/>
									</div>	
								) :	''}

								<Button className="submit__button" style={{ marginTop: '2rem' }} block>
									Далее
								</Button>
							</FormGroup>
						</Form>
					</ModalBody>
				</Modal>

				{/* Login */}
				<Modal isOpen={this.state.loginModal.isOpen} toggle={this.toggleLogin}>
          <ModalHeader toggle={this.toggleLogin}>Войти</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
							<Label for='email'>Электронная почта</Label>
								<Input
									type='email'
									name='email'
									placeholder='Почта'
									className='mb-3'
									onChange={this.inputLogin}
								/>

								<Label for='password'>Пароль</Label>
								<Input
									type='password'
									name='password'
									placeholder='Пароль'
									className='mb-3'
									onChange={this.inputLogin}
								/>

                <Button className="submit__button" style={{ marginTop: '2rem' }} block>
                  Далее
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
			</section>
		);
	}
}

export default Header;
