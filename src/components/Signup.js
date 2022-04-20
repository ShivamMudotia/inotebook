//rafce

import React, {useState} from "react";
import {useNavigate} from "react-router-dom"

const Signup = (props) => {

  //const host = "http://localhost:4000";
  const host = process.env.REACT_APP_BACKEND_HOST
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    // to avoid page reload
    e.preventDefault();
    const {name, email,  password } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //Save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate('/');
      props.showAlert("Account Created Successfully !", "success");
    } else {
      props.showAlert("Something Went Wrong ! or User Already Registered !", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container mt-3">
      <h2>Enter details below to Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='name' className='form-label'>
              Name
            </label>
            <input type='text' className='form-control' id='name' name="name" onChange={onChange} aria-describedby='emailHelp' />
          </div>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input type='email' className='form-control' id='email' name="email" onChange={onChange} aria-describedby='emailHelp' />
            <div id='emailHelp' className='form-text'>
              ALERT - We will share your email and password with everyone :)
            </div>
          </div>
          <div className='mb-3'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input type='password' className='form-control' id='password' name="password" minLength={5} required onChange={onChange} />
          </div>
          {/* <div className='mb-3'>
            <label htmlFor='cpassword' className='form-label'>
              Confirm Password
            </label>
            <input type='password' className='form-control' id='cpassword' name="cpassword" minLength={5} required onChange={onChange} />
          </div> */}
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
