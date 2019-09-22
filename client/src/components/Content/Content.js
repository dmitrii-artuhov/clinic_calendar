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
							Специализированное программное
							обеспечение, расширяющее возможности пациентов и предоставляющее возможность 
							гибкой настройки расписания
						</p>
					</div>

					<div className="content__explain">
						<div className="content__line">
							<div className="content__item">
								Простота использования
							</div>
							<div className="content__item">
								Расписание всегда под рукой
							</div>
						</div>
						<div className="content__line">
							<div className="content__item">
								Структурированная информация 
							</div>
							<div className="content__item">
								Структурированная информация 
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
