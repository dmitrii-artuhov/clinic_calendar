import React, { Component } from 'react';

export class AdvantageItem extends Component {
  render(props) {
    return (
      <div>
        <div className={this.props.className}>
          <h4 className="advantages__item-title">{this.props.title}</h4>
          <p className="advantages__item-parag">{this.props.parag}</p>
        </div>
      </div>
    );
  }
}

export default AdvantageItem;
