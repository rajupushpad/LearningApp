
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { createPortal } from "react-dom";

import Layout from "../../../layout/layout";
import CusButton from "../../../components/CusButton";
import VideoTile from "../../../components/Tiles/VideoTile";
import APP_STRING from "../../../utils/constants";
import ModalComponent from "../../../components/Modal/ModalComponent";
import AddTopic from "../../../components/AddEditNewEntity/AddTopic";
import AddNewContent from "../../../components/AddEditNewEntity/AddContent";
import EditIcon from "../../../asset/EditIcon";
import actions from "../../../redux/actions";
import EmptyContainer from "../../../components/EmptyContainer";
import ErrorLoaderContainer from "../../../components/ErrorLoaderContainer";

function CoursePage(props: any) {

    const router = useRouter();

    const [height, setHeight] = useState(0);
    const [showModalForAddTopic, setShowModalForAddTop] = useState(false);
    const [showModalForAddVideoContent, setShowModalForAddVideoContent] = useState(false);
    const [topicActionMode, setTopicActionMode] = useState('add');
    const [editedTopicData, setEditedTopicData] = useState({});
    const [topicsOfContent, setTopicOfContent] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setHeight(window.innerHeight);
        actions.getSpecificCourse(router.query.id);
        setIsLoading(true);
    }, []);

    useEffect(() => {
        if (isLoading) {
            if (props.courseRes.course?.title) {
                setIsLoading(false);
            } else if (props.courseRes?.message) {
                setIsLoading(false);
            }
        }
    }, [props.courseRes]);

    const viewContent = (event: any, video: any) => {
        if (props.userAuth.user?.token) {
            router.push('content/' + video._id);
        } else {
            actions.setUserLoginRequired(true);
        }

        event.stopPropagation();
    }

    const handleToShowModalForAddTopic = (type: string, e: any, data?: any) => {

        setTopicActionMode(type);
        if (type == 'edit') {
            setEditedTopicData(data);
            e.stopPropagation();
        } else {
            setEditedTopicData({});
        }
        setShowModalForAddTop(!showModalForAddTopic);
    }

    const handleToShowModalForAddVideoContent = (data?: any) => {
        setShowModalForAddVideoContent(!showModalForAddVideoContent);
        setTopicOfContent(data);
    }

    return (
        <Layout>
            <div className="p-4 w-100" style={{ minHeight: height }}>
                {!isLoading && <div className="w-100">
                    <div className="d-flex justify-content-between">
                        <div>
                            <h4>{APP_STRING.COURSE_NAME} : {props.courseRes.course?.title}</h4>
                            <h5>{APP_STRING.COURSE_DESCRIPTION} : {props.courseRes.course?.description}</h5>
                        </div>

                        {props.userAuth.user?.token && <div className="d-flex justify-content-between">
                            <CusButton
                                name={APP_STRING.ADD_NEW_TOPIC}
                                onClick={(e: any) => handleToShowModalForAddTopic('add', e)}
                            />
                        </div>}
                    </div>
                    <h5>{APP_STRING.VIDEOS}: </h5>
                    {
                        props.courseRes.topics && props.courseRes.topics.map((item: any, index: any) => {
                            return (
                                <div key={index} className="p-3 m-3 d-flex flex-column" style={{ border: '1px solid black' }}>

                                    <div className="m-3">
                                        <div className="d-flex justify-content-between">
                                            <h2>
                                                {item.title}
                                            </h2>

                                            {props.userAuth.user?.token && <div className="d-flex justify-content-between align-items-center">
                                                <div
                                                    onClick={(e: any) => handleToShowModalForAddTopic('edit', e, item)}
                                                    style={{ marginRight: 20 }}
                                                    className="cursor-pointer"
                                                >
                                                    <EditIcon />
                                                </div>

                                                <CusButton
                                                    name={APP_STRING.ADD_NEW_VIDEO}
                                                    onClick={(e: any) => handleToShowModalForAddVideoContent(item)}
                                                />
                                            </div>}
                                        </div>

                                        <div>
                                            {item.description}
                                        </div>
                                    </div>
                                    {item?.contents && <InfiniteScroll
                                        className="w-100 d-flex flex-row"
                                        dataLength={item.contents.length ? item.contents.length : 0}
                                        next={() => { }}
                                        hasMore={false}
                                        loader={''}
                                    >
                                        {item.contents.map((video: any, videoKey: string) => {
                                            return (
                                                <VideoTile
                                                    video={video}
                                                    key={video.id}
                                                    onClick={(e: any) => viewContent(e, video)}
                                                />
                                            )
                                        })}
                                    </InfiniteScroll>}
                                </div>
                            )
                        })
                    }

                    {!isLoading && (!props.courseRes?.topics || props.courseRes.topics.length == 0) && <div style={{ marginTop: 50 }}><EmptyContainer message={APP_STRING.NO_CONTENT} /></div>}

                </div>}
                {isLoading &&
                    <div className="d-flex align-items-center justify-content-center" style={{ height: 500 }}>
                        <ErrorLoaderContainer isLoading={isLoading} /><br />
                    </div>}
                {
                    showModalForAddTopic && createPortal(
                        <ModalComponent
                            mode={topicActionMode}
                            onCloseClick={handleToShowModalForAddTopic}
                            editedTopicData={editedTopicData}
                        >
                            <AddTopic />
                        </ModalComponent>, document.body
                    )
                }

                {
                    showModalForAddVideoContent && createPortal(
                        <ModalComponent
                            mode={'add'}
                            onCloseClick={handleToShowModalForAddVideoContent}
                            editedContentData={topicsOfContent}
                        >
                            <AddNewContent />
                        </ModalComponent>, document.body
                    )
                }
            </div>
        </Layout>
    )
}

const mapStateToProps = (state: any) => ({
    courseRes: state.courseRes.course || {},
    userAuth: state.userRes.userAuth
});

export default connect(mapStateToProps)(CoursePage);