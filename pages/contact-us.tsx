
import { useState, useLayoutEffect } from "react";

import Layout from "../layout/layout";
import APP_STRING from "../utils/constants";

function ContactUsPage() {
    const [height, setHeight] = useState(0);

    useLayoutEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    return (
        <Layout>
            <div
                className="d-flex align-items-center flex-row pt-3 overflow-hidden flex-column"
                style={{ minHeight: height }}>
                {APP_STRING.CONTACT_US}
            </div>
        </Layout>
    )
}

export default ContactUsPage;