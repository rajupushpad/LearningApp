
import { useState, useEffect, useCallback, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";

import Layout from "../../../../layout/layout";
import APP_STRING from "../../../../utils/constants";
import ModalComponent from "../../../../components/Modal/ModalComponent";
import AddNewContent from "../../../../components/AddEditNewEntity/AddContent";
import EditIcon from "../../../../asset/EditIcon";
import actions from "../../../../redux/actions";

type contentDataType = {
    title: string;
    description: string;
    _id: string;
    topicId: string,
    url: string,
    textContent?: string,
    pdfUrl?: string
}

const defaultContentData = { title: '', description: '', url: '', topicId: '', _id: '' };

function CouseContent(props: any) {

    const router = useRouter();

    const [height, setHeight] = useState<number>(0);
    const [showModalForAddVideoContent, setShowModalForAddVideoContent] = useState<boolean>(false);
    const [editedContentData, setEditedContentData] = useState<contentDataType>(defaultContentData);

    const getSpecificContent = useCallback(() => {
        actions.getSpecificContent(router.query.id);
    }, [router.query.id]);

    useLayoutEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        if (router.isReady) {
            getSpecificContent()
        }
    }, [router.isReady]);

    const handleToShowModalForAddVideoContent = (data?: any) => {
        setShowModalForAddVideoContent(!showModalForAddVideoContent);
        setEditedContentData(data);
    }

    return (
        <Layout>
            <div className="p-4 w-100" style={{ minHeight: height }}>
                <div className="w-100">
                    <div className="d-flex flex-column">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h4>{APP_STRING.CONTENT_TITLE} : {props.courseRes.content?.title}</h4>
                                <h5>{APP_STRING.CONTENT_DESCRIPTION} : {props.courseRes.content?.description}</h5>
                            </div>

                            <div
                                className="cursor-pointer"
                                onClick={() => handleToShowModalForAddVideoContent(props.courseRes.content)}
                            >
                                <EditIcon />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex w-100 justify-content-center">
                        <iframe width="600" height="420" src={props.courseRes.content?.url}></iframe>
                    </div>
                    {props.courseRes.content?.textcontent && <div>{APP_STRING.TEXT_MATERIALS + ':' + props.courseRes.content?.textcontent}</div>}
                    {props.courseRes.content?.pdfUrl && <div>
                        {APP_STRING.PDF_MATERIALS + ':' + props.courseRes.content?.pdfUrl}
                    </div>}
                </div>
            </div>

            {
                showModalForAddVideoContent && createPortal(
                    <ModalComponent
                        mode={'edit'}
                        onCloseClick={handleToShowModalForAddVideoContent}
                        editedContentData={editedContentData}
                    >
                        <AddNewContent />
                    </ModalComponent>, document.body
                )
            }
        </Layout>
    )
}

const mapStateToProps = (state: any) => ({
    courseRes: state.contentRes.content || {}
});

export default connect(mapStateToProps)(CouseContent);