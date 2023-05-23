import { useEffect, useState } from "react";
import { connect } from "react-redux";

import InputField from "./InputField";
import CusButton from "./CusButton";
import CusTxtBtn from "./CusTxtBtn";
import Signup from "./Signup";
import APP_STRING from "../utils/constants";
import actions from '../redux/actions'
import { useRouter } from "next/router";
import ErrorLoaderContainer from "./ErrorLoaderContainer";

function Login(props:any) {

    const [userData, setUserData] = useState({ email: '', password: '' });
    const [currentView, setCurrentView] = useState('login');
    const [errorMsg, setErrorMessage] = useState('');
    const [isLoading, setLoading] = useState(false);

    const router = useRouter();

    const handleLogin = (e: Event) => {
        if(userData.email && userData.password) {
            console.log(JSON.stringify(userData));
            actions.userLogin(userData);
            setLoading(true);
        }
        e.preventDefault();
        e.stopPropagation();
    }

    const doSignup = () => {
        setCurrentView('signup');
    }

    const handleChangeInput = (e: any) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
        setErrorMessage('')
    }

    useEffect(()=>{
        let res = props.userAuth;
        if(res.user?.token) {
            setLoading(false);
            props.onCloseClick();
            router.push('/dashboard');
        } else if(res.user?.message) {
            setLoading(false);
            setErrorMessage(res.user?.message);
        }
    }, [props.userAuth]);

    const loginView = () => {
        return (
            <>

                <h4>{APP_STRING.LOGIN}</h4>
                <form >
                    <InputField
                        type="email"
                        name="email"
                        title="Email"
                        id="email"
                        placeholder={APP_STRING.EMAIL_PLACEHOLDER}
                        style={{ marginBottom: 20 }}
                        onChange={handleChangeInput}
                        required={true}
                    />

                    <InputField
                        type="password"
                        name="password"
                        title="Password"
                        id="password"
                        placeholder={APP_STRING.PASSWORD_PLACEHOLDER}
                        style={{ marginBottom: 20 }}
                        onChange={handleChangeInput}
                        required={true}
                    />

                    <CusButton
                        name={APP_STRING.SUBMIT}
                        type="submit"
                        disabled={isLoading ? true : false}
                        onClick={handleLogin}
                        style={isLoading ? { marginBottom: 20, opacity: ".6" } : { marginBottom: 20 }}
                    />

                </form>

                <ErrorLoaderContainer 
                    errorMsg={errorMsg}
                    isLoading={isLoading}
               />

                <CusTxtBtn
                    text="Signup"
                    className='d-flex justify-content-center align-items-center'
                    onClick={doSignup}
                />
            </>
        )
    }

    return (
        <>
            {currentView == 'login' ? loginView() : <Signup />}
        </>
    )
}

const mapStateToProps = (state:any) => ({
    userAuth: state.userRes.userAuth
  });
  
  
export default connect(mapStateToProps)(Login);