
import { useState, useEffect } from "react";

import Layout from "../layout/layout";

function FaqPage() {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, [])

    return (
        <Layout>
            <div className="d-flex align-items-center flex-row pt-3 overflow-hidden flex-column" style={{ minHeight: height }}>
                Suponser us
            </div>
        </Layout>
    )
}

export default FaqPage;