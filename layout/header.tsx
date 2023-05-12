import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useRouter } from 'next/router';

import Login from '../components/Login';
import ModalComponent from '../components/Modal/ModalComponent';
import CusTxtBtn from '../components/CusTxtBtn';
import Styles from './layout.module.scss';
import APP_STRING from '../utils/constants';
import actions from '../redux/actions';

function Header(props:any) {

    const defaultVal = {firstName: '', lastName: '', email: '', token: '', id: ''};
    const [showLogin, setShowLogin] = useState(false);
    const [isUserLoggedIn, setUserLoggedIn] = useState(false);
    const [user, setUserInfo] = useState(defaultVal);
    
    const router = useRouter();

    const handleLogin = () => {
        setShowLogin(!showLogin);
    }

    const handleLogout = () => {
        actions.userLogout();
    }

    useEffect(()=>{
        let res = props.userAuth;
        if(res.user?.token) {
            setUserLoggedIn(true);
            setUserInfo(res.user);
            router.push('/dashboard');
        }else{
            setUserInfo(defaultVal);
            setUserLoggedIn(false);

            if(router.pathname.includes('dashboard')) {
                router.push('/');
            }
        }
    }, [props.userAuth]);

    return(
        <div className={`p-3 d-flex justify-content-between ${Styles.header}`}>
            <div>{APP_STRING.ONLINE_LEARNING_PLATFORM}</div>
            {!isUserLoggedIn && <CusTxtBtn text="Login" onClick={handleLogin} />}
            {showLogin && createPortal(<ModalComponent modalName="Login" onCloseClick={handleLogin}><Login /></ModalComponent>, document.body)}
            
            {isUserLoggedIn && <div className="d-flex">
                <div>Hello { user.firstName }</div>
                <div style={{marginLeft: 5}}>
                    <CusTxtBtn text="Logout" onClick={handleLogout} />
                </div>
            </div>}
        </div>
    )
}

const mapStateToProps = (state:any) => ({
    userAuth: state.userRes.userAuth
  });
  
  
export default connect(mapStateToProps)(Header);