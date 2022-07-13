import Navbar from "../../../components/Navbar/Navbar";
import styles from './LogIn.module.css'
import LogInForm from "./LogInForm";

const LogIn = () => {
    return (
        <div>
            <Navbar />
            <LogInForm />
            <div className="text-center">Don't have an account? <a className={styles.signUpRedir} href="/signup">Sign up.</a></div>
        </div>
    )
}

export default LogIn;