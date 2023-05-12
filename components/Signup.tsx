import { useState, useEffect } from "react";
import { connect } from "react-redux";

import InputField from "./InputField";
import CusButton from "./CusButton";
import CusTxtBtn from "./CusTxtBtn";
import Login from "./Login";
import APP_STRING from "../utils/constants";
import actions from '../redux/actions'

function Signup(props:any) {

    const [userData, setUserData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const [currentView, setCurrentView] = useState('signup');
    const [errorMsg, setErrorMessage ] = useState('');

    const handleSignup = (e: Event) => {
        if(userData.email && userData.password && userData.firstName && userData.lastName) {
            console.log(JSON.stringify(userData));
            actions.userSignup(userData);
        }
        e.stopPropagation();
    }

    const doLogin = () => {
        setCurrentView('login');
    }

    const handleInputChange = (e: any) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    useEffect(()=>{
        let res = props.signupRes || {};
        if(res.user?.email) {
            setCurrentView('login');
        } else if(res.user?.message) {
            setErrorMessage(res.user?.message);
        }
    }, [props.signupRes]);

    const signupView = () => {
        return (
            <>

                <h4>{APP_STRING.SIGNUP}</h4>

                <InputField
                    type="input"
                    name="firstName"
                    title={APP_STRING.FIRST_NAME}
                    placeholder={APP_STRING.FIRST_NAME_PLACEHOLDER}
                    style={{ marginBottom: 20 }}
                    onChange={handleInputChange}
                    required={true}
                    minLength="4"
                />

                <InputField
                    type="input"
                    name="lastName"
                    title={APP_STRING.LAST_NAME}
                    placeholder={APP_STRING.LAST_NAME_PLACEHOLDER}
                    style={{ marginBottom: 20 }}
                    onChange={handleInputChange}
                    required={true}
                    minLength="4"
                />

                <InputField
                    type="email"
                    name="email"
                    title={APP_STRING.EMAIL}
                    placeholder={APP_STRING.EMAIL_PLACEHOLDER}
                    style={{ marginBottom: 20 }}
                    onChange={handleInputChange}
                    required={true}
                />

                <InputField
                    type="password"
                    name="password"
                    title={APP_STRING.PASSWORD}
                    placeholder={APP_STRING.PASSWORD_PLACEHOLDER}
                    style={{ marginBottom: 20 }}
                    onChange={handleInputChange}
                    required={true}
                />

                <CusButton
                    name={APP_STRING.SUBMIT}
                    onClick={handleSignup}
                    style={{ marginBottom: 20 }}
                    // type="submit"
                />

                {
                    errorMsg && <div className="d-flex justify-content-center" style={{ marginTop: 20, marginBottom: 20, color: 'red' }}>{errorMsg}</div>
                }

                <CusTxtBtn
                    text={APP_STRING.LOGIN}
                    className='d-flex justify-content-center align-items-center'
                    onClick={doLogin}
                />
            </>
        )
    }

    return (
        <>
            {currentView == 'login' ? <Login /> : signupView()}
        </>
    )
}

const mapStateToProps = (state:any) => ({
    signupRes: state.userRes.signup
});
  
export default connect(mapStateToProps)(Signup);
