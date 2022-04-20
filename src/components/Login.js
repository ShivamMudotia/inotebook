//rafce

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  //const host = "http://localhost:4000";
  const host = process.env.REACT_APP_BACKEND_HOST
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    // to avoid page reload
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Logged In Successfully !", "success");
    } else {
        props.showAlert("Incorrect Credentials ! or Something Went Wrong !", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container mt-3">
      <h2>Login to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label htmlFor='email' className='form-label'>
            Email address
          </label>
          <input
            type='email'
            className='form-control'
            id='email'
            name='email'
            value={credentials.email}
            onChange={onChange}
            aria-describedby='emailHelp'
          />
          <div id='emailHelp' className='form-text'>
          ALERT - We will share your email and password with everyone :)
          </div>
        </div>
        <div className='mb-3'>
          <label htmlFor='password' className='form-label'>
            Password
          </label>
          <input type='password' className='form-control' id='password' name='password' value={credentials.password} onChange={onChange} />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
