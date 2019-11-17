import React, { Component, Fragment } from 'react';

// components
import Auth from '../../components/Auth/Auth';
// import Search from '../../components/Search/Search';
import Advantage from "../../components/Advantage/Advantage";
import Content from '../../components/Content/Content';
import Offer from '../../components/Offer/Offer';
import Footer from '../../components/Footer/Footer';


export class Home extends Component {
	render() {
		return (
			<Fragment>
				<Auth />
        <Content />
        <Advantage />
        <Offer />
        <Footer />
			</Fragment>
		);
	}
}

export default Home;
