import { Suspense, lazy } from 'react';
import { connect } from "react-redux";

import ErrorBoundary from "../ErrorLoaderContainer/ErrorBoundary";
import SuspenseLoader from '../Loaders/SuspenseLoader';
import APP_STRING from '../../utils/constants';

const CusButton = lazy(() => import('../../components/CusButton'));

function ActionBar(props: any) {

    return (
        <>
            {props.userAuth.user?.token && <div className="d-flex justify-content-end">
                <ErrorBoundary>
                    <Suspense fallback={<SuspenseLoader />}>
                        <CusButton
                            name={APP_STRING.ADD_NEW_CATEGORY}
                            onClick={(e: any) => props.manageToShowAddEditCategory('add', e)}
                        />
                    </Suspense>
                </ErrorBoundary>
            </div>}
        </>
    )
}

const mapStateToProps = (state: any) => ({
    userAuth: state.userRes.userAuth
});


export default connect(mapStateToProps)(ActionBar);