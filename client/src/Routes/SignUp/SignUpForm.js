import React, { useState } from 'react';
import styles from './SignUpForm.module.css'
import { useNavigate } from 'react-router-dom';
const axios = require('axios');
const url = 'http://localhost:3001/signup';

const SignUpForm = () => {

  const navigate = useNavigate();

  //states + handlers for signup input values
  const [enteredFullName, setEnteredFullName] = useState('');
  const fullNameChangeHandler = (e) => {
    setEnteredFullName(e.target.value);

  }


  const [enteredUsername, setEnteredUsername] = useState('');
  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  }


  const [enteredPassword, setEnteredPassword] = useState('');
  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  }

  // submit button handler called when submit is clicked
  const submitHandler = (e) => {
    e.preventDefault();

    // posts to signup with all inputted values, then redirects user to login page
    axios.post('/signup', {
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
    <div class={styles.form__container}>
      <form class={`form-inline ${styles.newUserForm}`} onSubmit={submitHandler}>
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
          <input type="password" onChange={passwordChangeHandler} class="form-control" id="password" placeholder="Password" name="password" required />
        </div>
        message from eric: <br></br>passwords currently have no rules, will change later
        <button type="submit" class={`${styles.form__submit} mb-2 py-2 px-3`}>Submit</button>
      </form>
    </div>
  )
}

export default SignUpForm;