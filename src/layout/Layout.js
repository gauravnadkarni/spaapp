import React from 'react';
import {
    NavDropdown,
    Nav,
    Navbar,
    Button,
    Col,
    Form,
    FormControl,
    Container,
    Row,
    Card,
    Alert
} from 'react-bootstrap';
import Header from './Header'
import Footer from './Footer'

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState = {
           
        }
    }

    render() {
        return (
            <div>
                <Header />
                <Footer />
            </div>
        );
    }
};

export default Layout;