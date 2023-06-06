'use client';

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";

import APP_STRING from "../../utils/constants";
import CusButton from "../CusButton";
import InputField from "../InputField";
import ErrorLoaderContainer from "../ErrorLoaderContainer";
import actions from "../../redux/actions";
import ProcessCompleteAlert from "../ProcessCompleteAlert";

type courseDataType = {
    title: string;
    description: string;
    price: number;
    _id?: number;
    categoryId?: number | string;
}

function AddCourse(props: any) {

    const [courseData, setcourseData] = useState<courseDataType>({ title: '', description: '', price: 0 });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isCourseAdded, setIsCourseAdded] = useState<boolean>(false);
    const [errorMsg, setErrorMessage] = useState<string>('');
    const [successMsg, setSuccessMsg] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        setcourseData({
            ...courseData,
            title: props.editedCourseData?.title,
            description: props.editedCourseData?.description,
            _id: props.editedCourseData?._id,
            categoryId: props.editedCourseData?.categoryId || router.query.id
        });
    }, []);

    useEffect(() => {
        if(isLoading) {
            if (props.addCourse?.course?.title) {
                setLoading(false);
                setIsCourseAdded(true);
                setSuccessMsg(props.addCourse?.message);
                actions.getSpecificCategory(router.query.id);
            } else {
                setErrorMessage(props.addCourse?.message);
                setLoading(false);
            }
        }
       
    }, [props.addCourse]);

    const handleAddCourse = () => {
        setLoading(true);

        if (courseData.title && courseData.description) {
            if (props.mode == 'edit') {
                actions.updateCourse(courseData);
            } else {
                actions.addNewCourse(courseData);
            }
        } else {
            setErrorMessage(APP_STRING.PLEASE_FILL_ALL_THE_DETAILS);
            setLoading(false);
        }
    }

    const handleChangeInput = (e: any) => {
        setcourseData({ ...courseData, [e.target.name]: e.target.value });

        if (errorMsg) {
            setErrorMessage('');
        }
    }

    const closeAddCategoryPopup = () => {
        props.onCloseClick();
    }

    const viewAddCourse = () => {
        return (
            <>
                <h4>{props.mode == 'edit' ? APP_STRING.UPDATE_COURSE : APP_STRING.ADD_NEW_COURSE}</h4>

                <InputField
                    type="text"
                    name="title"
                    title={APP_STRING.COURSE_NAME}
                    id="title"
                    value={courseData.title}
                    placeholder={APP_STRING.PLACEHOLDER_COURSE_NAME}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />

                <InputField
                    type="text"
                    name="description"
                    title={APP_STRING.COURSE_DESCRIPTION}
                    id="description"
                    value={courseData.description}
                    placeholder={APP_STRING.PLACEHOLDER_COURSE_DESCRIPTION}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />

                <InputField
                    type="number"
                    name="price"
                    title={APP_STRING.COURSE_PRICE}
                    id="price"
                    value={courseData.price}
                    placeholder={APP_STRING.PLACEHOLDER_COURSE_PRICE}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />


                <CusButton
                    name={props.mode == 'edit' ? APP_STRING.UPDATE_COURSE : APP_STRING.ADD_NEW_COURSE}
                    type="submit"
                    disabled={isLoading ? true : false}
                    onClick={handleAddCourse}
                    style={isLoading ? { marginBottom: 20, opacity: ".6" } : { marginBottom: 20 }}
                />

                <ErrorLoaderContainer
                    errorMsg={errorMsg}
                    isLoading={isLoading}
                />
            </>
        )
    }

    return (
        <>
            {
                !isCourseAdded ?  viewAddCourse() : 
                <ProcessCompleteAlert
                    message={successMsg || APP_STRING.ADD_CATEGORY_SUCCESS}
                    actionBtnName="Ok"
                    onClick={closeAddCategoryPopup}
                />
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    addCourse: state.courseRes.addCourse
});


export default connect(mapStateToProps)(AddCourse);