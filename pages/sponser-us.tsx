
import { useState, useEffect } from "react";

import APP_STRING from "../utils/constants";

function SponserUsPage() {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    return (
        <div
            className="d-flex align-items-center flex-row pt-3 overflow-hidden flex-column"
            style={{ minHeight: height }}>
            {APP_STRING.SPONSER_PAGE}
        </div>
    )
}

export default SponserUsPage;