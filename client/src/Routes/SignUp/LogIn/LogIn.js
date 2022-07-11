import Navbar from "../../../components/Navbar/Navbar";
import './LogIn.css'
import LogInForm from "./LogInForm";

const LogIn = () => {
    return (
        <div>
            <Navbar />
            <LogInForm />
            <div className="text-center">Don't have an account? <a className="signUpRedir" href="/signup">Sign up.</a></div>
        </div>
    )
}

export default LogIn;