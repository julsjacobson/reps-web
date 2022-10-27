import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export function SignUp() {
    return (
        <Container className='content-container' style={{width: '35%', minWidth: '250pt'}}>
            <Stack gap={3}>
            <h1 style={{color: 'var(--primary)'}} className='align-self-center'>REPS</h1>

            <div className='d-sm-flex flex-column'>
                <h2>Sign up</h2>
                <div style={{gap: '.5em'}} className='d-flex'>
                    <p>Already have an account?</p>
                    <NavLink to='/sign-in' className='text-btn' >
                        Sign in
                    </NavLink>
                </div>
                
            </div>

            <Form>
                <Form.Group>
                    <Form.Label className='form-label'>Username</Form.Label>
                    <Form.Control type="text"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label className='form-label'>Email</Form.Label>
                    <Form.Control type="email"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label className='form-label'>Password</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>

                <Form.Group>
                    <Form.Label className='form-label'>Retype Password</Form.Label>
                    <Form.Control type="password"/>
                </Form.Group>
            </Form>

            <div className='d-flex align-self-center flex-column align-items-center' style={{width: '160pt', paddingTop: '2rem'}} >
                <Button variant="success" className='custom-btn'>SIGN UP</Button>
                <h4>OR</h4>
                <Button style={{gap:'.5em'}} variant="light" className='custom-btn secondary d-flex align-items-center justify-content-center'>
                    <img src='/imgs/google-icon.png' height='20px'/>
                    Sign up using Google
                    </Button>

            </div>
            </Stack>


        </Container>
    )
}