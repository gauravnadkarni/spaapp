import React from 'react';
import { Button, Col, Form, Container, Row, Card } from 'react-bootstrap';
import './register_box.css';

class RegisterBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.initialState = {
            email: '',
            password: '',
            firstName: '',
            lastName: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    registerUser() {

        this.setState(this.initialState);
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={5}><Panel handleChange={this.handleChange} data={this.state} registerUser={this.registerUser} /></Col>
                </Row>
            </Container>
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
                    <Form.Control type="password" name="password" placeholder="Password" onChange={props.handleChange} />
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