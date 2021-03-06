import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { API_BASE_URL, ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import { withRouter } from 'react-router-dom';
import { result } from 'lodash';

function LoginForm(props) {
  const [state, setState] = useState({
    email: '',
    password: '',
    successMessage: null,
  });
  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();
    const payload = {
      grant_type: 'password',
      client_id: '7b48f795-a4b1-4506-8f48-d955935e4002',
      client_secret: 'demo-secret',
      username: state.username,
      password: state.password,
      scope: '*',
    };

    var formdata = new FormData();
    formdata.append('grant_type', 'password');
    formdata.append('client_id', '7b48f795-a4b1-4506-8f48-d955935e4002');
    formdata.append('client_secret', 'demo-secret');
    formdata.append('username', state.email);
    formdata.append('password', state.password);
    formdata.append('scope', '*');

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    fetch('https://accounts.tujjudemo.com/api/oauth/token', requestOptions)
      .then((response) => response.text())
      .then((result) => localStorage.setItem('ACCESS_TOKEN_NAME', result)).then(
        check()
      )
      .catch((error) => console.log('error', error));
    // axios
      // .post(API_BASE_URL + "/api/oauth/token", requestOptions)
      // .then(function (response) {
      //   console.log("login", response);
      //   if (response.status === 200) {
      //     setState((prevState) => ({
      //       ...prevState,
      //       successMessage: "Login successful. Redirecting to home page..",
      //     }));
      //     localStorage.setItem(ACCESS_TOKEN_NAME, response.data.token);
      //     redirectToHome();
      //     props.showError(null);
      //   } else if (response.code === 204) {
      //     props.showError("Username and password do not match");
      //   } else {
      //     props.showError("Username does not exists");
      //   }
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });
  };

  const check = () => {
    var resp = JSON.parse(localStorage.getItem('ACCESS_TOKEN_NAME'))
    console.log('res',resp)
    if(resp.status.code == 200){
      redirectToHome()
    }else{
      props.showError('Unauthorized : email or password wrong')
      
    }
  }
  const redirectToHome = () => {
    props.updateTitle('Home');
    props.history.push('/home');
  };
  const redirectToRegister = () => {
    props.history.push('/register');
    props.updateTitle('Register');
  };
  return (
    <div className="card p-4 col-12 col-lg-4 login-card mt-2 hv-center">
      <form>
        <div className="form-group text-left mb-2">
          <label className="mb-1" htmlFor="exampleInputEmail1">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            value={state.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-left mb-2">
          <label className="mb-1" htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-check"></div>
        <button
          type="submit"
          className="btn btn-primary w-100"
          onClick={handleSubmitClick}
        >
          Submit
        </button>
      </form>
      <div
        className="alert alert-success mt-2"
        style={{ display: state.successMessage ? 'block' : 'none' }}
        role="alert"
      >
        {state.successMessage}
      </div>
      <div className="registerMessage">
        <span>Dont have an account? </span>
        <span className="loginText" onClick={() => redirectToRegister()}>
          Register
        </span>
      </div>
    </div>
  );
}

export default withRouter(LoginForm);
