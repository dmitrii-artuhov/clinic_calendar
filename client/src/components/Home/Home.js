import React, { Component, Fragment } from 'react';

// components
import Header from '../Header/Header';
import Advantage from "../Advantage/Advantage";
import Content from '../Content/Content';
import Offer from '../Offer/Offer';
import Footer from '../Footer/Footer';


export class Home extends Component {
	render() {
		return (
			<Fragment>
				<Header />
        <Content />
        <Advantage />
        <Offer />
        <Footer />
			</Fragment>
		);
	}
}

export default Home;
