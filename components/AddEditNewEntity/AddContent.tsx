import { useEffect, useState } from "react";
import { connect } from "react-redux";

import APP_STRING from "../../utils/constants";
import CusButton from "../CusButton";
import InputField from "../InputField";
import ErrorLoaderContainer from "../ErrorLoaderContainer";
import actions from "../../redux/actions";
import ProcessCompleteAlert from "../ProcessCompleteAlert";
import { useRouter } from "next/router";

type contentDataType = {
    title: string;
    description: string;
    _id?: string;
    topicId: string,
    url: string,
    textContent?: string,
    pdfUrl?: string
}

function AddContent(props: any) {

    const [contentData, setContentData] = useState<contentDataType>({title: '', description: '', url: '', textContent: '', topicId: ''});
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isContentAdded, setIsContentAdded] = useState<boolean>(false);
    const [errorMsg, setErrorMessage] = useState<string>('');
    const [successMsg, setSuccessMsg] = useState<string>('');

    const router = useRouter();

    useEffect(() => {
        if(props.mode == 'edit') {
            setContentData({
                ...contentData,
                title: props.editedContentData?.title,
                description: props.editedContentData?.description,
                _id: props.editedContentData?._id,
                topicId: props.editedContentData?.topicId
            });
        } else {
            setContentData({
                ...contentData,
                topicId: props.editedContentData?._id
            });
        }
    }, []);

    useEffect(() => {
        if(isLoading) {
            if (props.addContent?.content?.title) {
                setLoading(false);
                setIsContentAdded(true);
                setSuccessMsg(props.addContent?.message);
                actions.getSpecificContent(router.query.id);
            } else {
                setErrorMessage(props.addContent?.message);
                setLoading(false);
            }
        }
    }, [props.addContent]);

    const addNewContent = () => {
        setLoading(true);

        if (contentData.title && contentData.description) {
            if (props.mode == 'edit') {
                actions.updateContent(contentData);
            } else {
                actions.addNewContent(contentData);
            }
        } else {
            setErrorMessage(APP_STRING.PLEASE_FILL_ALL_THE_DETAILS);
            setLoading(false);
        }
    }

    const handleChangeInput = (e: any) => {
        setContentData({ ...contentData, [e.target.name]: e.target.value });

        if (errorMsg) {
            setErrorMessage('');
        }
    }

    const closeaddContentPopup = () => {
        props.onCloseClick();
    }

    const viewAddContent = () => {
        return (
            <>
                <h4>{props.mode == 'edit' ? APP_STRING.UPDATE_CONTENT : APP_STRING.ADD_NEW_CONTENT}</h4>

                <InputField
                    type="text"
                    name="title"
                    title={APP_STRING.CONTENT_NAME}
                    id="title"
                    value={contentData.title}
                    placeholder={APP_STRING.PLACEHOLDER_CONTENT_NAME}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />

                <InputField
                    type="text"
                    name="description"
                    title={APP_STRING.CONTENT_DESCRIPTION}
                    id="description"
                    value={contentData.description}
                    placeholder={APP_STRING.PLACEHOLDER_CONTENT_DESCRIPTION}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />

                <InputField
                    type="url"
                    name="url"
                    title={APP_STRING.CONTENT_URL}
                    id="url"
                    value={contentData.url}
                    placeholder={APP_STRING.PLACEHOLDER_CONTENT_URL}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />

                <InputField
                    type="textarea"
                    name="textContent"
                    title={APP_STRING.CONTENT_DESCRIPTION_DETAILS}
                    id="textContent"
                    value={contentData.textContent}
                    placeholder={APP_STRING.PLACEHOLDER_CONTENT_DESCRIPTION_DETAILS}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                    rows={6}
                    col={6}
                />

                <CusButton
                    name={props.mode == 'edit' ? APP_STRING.UPDATE_CONTENT : APP_STRING.ADD_NEW_CONTENT}
                    type="submit"
                    disabled={isLoading ? true : false}
                    onClick={addNewContent}
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
            {!isContentAdded ? viewAddContent()
                :
                <ProcessCompleteAlert
                    message={successMsg || APP_STRING.ADD_TOPIC_SUCCESS}
                    actionBtnName="Ok"
                    onClick={closeaddContentPopup}
                />
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    addContent: state.contentRes.addContent
});


export default connect(mapStateToProps)(AddContent);