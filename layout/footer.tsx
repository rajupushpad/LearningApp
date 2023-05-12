import Syles from './layout.module.scss';
import { useRouter } from 'next/router';
import CusTxtBtn from '../components/CusTxtBtn';

function Footer() {

    const router = useRouter();

    return(
        <div className={`${Syles.footer} p-3 d-flex justify-content-between`}>
            <div>
                <h3>Categories</h3> 
                <div>11th</div> 
                <div>12th</div>
                <div>10th</div>
            </div>

            <div>
                <h3>Join us</h3> 
                <CusTxtBtn text="Become trainer" onClick={()=>{router.push('/become-trainer')}} />
                <CusTxtBtn text="Sponser Us" onClick={()=>{router.push('/sponser-us')}} />
            </div>

            <div>
                <h3>Support</h3> 
                <CusTxtBtn text="FAQ" onClick={()=>{router.push('/faq')}} />
                <CusTxtBtn text="Contact Us" onClick={()=>{router.push('/contact-us')}} />
            </div>
        </div>
    )
}

export default Footer;