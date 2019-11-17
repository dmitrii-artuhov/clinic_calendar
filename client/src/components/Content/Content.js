import React, { Component } from 'react';

// styles
import './Content.scss';
import './media.scss';

export class Content extends Component {
	render() {
		return (
			<section className="container content">
				<div className="content__text">
					<div className="content__desc">
						<h1>Clinic Calendar</h1>
						<p>
							Приложение, позволяющее экономить время и получать только актуальную информацию о вашем лечащем враче
						</p>
					</div>

					<div className="content__explain">
						<div className="content__line">
							<div className="content__item">
								Простота использования
							</div>
							<div className="content__item">
								Контакты врача всегда под рукой
							</div>
						</div>
						<div className="content__line">
							<div className="content__item">
								Никаких звонков в справочные отделения
							</div>
							<div className="content__item">
								Связывайтесь с врачом напрямую
							</div>
						</div>
					</div>
				</div>
				<div className="content__img">
					<img alt="img1" src="imgs/img1.png" />
					<div className="content__bg"></div>
				</div>
			</section>
		);
	}
}

export default Content;
