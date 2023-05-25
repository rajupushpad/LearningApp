import Link from 'next/link';

import Syles from './layout.module.scss';
import APP_STRING from '../utils/constants';

function Footer() {

    return (
        <div className={`${Syles.footer} p-3 d-flex justify-content-between`}>
            <div>
                <h3>{APP_STRING.CATEGORIES}</h3>
                <div>11th</div>
                <div>12th</div>
                <div>10th</div>
            </div>

            <div>
                <h3>{APP_STRING.JOIN_US}</h3>
                <Link href="/become-trainer">{APP_STRING.BECOME_TRAINER}</Link><br />
                <Link href="/sponser-us">{APP_STRING.SPONSER_PAGE}</Link>
            </div>

            <div>
                <h3>{APP_STRING.SUPPORT}</h3>
                <Link href="/faq">{APP_STRING.FAQ}</Link><br />
                <Link href="/contact-us">{APP_STRING.CONTACT_US}</Link>
            </div>
        </div>
    )
}

export default Footer;