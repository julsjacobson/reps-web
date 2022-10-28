
import { useRef, useState } from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export function SignIn() {
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null) 

    const navigate = useNavigate()
    const {signin} = useAuth()

    const [errors, setErrors] = useState({
        username: {
            error: false,
            message: ' ',
        },
        password: {
            error: false,
            message: ' ',
        },
    })


    const handleSubmit = async () => {
        if (usernameRef.current && passwordRef.current) {
            await signin(usernameRef.current.value, passwordRef.current.value).then((response : any) => {
                console.log(response)
                navigate('/splits')

            }).catch((e : any) => {
                if (e.message == 'Incorrect password') {
                    setErrors({...errors, password: {error: true, message: 'Incorrect or missing password'}})
                } else {
                    setErrors({...errors, username: {error: true, message: 'User not found'}})

                }
            })
        }
    }

    return (
        <Container className='content-container' style={{width: '35%', minWidth: '250pt'}}>
            <Stack gap={3}>
            <h1 style={{color: 'var(--primary)'}} className='align-self-center'>REPS</h1>


            <div className='d-sm-flex flex-column'>
                <h2>Sign in</h2>
                <div style={{gap: '.5em'}} className='d-flex'>
                    <p>Need an account?</p>
                    <NavLink to='/sign-up' className='text-btn' >
                        Sign up
                    </NavLink>
                </div>
                
            </div>

            <Form>
                <Form.Group style={{position: 'relative'}}>
                    <Form.Label className='form-label'>Username</Form.Label>
                    <Form.Control ref={usernameRef} type="text" isInvalid={errors.username.error}/>
                    <Form.Control.Feedback tooltip type='invalid'>{errors.username.message}</Form.Control.Feedback>

                </Form.Group>


                <Form.Group style={{position: 'relative'}}>
                    <Form.Label className='form-label'>Password</Form.Label>
                    <Form.Control ref={passwordRef} type="password" isInvalid={errors.password.error}/>

                    {/* <Form.Control.Feedback tooltip type='invalid'>{errors.password.message}</Form.Control.Feedback> */}


                </Form.Group>


                
                <NavLink to='/reset-password' className='text-btn' >
                        Forgot password?
                </NavLink>


            </Form>


            <div className='d-flex align-self-center flex-column align-items-center' style={{width: '160pt', paddingTop: '2rem'}} >
                <Button 
                    onClick={() => handleSubmit()}
                    variant="success" className='custom-btn'>SIGN IN</Button>
                <h4>OR</h4>
                <Button style={{gap:'.5em'}} variant="light" className='custom-btn secondary d-flex align-items-center justify-content-center'>
                    <img src='/imgs/google-icon.png' height='20px'/>
                    Sign in using Google
                    </Button>

            </div>

            </Stack>
        </Container>
    )
}