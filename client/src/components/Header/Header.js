import React, { Component } from 'react';

import './Header.scss';
import './media.scss';

export class Header extends Component {
	render() {
		return (
			<section className="container">
				<header className="header">
					<div className="header__logo">
						<a href="/"><img alt="logo" src="imgs/logo.svg" /></a>
					</div>
					<div className="header__controlls">
						<button className="header__controlls__button signup">Регистрация</button>
						<button className="header__controlls__button signin">Войти</button>
						<button className="header__controlls__button search">Поиск</button>
					</div>
				</header>
			</section>
		);
	}
}

export default Header;
