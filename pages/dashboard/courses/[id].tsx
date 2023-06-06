
import { useState, useEffect, useCallback, lazy, Suspense } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { createPortal } from "react-dom";

import APP_STRING from "../../../utils/constants";
import EditIcon from "../../../asset/EditIcon";
import actions from "../../../redux/actions";
import SuspenseLoader from "../../../components/Loaders/SuspenseLoader";
import ErrorBoundary from "../../../components/ErrorLoaderContainer/ErrorBoundary";

const AddTopic = lazy(() => import('../../../components/AddEditNewEntity/AddTopic'));
const ModalComponent = lazy(() => import('../../../components/Modal/ModalComponent'));
const CusButton = lazy(() => import('../../../components/CusButton'));
const VideoTile = lazy(() => import('../../../components/Tiles/VideoTile'));
const EmptyContainer = lazy(() => import('../../../components/EmptyContainer'));
const AddNewContent = lazy(() => import('../../../components/AddEditNewEntity/AddContent'));
const ErrorLoaderContainer = lazy(() => import('../../../components/ErrorLoaderContainer'));

type contentDataType = {
    title: string;
    description: string;
    _id: string;
    topicId: string,
    url: string,
    textContent?: string,
    pdfUrl?: string
}

type topicDataType = {
    title: string;
    description: string;
    _id: string;
    courseId: string
}

const defaultContentData = { title: '', description: '', url: '', topicId: '', _id: '' };
const defaultTopicData = { title: '', description: '', _id: '', courseId: '' };

function CoursePage(props: any) {

    const router = useRouter();

    const [height, setHeight] = useState<number>(0);
    const [showModalForAddTopic, setShowModalForAddTop] = useState<boolean>(false);
    const [showModalForAddVideoContent, setShowModalForAddVideoContent] = useState<boolean>(false);
    const [topicActionMode, setTopicActionMode] = useState<string>('add');
    const [editedTopicData, setEditedTopicData] = useState<topicDataType>(defaultTopicData);
    const [topicsOfContent, setTopicOfContent] = useState<contentDataType>(defaultContentData);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getSpecificCourse = useCallback(() => {
        actions.getSpecificCourse(router.query.id);
    }, [router.query.id]);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        if (router.isReady) {
            getSpecificCourse()
            setIsLoading(true);
        }
    }, [router.isReady]);

    useEffect(() => {
        if (isLoading) {
            if (props.courseRes.course?.title || props.courseRes?.message) {
                setIsLoading(false);
            }

            if (props.contentRes.content?.title) {
                actions.getSpecificCourse(router.query.id);
            }
        }
    }, [props.courseRes, props.contentRes]);

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
            setEditedTopicData(defaultTopicData);
        }
        setShowModalForAddTop(!showModalForAddTopic);
    }

    const handleToShowModalForAddVideoContent = (data?: any) => {
        setShowModalForAddVideoContent(!showModalForAddVideoContent);
        setTopicOfContent(data);
    }

    return (
        <div className="p-4 w-100" style={{ minHeight: height }}>
            {!isLoading && <div className="w-100">
                <div className="d-flex justify-content-between">
                    <div>
                        <h4>{APP_STRING.COURSE_NAME} : {props.courseRes.course?.title}</h4>
                        <h5>{APP_STRING.COURSE_DESCRIPTION} : {props.courseRes.course?.description}</h5>
                    </div>

                    {props.userAuth.user?.token && <div className="d-flex justify-content-between">
                        <ErrorBoundary>
                            <Suspense fallback={<SuspenseLoader />}>
                                <CusButton
                                    name={APP_STRING.ADD_NEW_TOPIC}
                                    onClick={(e: any) => handleToShowModalForAddTopic('add', e)}
                                />
                            </Suspense>
                        </ErrorBoundary>

                    </div>}
                </div>
                <h5>{APP_STRING.VIDEOS}: </h5>
                {
                    props.courseRes.topics ? props.courseRes.topics.map((item: any, index: any) => {
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

                                            <ErrorBoundary>
                                                <Suspense fallback={<SuspenseLoader />}>
                                                    <CusButton
                                                        name={APP_STRING.ADD_NEW_VIDEO}
                                                        onClick={(e: any) => handleToShowModalForAddVideoContent(item)}
                                                    />
                                                </Suspense>
                                            </ErrorBoundary>
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
                                    {item.contents.map((content: contentDataType, index: number) => {
                                        return (
                                            <ErrorBoundary key={content._id}>
                                                <Suspense fallback={<SuspenseLoader />}>
                                                    <VideoTile
                                                        video={content}
                                                        onClick={(e: any) => viewContent(e, content)}
                                                    />
                                                </Suspense>
                                            </ErrorBoundary>


                                        )
                                    })}
                                </InfiniteScroll>}
                            </div>
                        )
                    }) : <></>
                }

                {!isLoading &&
                    (!props.courseRes?.topics || props.courseRes.topics.length == 0) &&
                    <div style={{ marginTop: 50 }}>
                        <ErrorBoundary>
                            <Suspense fallback={<SuspenseLoader />}>
                                <EmptyContainer message={APP_STRING.NO_CONTENT} />
                            </Suspense>
                        </ErrorBoundary>
                    </div>}

            </div>}
            {isLoading &&
                <div className="d-flex align-items-center justify-content-center" style={{ height: 500 }}>
                    <ErrorBoundary>
                        <Suspense fallback={<SuspenseLoader />}>
                            <ErrorLoaderContainer isLoading={isLoading} /><br />
                        </Suspense>
                    </ErrorBoundary>
                </div>}
            {
                showModalForAddTopic && createPortal(
                    <ErrorBoundary>
                        <Suspense>
                            <ModalComponent
                                mode={topicActionMode}
                                onCloseClick={handleToShowModalForAddTopic}
                                editedTopicData={editedTopicData}
                            >
                                <AddTopic />
                            </ModalComponent>
                        </Suspense>
                    </ErrorBoundary>, document.body
                )
            }

            {
                showModalForAddVideoContent && createPortal(
                    <ErrorBoundary>
                        <Suspense>
                            <ModalComponent
                                mode={'add'}
                                onCloseClick={handleToShowModalForAddVideoContent}
                                editedContentData={topicsOfContent}
                            >
                                <AddNewContent />
                            </ModalComponent>
                        </Suspense>
                    </ErrorBoundary>, document.body
                )
            }
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    courseRes: state.courseRes.course || {},
    userAuth: state.userRes.userAuth,
    contentRes: state.contentRes.content
});

export default connect(mapStateToProps)(CoursePage);