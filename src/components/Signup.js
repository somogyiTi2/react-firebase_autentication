import React, { useRef } from 'react';
//rfc
import { Form, Button, Card } from 'react-bootstrap';

export default function Signup() {
    const emailRef = useRef();
    const passworldRef = useRef();
    const passworldConfirmRef = useRef();

    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className='text-center mb-4'>Sign up </h2>
                    <Form>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="passworld">
                            <Form.Label>Passworld</Form.Label>
                            <Form.Control type='passworld' ref={passworldRef} required></Form.Control>
                        </Form.Group>
                        <Form.Group id="passworld-confirm">
                            <Form.Label>Passworld Confirm</Form.Label>
                            <Form.Control type='passworld' ref={passworldConfirmRef} required></Form.Control>
                        </Form.Group>
                        <Button className='w-100' type='submit'>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w100 text-center mt-2'>
                Aleready have an acount? Log In
            </div>
        </>
    )
}
