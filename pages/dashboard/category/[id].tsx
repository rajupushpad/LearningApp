
import { useState, useEffect, lazy, Suspense } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { createPortal } from "react-dom";

import APP_STRING from "../../../utils/constants";
import actions from "../../../redux/actions";
import SuspenseLoader from "../../../components/Loaders/SuspenseLoader";
import ErrorBoundary from "../../../components/ErrorLoaderContainer/ErrorBoundary";

const ModalComponent = lazy(() => import('../../../components/Modal/ModalComponent'));
const AddNewCourse = lazy(() => import('../../../components/AddEditNewEntity/AddCourse'));
const CusButton = lazy(() => import('../../../components/CusButton'));
const EmptyContainer = lazy(() => import('../../../components/EmptyContainer'));
const ErrorLoaderContainer = lazy(() => import('../../../components/ErrorLoaderContainer'));
const CourseTile = lazy(() => import('../../../components/Tiles/CourseTile'));

type courseDataType = {
    title: string;
    description: string;
    price: number;
    _id: string;
    categoryId: string;
}

let defaultCourseData = { title: '', description: '', price: 0, _id: '', categoryId: '' };

function CategoryPage(props: any) {

    const router = useRouter();

    const [height, setHeight] = useState<number>(0);
    const [showCourseModal, setShowCourseModal] = useState<boolean>(false);
    const [couseActionMode, setCouseActionMode] = useState<string>('add');
    const [editedCourseData, setEditedCourseData] = useState<courseDataType>(defaultCourseData);
    const [isLoading, setIsLoding] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>('');

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        if (router.isReady) {
            actions.getSpecificCategory(router.query.id);
            setIsLoding(true);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (isLoading) {
            if (props.categoryRes.category?.title) {
                setIsLoding(false);
            } else if (props.categoryRes?.message) {
                setIsLoding(false);
                setErrorMsg(props.categoryRes.message);
            }
        }

    }, [props.categoryRes]);

    const viewCourseDetails = (item: any) => {
        router.push({ pathname: '/dashboard/courses/' + item._id });
    }

    const handleOpenCourseModal = (type: string, e: any, data?: any) => {
        setCouseActionMode(type);
        setShowCourseModal(!showCourseModal)

        setCouseActionMode(type);
        if (type == 'edit') {
            setEditedCourseData(data);
            e.stopPropagation();
        } else {
            setEditedCourseData(defaultCourseData);
        }
        setShowCourseModal(!showCourseModal);
    }

    return (
        <div className="p-4 w-100" style={{ minHeight: height }}>
            {!isLoading && <div className="w-100">
                <div className="d-flex justify-content-between">
                    <div>
                        <h4>{APP_STRING.CATEGORY} : {props.categoryRes.category?.title}</h4>
                        <h5>{APP_STRING.DESCRIPTION} : {props.categoryRes.category?.description}</h5>
                    </div>

                    {props.userAuth.user?.token && <div className="d-flex justify-content-between">
                        <ErrorBoundary>
                            <Suspense fallback={<SuspenseLoader />}>
                                <CusButton
                                    name={APP_STRING.ADD_NEW_COURSE}
                                    onClick={handleOpenCourseModal}
                                />
                            </Suspense>
                        </ErrorBoundary>
                    </div>}

                </div>
                <h5>{APP_STRING.COURSES}: </h5>
                {
                    !isLoading && props.categoryRes.category?.courses && props.categoryRes.category?.courses.map((item: any, index: number) => {
                        return <ErrorBoundary key={item.key}>
                            <Suspense fallback={<SuspenseLoader />}>
                                <CourseTile
                                    course={item}

                                    onClick={viewCourseDetails}
                                    handleEditClick={handleOpenCourseModal}
                                />
                            </Suspense>
                        </ErrorBoundary>

                    })
                }

                {!isLoading && (
                    !props.categoryRes.category?.courses ||
                    props.categoryRes.category?.courses.length == 0
                ) &&
                    <div style={{ marginTop: 50 }}>
                        <ErrorBoundary>
                            <Suspense fallback={<SuspenseLoader />}>
                                <EmptyContainer message={APP_STRING.NO_COURSES} />
                            </Suspense>
                        </ErrorBoundary>
                    </div>}

            </div>}

            {isLoading &&
                <div className="d-flex align-items-center justify-content-center" style={{ height: 500 }}>
                    <ErrorBoundary>
                        <Suspense fallback={<SuspenseLoader />}>
                            <ErrorLoaderContainer isLoading={isLoading} errorMsg={errorMsg} /><br />
                        </Suspense>
                    </ErrorBoundary>
                </div>}

            {showCourseModal && createPortal(
                <ErrorBoundary>
                    <Suspense fallback={<SuspenseLoader />}>
                        <ModalComponent
                            mode={couseActionMode}
                            onCloseClick={handleOpenCourseModal}
                            editedCourseData={editedCourseData}
                        >
                            <AddNewCourse />
                        </ModalComponent>
                    </Suspense>
                </ErrorBoundary>
                , document.body)}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    categoryRes: state.courseRes.category,
    userAuth: state.userRes.userAuth
});

export default connect(mapStateToProps)(CategoryPage);