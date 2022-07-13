import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import SignUpForm from './SignUpForm';
import styles from './SignUp.module.css'
const SignUp = () => {


    return (<div>
        <Navbar />
        <h1 class={`${styles.signUp__header} text-center my-5`}>Sign up for your free tat.cx. </h1>
        <SignUpForm></SignUpForm>
        <div class="text-center">Have an account? <a className={styles.loginRedir} href="/login">Log in.</a></div>
    </div>

    );
}

export default SignUp;