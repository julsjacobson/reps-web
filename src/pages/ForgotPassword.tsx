
import { useRef, useState } from "react";
import { Button, Container, Form, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export function ForgotPassword() {
    const emailRef = useRef<HTMLInputElement>(null)

    const {resetPassword} = useAuth()

    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const handleSubmit = async () => {
        if (emailRef.current) 
            await resetPassword(emailRef.current.value).then(() => {
                setSuccess('Please check your email for further instructions')
                setError('')
            }).catch((e) => {
                setError('Email not found')
                setSuccess('')

            }) 
    }

    return (
        <Container className='content-container' style={{width: '35%', minWidth: '250pt'}}>
            <Stack gap={3}>
            <h1 style={{color: 'var(--primary)'}} className='align-self-center'>REPS</h1>


            <div className='d-sm-flex flex-column'>
                <h2>Forgot password</h2>
            
            </div>

            <Form>

                <Form.Group style={{position: 'relative'}}>
                    <Form.Label className='form-label'>Email</Form.Label>
                    <Form.Control ref={emailRef} type="email"/>
                </Form.Group>

                { error != '' && <p style={{color: 'var(--red)'}}>{error}</p> }
                { success != '' && <p>{success}</p> }

  

            </Form>


            <div className='d-flex align-self-center flex-column align-items-center gap-3' style={{width: '160pt', paddingTop: '2rem'}} >
                <Button 
                    onClick={() => handleSubmit()}
                    variant="success" className='custom-btn'>RESET PASSWORD</Button>
              <NavLink to='/sign-in' className='text-btn' >
                    Back to login
                </NavLink>

            </div>

            </Stack>
        </Container>
    )
}