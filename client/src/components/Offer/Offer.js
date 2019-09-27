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
							Таким образом начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития
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
