import React, { useState } from 'react';
import './SignUpForm.css'
import { useNavigate } from 'react-router-dom';
const axios = require('axios');
const url = 'http://localhost:3001/signup';

const SignUpForm = () => {

  const navigate = useNavigate();
  // full name listener
  const [enteredFullName, setEnteredFullName] = useState('');
  const fullNameChangeHandler = (e) => {
    setEnteredFullName(e.target.value);

  }

  // username listener
  const [enteredUsername, setEnteredUsername] = useState('');
  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  }

  // password listener
  const [enteredPassword, setEnteredPassword] = useState('');
  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  }


  const submitHandler = (e) => {
    e.preventDefault();

    axios.post(url, {
      fullName: enteredFullName,
      password: enteredPassword,
      username: enteredUsername
    })

      .then(response => {
        console.log(response);

      });
    // axios.post(url, user)
    navigate('/login')
  }

  return (
    <div class="form__container">
      <form class="form-inline newUserForm" onSubmit={submitHandler}>
        <label class="sr-only" for="fullName">Full Name</label>
        <input type="text" onChange={fullNameChangeHandler} class="form-control mb-4 mr-sm-2" id="fullName" placeholder="Jane Doe" name="fullName" required />

        <label class="sr-only" for="username">Username</label>
        <div class="input-group mb-4 mr-sm-2">
          <div class="input-group-prepend">
            <div class="input-group-text">tat.cx/</div>
          </div>
          <input type="text" class="form-control" id="username" placeholder="Username" name="username" onChange={usernameChangeHandler} required />
        </div>
        <label class="sr-only" for="password">Password</label>
        <div class="input-group mb-4 mr-sm-2">
          <input type="text" onChange={passwordChangeHandler} class="form-control" id="password" placeholder="Password" name="password" required />
        </div>

        <button type="submit" class="form__submit mb-2 py-2 px-3">Submit</button>
      </form>
    </div>
  )
}

export default SignUpForm;