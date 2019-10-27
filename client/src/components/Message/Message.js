import React, { Component } from 'react';

import { Alert } from 'reactstrap';

export class Message extends Component {
	render() {
		return (
			this.props.type === 'error' ?
			(<Alert color="danger">
        {this.props.msg}
			</Alert>)
			:
			(<Alert color="info">
				{this.props.msg}
  		</Alert>)
		);
	}
}

export default Message;
