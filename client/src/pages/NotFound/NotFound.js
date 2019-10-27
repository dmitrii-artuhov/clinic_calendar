import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './NotFound.scss';

export class NotFound extends Component {
	render() {
		return (
			<div>
				<p>
					Oops, we are sorry but you have mistaken the URL address <br /> \ (^_^) /
				</p>
				<p>
					Please, proceed to the homepage
				</p>
				<Link to="/">Home</Link>
			</div>
		);
	}
}

export default NotFound;
