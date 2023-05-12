
import { useState, useEffect } from "react";

import Layout from "../layout/layout";

function DashboardPage() {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, [])

    return (
        <Layout>
            <div className="d-flex align-items-center flex-row pt-3 overflow-hidden flex-column" style={{ minHeight: height }}>
                Hello dashboard
            </div>
        </Layout>
    )
}

export default DashboardPage;