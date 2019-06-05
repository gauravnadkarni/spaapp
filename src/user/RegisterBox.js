import React from 'react';
import {
    Button,
    Col,
    Form,
    Container,
    Row,
    Card,
    Alert
} from 'react-bootstrap';
import axios from 'axios';
import './register_box.css';

class RegisterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState = {
            userData: {
                email: '',
                password: '',
                firstName: '',
                lastName: ''
            },
            isFormSubitted: false,
            isUserRegistered: false,
            validationErrors: [],
            message: ''

        }
        this.handleChange = this.handleChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    handleChange(event) {
        this.setState({ userData: { ...this.state.userData, [event.target.name]: event.target.value } });
    }

    registerUser(event) {
        let obj = this;
        obj.setState({ isFormSubitted: true });
        event.preventDefault();
        axios.post('http://localhost:3535/users/register', obj.state.userData, { headers: { "Content-Type": "application/json" } }).then((response) => {
            if (response.status === 201) {
                obj.setState({ message: 'User Registered Successfully' })
                obj.setState({ isUserRegistered: true });
                setTimeout(() => {
                    obj.setState({ isUserRegistered: false });
                }, 5000);
            }
        }).catch((error) => {
            if (error.response.status === 400) {
                obj.setState({ validationErrors: error.response.data.errors })
            }
        }).finally(() => {
            obj.setState({ userData: obj.initialState.userData });
        });
    }

    render() {
        let alert = null;
        if (this.state.isUserRegistered === true) {
            alert = <Row className="justify-content-md-center">
                <Col md={5}>
                    <Alert key="alert_success" variant="primary">
                        {this.state.message}
                    </Alert>
                </Col>
            </Row>
        } else if (this.state.validationErrors.length !== 0) {
            console.log(this.state.validationErrors);
            let temp = this.state.validationErrors.map((obj, index) => {
                return <Alert key={"alert_danger_" + index} variant="danger" >
                    {obj.msg}
                </Alert >
            });
            alert = <Row className="justify-content-md-center">
                <Col md={5}>
                    {temp}
                </Col>
            </Row>
        }

        return (
            <Container>
                {alert}
                < Row className="justify-content-md-center" >
                    <Col md={5}><Panel handleChange={this.handleChange} data={this.state.userData} registerUser={this.registerUser} /></Col>
                </Row >
            </Container >
        );
    }
}

let Panel = (props) => {
    return (
        <Card>
            <Card.Header>Register</Card.Header>
            <Card.Body>
                <Box handleChange={props.handleChange} data={props.data} registerUser={props.registerUser} />
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

            <Form.Row>
                <Form.Group as={Col} controlId="formGridFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter First Name" name="firstName" value={props.data.firstName} onChange={props.handleChange} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" name="lastName" value={props.data.lastName} onChange={props.handleChange} />
                </Form.Group>
            </Form.Row>

            <Button variant="primary" type="submit" onClick={props.registerUser}>
                Submit
                </Button>
        </Form>
    );
};

export default RegisterBox;