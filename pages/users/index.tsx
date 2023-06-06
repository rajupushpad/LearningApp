import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const UserDashboard: any = dynamic(() => import('next2/UserDashboard'), {
    ssr: false,
});

function UserDashboardPage(props: any) {

    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    return (
        <div
            className="d-flex flex-row pt-3 overflow-hidden flex-column p-4"
            style={{ minHeight: height }}
        >
            <UserDashboard />
        </div>
    )
}

export default UserDashboardPage;