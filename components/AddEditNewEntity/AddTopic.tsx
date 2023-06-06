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

type topicDataType = {
    title: string;
    description: string;
    _id?: number;
    courseId?: number
}

function AddTopic(props: any) {

    const [topicData, setTopicData] = useState<topicDataType>({ title: '', description: '' });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isTopicAdded, setIsTopicAdded] = useState<boolean>(false);
    const [errorMsg, setErrorMessage] = useState<string>('');
    const [successMsg, setSuccessMsg] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        setTopicData({
            ...topicData,
            title: props.editedTopicData?.title,
            description: props.editedTopicData?.description,
            _id: props.editedTopicData?._id,
            courseId: props.editedTopicData?.courseId || router.query.id
        });
    }, []);

    useEffect(() => {
        if (isLoading) {
            if (props.addTopic?.topic?.title) {
                setLoading(false);
                setIsTopicAdded(true);
                setSuccessMsg(props.addTopic?.message);
                actions.getSpecificCourse(router.query.id);
            } else {
                setErrorMessage(props.addCourse?.message);
                setLoading(false);
            }
        }

    }, [props.addTopic]);

    const addNewTopic = () => {
        setLoading(true);

        if (topicData.title && topicData.description) {
            if (props.mode == 'edit') {
                actions.updateTopic(topicData);
            } else {
                actions.addNewTopic(topicData);
            }
        } else {
            setErrorMessage(APP_STRING.PLEASE_FILL_ALL_THE_DETAILS);
            setLoading(false);
        }
    }

    const handleChangeInput = (e: any) => {
        setTopicData({ ...topicData, [e.target.name]: e.target.value });

        if (errorMsg) {
            setErrorMessage('');
        }
    }

    const closeAddTopicPopup = () => {
        props.onCloseClick();
    }

    const viewAddTopic = () => {
        return (
            <>
                <h4>{props.mode == 'edit' ? APP_STRING.UPDATE_TOPIC : APP_STRING.ADD_NEW_TOPIC}</h4>

                <InputField
                    type="text"
                    name="title"
                    title={APP_STRING.TOPIC_NAME}
                    id="title"
                    value={topicData.title}
                    placeholder={APP_STRING.PLACEHOLDER_TOPIC_NAME}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />

                <InputField
                    type="text"
                    name="description"
                    title={APP_STRING.TOPIC_DESCRIPTION}
                    id="description"
                    value={topicData.description}
                    placeholder={APP_STRING.PLACEHOLDER_TOPIC_DESCRIPTION}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />


                <CusButton
                    name={props.mode == 'edit' ? APP_STRING.UPDATE_TOPIC : APP_STRING.ADD_NEW_TOPIC}
                    type="submit"
                    disabled={isLoading ? true : false}
                    onClick={addNewTopic}
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
            {!isTopicAdded ? viewAddTopic()
                :
                <ProcessCompleteAlert
                    message={successMsg || APP_STRING.ADD_TOPIC_SUCCESS}
                    actionBtnName="Ok"
                    onClick={closeAddTopicPopup}
                />
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    addTopic: state.topicRes.addTopic
});


export default connect(mapStateToProps)(AddTopic);