import React, { Component } from 'react';
import AdvantageItem from "../AdvantageItem/AdvantageItem"

import "./Advantage.scss";
import "./media.scss";

export class Advantage extends Component {
  state = {
    src: 'imgs/mobility.png',
    links: [
      "imgs/mobility.png",
      "imgs/speed.png",
      "imgs/ability.png"
    ]
  };

  changeElement = (target) => {
    const itemsContainer = document.querySelectorAll('.advantages__item');
    if(target.closest('.advantages__item') || target.matches('.advantages__item')) {

      target = target.closest('.advantages__item');

      itemsContainer.forEach((item, index) => {
        item.classList.remove('advantages__item-active');

        if(item === target) {
          this.setState({
            src: this.state.links[index]
          });
          item.classList.add('advantages__item-active');
        }
      });

    }
  };

  render() {
    return (
      <section className="advantages">
        <div className="container">

        <div className="advantages__content">
          
          <h2 className="advantages__title">
            Почему стоит выбрать <span className="advantages__title-name">ClinicCalendar</span>?
          </h2>

          <div className="advantages__left">
            <div className="advantages__imgs">
                <img src={this.state.src} alt="" className="advantages__img"></img>
            </div>

            <div className="advantages__items" onClick={(event) => {
              this.changeElement(event.target);
            }}>

              <AdvantageItem 
              className="advantages__item advantages__item-active"
              title="Мобильность" 
              parag="Приложение всегда под рукой. Нет необходимости стоять
               в очередях для записи на консультации врачей." 
               />
              
              <AdvantageItem 
              className="advantages__item"
              title="Скорость" 
              parag="Легко и быстро связывайтесь со своим врачем по его контактам."
              />

              <AdvantageItem 
              className="advantages__item"
              title="Возможность использования" 
              parag="Необыкновенно высокая доступность использования веб-сайта, все настолько просто."
              />

            </div>
          </div>
        </div>

        </div>
      </section>
    );
  }
}

export default Advantage;
