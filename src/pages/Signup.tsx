import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Form, InputGroup, Stack } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usernameExists, emailExists } from "../firebase";

export function SignUp() {
    const emailRef = useRef<HTMLInputElement>(null)
    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null) 
    const passwordConfirmRef = useRef<HTMLInputElement>(null) 

    const [isValid, setIsValid] = useState<Boolean>(false)
 
    const [errors, setErrors] = useState({
        username: {
            error: false,
            message: ' ',
        },
        email: {
            error: false,
            message: ' ',
        },
        password: {
            error: false,
            message: ' ',
        },
        confirmPassword: {
            error: false,
            message: ' ',
        }
    })
     

    const { signup } = useAuth()

    const handleSubmit = async () => {
        validate()
        if (isValid && emailRef.current && usernameRef.current && passwordRef.current) {
            signup(emailRef.current.value, passwordRef.current.value, usernameRef.current.value)
        }




    }

    const validateUsername = async () => {
        if (usernameRef.current == null || usernameRef.current.value == '')
            return { error: true, message: 'Username is required'}
        else {
            let exists = await usernameExists(usernameRef.current ? usernameRef.current.value : '')
            if (exists) 
                return {error: true, message: 'Username already exists'}
            else 
                return {error: false, message: ''}

        }
    }

    const validateEmail= async () => {
        if (emailRef.current == null || emailRef.current.value == '')
            return {error: true, message: 'Email is required'}
        else {
            let exists = await emailExists(emailRef.current ? emailRef.current.value : '')
            if (exists) 
                return {error: true, message: 'Email already exists'}
            else 
                return {error: false, message: ''}

        }
    }

    const validatePassword = () => {
        if (passwordRef.current == null || passwordRef.current.value == '') 
            return {error: true, message: 'Password is required' }
        else if (passwordRef.current.value.length < 6) 
            return {error: true, message: 'Password must be more than 6 characters' }
        else if (!/\d/.test(passwordRef.current.value))
            return {error: true, message: 'Password must have at least 2 numbers' }
        else {
            return {error: false, message: ''}
        }
    }

    const validateConfirmPassword = () => {
        if (passwordConfirmRef.current == null || passwordConfirmRef.current.value == '') 
            return {error: true, message: 'Please confirm password' }
        else if (!passwordRef.current || passwordConfirmRef.current.value !== passwordRef.current.value) 
            return {error: true, message: 'Passwords do not match' }
        else  return {error: false, message: ''}
    }

    const validate = async() => {
        setErrors({
            username: await validateUsername(), 
            email: await validateEmail(),
            password: validatePassword(),
            confirmPassword: validateConfirmPassword()        
        })
    }


    useEffect(() => {
        let valid = true 
        Object.values(errors).forEach((value) => {
            if (value.error) valid = false
            else if (!value.error && value.message != '')valid = false
        })

        setIsValid(valid)
    },[errors])


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
                <Form.Group style={{position: 'relative'}}>
                    <Form.Label className='form-label'>Username</Form.Label>
                    <Form.Control isInvalid={errors.username.error} 
                        ref={usernameRef} type="username"
                        onChange={() => validate()}
                        // isValid={errors.username.valid}

                    />
                    <Form.Control.Feedback tooltip type='invalid'>{errors.username.message}</Form.Control.Feedback>

                </Form.Group>

                <Form.Group style={{position: 'relative'}}>
                    <Form.Label  className='form-label'>Email</Form.Label>
                    <Form.Control ref={emailRef} type="email"
                        onChange={() => validate()}
                        isInvalid={errors.email.error} 
                    />

                    <Form.Control.Feedback tooltip type='invalid'>{errors.email.message}</Form.Control.Feedback>

                </Form.Group>

                <Form.Group style={{position: 'relative'}}>
                    <Form.Label className='form-label'>Password</Form.Label>
                    <Form.Control ref={passwordRef}  type="password"
                         onChange={() => validate()}
                         isInvalid={errors.password.error} 
                    />
                    <Form.Control.Feedback tooltip type='invalid'>{errors.password.message}</Form.Control.Feedback>

                </Form.Group>

                <Form.Group style={{position: 'relative'}}>
                    <Form.Label className='form-label'>Retype Password</Form.Label>
                    <Form.Control ref={passwordConfirmRef}  type="password"
                        onChange={() => validate()}
                        isInvalid={errors.confirmPassword.error} 
                    />

                    <Form.Control.Feedback tooltip type='invalid'>{errors.confirmPassword.message}</Form.Control.Feedback>

                </Form.Group>
            </Form>

            <div className='d-flex align-self-center flex-column align-items-center' style={{width: '160pt', paddingTop: '2rem'}} >
                <Button onClick={() => handleSubmit()} variant="success" className='custom-btn'>SIGN UP</Button>
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