import React from 'react';
import {
    Button,
    Col,
    Form,
    Card,
    Row,
    Container
} from 'react-bootstrap';
import './login_box.css';
import axios from 'axios'
import Layout from '../layout/Layout'

class LoginBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState = {
            userData: {
                email: '',
                password: ''
            },
            isFormSubitted: false,
            isUserLoggedIn: false,
            validationErrors: [],
            message: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.loginUser = this.loginUser.bind(this);
    }

    handleChange(event) {
        this.setState({ userData: { ...this.state.userData, [event.target.name]: event.target.value } });
    }

    loginUser(event) {
        let obj = this;
        obj.setState({ isFormSubitted: true });
        event.preventDefault();
        axios.post('http://localhost:3535/auth/login', obj.state.userData, { headers: { "Content-Type": "application/json" } }).then((response) => {
            if (response.status === 200) {
                obj.setState({ message: 'User Loggedin Successfully' })
                obj.setState({ isUserLoggedIn: true });
            }
        }).catch((error) => {
            if (error.response.status === 400 || error.response.status === 401) {
                obj.setState({ validationErrors: error.response.data.errors })
                setTimeout(() => {
                    obj.setState({ validationErrors: [] });
                }, 5000);
            }
        }).finally(() => {
            obj.setState({ userData: obj.initialState.userData });
        });
    }

    render() {
        let component = null;
        if(this.state.isUserLoggedIn===false){
            component = <Container>
                <Row className="justify-content-md-center" >
                    <Col md={5}><Panel data={this.state.userData} loginUser={this.loginUser} handleChange={this.handleChange}/></Col>
                </Row>
            </Container>;
        }else{
            component = <Layout/>
        }
        return component;
    }
}

let Panel = (props) => {
    return (
        <Card>
            <Card.Header>Login</Card.Header>
            <Card.Body>
                <Box data={props.data} loginUser={props.loginUser} handleChange={props.handleChange}/>
            </Card.Body>
        </Card>
    );
};

let Box = (props) => {
    return (
        <Form>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" value={props.data.email} onChange={props.handleChange} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" value={props.data.password} placeholder="Password" onChange={props.handleChange} />
                </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit" onClick={props.loginUser}>
                Submit
            </Button>
        </Form>
    );
};

export default LoginBox;