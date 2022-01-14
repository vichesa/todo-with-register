import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        fullname: "",
        email : "",
        password : "",
        password_confirmation: "",
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "fullname": state.fullname,
                "email":state.email,
                "password":state.password,
                "password_confirmation":state.password_confirmation,
            }
            axios.post(API_BASE_URL+'/api/user', payload)
                .then(function (response) {
                    if(response.status === 201){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }));
                        console.log('reg', response)
                        localStorage.setItem(ACCESS_TOKEN_NAME,response);
                        redirectToHome();
                        props.showError(null)
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/home');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        sendDetailsToServer()    
        // if(state.password === state.confirmPassword) {
        //     sendDetailsToServer()    
        // } else {
        //     props.showError('Passwords do not match');
        // }
    }
    return(
        <div className="card p-4 col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
            <div className="form-group text-left mb-2">
                <label className='mb-1' htmlFor="exampleInputEmail1">Full Name</label>
                <input type="text" 
                       className="form-control" 
                       id="fullname" 
                       placeholder="Enter your Full Name" 
                       value={state.fullname}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left mb-2">
                <label className='w-100' htmlFor="exampleInputEmail1">Email address</label>
                <small id="emailHelp" className="form-text text-danger" style={{ fontSize: "11px" }}>We'll never share your email with anyone else.</small>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left mb-2">
                    <label className='mb-1' htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left mb-4">
                    <label className='mb-1' htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password_confirmation" 
                        placeholder="Confirm Password"
                        value={state.password_confirmation}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="btn w-100 btn-primary"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span style={{ fontSize: "12px" }}>Already have an account? </span>
                <span  className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
    )
}

export default withRouter(RegistrationForm);