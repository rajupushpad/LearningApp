
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { connect } from "react-redux";

import Layout from "../../../layout/layout";
import CusButton from "../../../components/CusButton";
import APP_STRING from "../../../utils/constants";
import CourseTile from "../../../components/Tiles/CourseTile";
import { createPortal } from "react-dom";
import ModalComponent from "../../../components/Modal/ModalComponent";
import AddNewCourse from "../../../components/AddEditNewEntity/AddCourse";
import actions from "../../../redux/actions";
import EmptyContainer from "../../../components/EmptyContainer";
import ErrorLoaderContainer from "../../../components/ErrorLoaderContainer";

function CategoryPage(props: any) {

    const [height, setHeight] = useState(0);
    const [showCourseModal, setShowCourseModal] = useState(false);
    const [couseActionMode, setCouseActionMode] = useState('add');
    const [editedCourseData, setEditedCourseData] = useState({ title: '', description: '', price: 0 });
    const [isLoading, setIsLoding] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const router = useRouter();

    useEffect(() => {
        setHeight(window.innerHeight);
        actions.getSpecificCategory(router.query.id);
        setIsLoding(true);
    }, []);

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
            setEditedCourseData({ title: '', description: '', price: 0 });
        }
        setShowCourseModal(!showCourseModal);
    }

    return (
        <Layout>
            <div className="p-4 w-100" style={{ minHeight: height }}>
                {!isLoading && <div className="w-100">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4>{APP_STRING.CATEGORY} : {props.categoryRes.category?.title}</h4>
                            <h5>{APP_STRING.DESCRIPTION} : {props.categoryRes.category?.description}</h5>
                        </div>

                        {props.userAuth.user?.token && <div className="d-flex justify-content-between">

                            <CusButton
                                name={APP_STRING.ADD_NEW_COURSE}
                                onClick={handleOpenCourseModal}
                            />
                        </div>}

                    </div>
                    <h5>{APP_STRING.COURSES}: </h5>
                    {
                        !isLoading && props.categoryRes.category?.courses && props.categoryRes.category?.courses.map((item: any, index: number) => {
                            return <CourseTile
                                course={item}
                                key={item.key}
                                onClick={viewCourseDetails}
                                handleEditClick={handleOpenCourseModal}
                            />
                        })
                    }

                    {!isLoading && (!props.categoryRes.category?.courses || props.categoryRes.category?.courses.length == 0) && <div style={{ marginTop: 50 }}><EmptyContainer message={APP_STRING.NO_COURSES} /></div>}

                </div>}

                {isLoading &&
                    <div className="d-flex align-items-center justify-content-center" style={{ height: 500 }}>
                        <ErrorLoaderContainer isLoading={isLoading} errorMsg={errorMsg} /><br />
                    </div>}

                {showCourseModal && createPortal(
                    <ModalComponent
                        mode={couseActionMode}
                        onCloseClick={handleOpenCourseModal}
                        editedCourseData={editedCourseData}
                    >
                        <AddNewCourse />
                    </ModalComponent>, document.body)}
            </div>
        </Layout>
    )
}

const mapStateToProps = (state: any) => ({
    categoryRes: state.courseRes.category,
    userAuth: state.userRes.userAuth
});

export default connect(mapStateToProps)(CategoryPage);