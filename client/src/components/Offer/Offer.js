import React, { Component } from 'react';

import './Offer.scss';
import './media.scss';

export class Offer extends Component {
	render() {
		return (
			<section className="section">
				<div className="container offer">
					<div className="offer__info">
						<h2>
							Готовы начать? <br />
							Зарегистрируйтесь!
						</h2>
						<p>
							Получите свободу от постоянных и ненужных звонков и писем в информационные отделения больниц. Пишете своему лечащему врачу напряму и получайте рекомендации, не посещая медецинских учереждений.
						</p>
					</div>
					<div className="offer__register">
						<a className="offer__button" href="#header">Регистрация</a>
					</div>
				</div>
			</section>
		);
	}
}

export default Offer;
