import { useEffect, useState } from "react";
import { connect } from "react-redux";

import InputField from "./InputField";
import CusButton from "./CusButton";
import CusTxtBtn from "./CusTxtBtn";
import Signup from "./Signup";
import APP_STRING from "../utils/constants";
import actions from '../redux/actions'

function Login(props:any) {

    const [userData, setUserData] = useState({ email: '', password: '' });
    const [currentView, setCurrentView] = useState('login');
    const [errorMsg, setErrorMessage] = useState('');

    const handleLogin = (e: Event) => {
        if(userData.email && userData.password) {
            console.log(JSON.stringify(userData));
            actions.userLogin(userData);
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
            props.onCloseClick();
        } else if(res.user?.message) {
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
                        onClick={handleLogin}
                        style={{ marginBottom: 20 }}
                    />

                </form>

                {
                    errorMsg && <div className="d-flex justify-content-center" style={{ marginTop: 20, marginBottom: 20, color: 'red' }}>{errorMsg}</div>
                }

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