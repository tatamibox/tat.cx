import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogInForm.module.css'
const axios = require('axios');

const LogInForm = () => {

  //posting to login on the backend, uses inputted username &
  //password and sends it to backend

  const navigate = useNavigate();
  const url = '/login';

  const logInHandler = (e) => {
    e.preventDefault();

    axios.post(url, { username: enteredUsername, password: enteredPassword })
      .then((res) => {
        console.log(res)
        localStorage.setItem('token', res.data.data)
        navigate('/')
      })
  }


  //handlers for input forms 
  const [enteredUsername, setEnteredUsername] = useState('');
  const usernameChangeHandler = (e) => {
    setEnteredUsername(e.target.value);
  }

  const [enteredPassword, setEnteredPassword] = useState('');
  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  }



  return (
    <div class={styles.logInForm__container}>
      <form class="form-inline newUserForm" onSubmit={logInHandler}>

        <label class="sr-only" for="username">Username</label>
        <div class="input-group mb-4 mr-sm-2">
          <div class="input-group-prepend">
            <div class="input-group-text">tat.cx/</div>
          </div>
          <input type="text" class="form-control" id="username" placeholder="Username" onChange={usernameChangeHandler} name="username" required />
        </div>
        <label class="sr-only" for="password">Password</label>
        <div class="input-group mb-4 mr-sm-2">
          <input type="password" class="form-control" id="password" onChange={passwordChangeHandler} placeholder="Password" name="password" required />
        </div>

        <div class="form-check mb-3 mr-sm-2">
          <input class="form-check-input" type="checkbox" id="inlineFormCheck" />
          <label class="form-check-label" for="inlineFormCheck">
            Remember me
          </label>
        </div>

        <button type="submit" class={`${styles.form__submit} mb-2 py-2 px-3`}>Login</button>
      </form>
    </div>
  )
}

export default LogInForm;