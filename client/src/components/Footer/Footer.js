import React, { Component } from 'react';

// styles
import './Footer.scss';

export class Footer extends Component {
	render() {
		return (
			<section className="container footer">
				<div className="footer__info">
					<h2>ClinicCalendar</h2>
					<p>
						Не следует, однако забывать, что сложившаяся структура организации представляет собой интересный эксперимент проверки существенных финансовых и административных условий.
					</p>
				</div>
				<div className="footer__socials">
					<ul>
						<a href="https://vk.com"><li><i className="fab fa-vk"></i></li></a>
						<a href="https://www.instagram.com/?hl=ru"><li><i className="fab fa-instagram"></i></li></a>
						<a href="https://ru-ru.facebook.com/"><li><i className="fab fa-facebook-f"></i></li></a>
					</ul>
				</div>
			</section>
		);
	}
}

export default Footer;
