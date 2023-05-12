
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

import Layout from "../layout/layout";
import ContentTile from "../components/ContentTile";

function LandingPage() {
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, [])

    return (
        <Layout>
            <div className="d-flex align-items-center flex-row pt-3 overflow-hidden flex-column" style={{ minHeight: height }}>

                <div className="p-3 w-100 custom-scroll">
                    <div><h4>{topicsData.title}</h4></div>
                    <div className="w-100 d-flex flex-row">
                        <InfiniteScroll
                            className="w-100 d-flex flex-row"
                            dataLength={topicsData && topicsData.data.length ? topicsData.data.length : 0}
                            next={() => { }}
                            hasMore={false}
                            loader={''}
                        >
                            {
                                topicsData.data.map((item, index) => {
                                    return <div style={{ marginLeft: 10 }} key={index}><ContentTile
                                        content={item}
                                    /></div>
                                })
                            }
                        </InfiniteScroll>


                    </div>
                </div>

                <div className="p-3 w-100 custom-scroll">
                    <div><h4>{postData.title}</h4></div>

                    <InfiniteScroll
                        className="w-100 d-flex flex-row"
                        dataLength={postData && postData.data.length ? postData.data.length : 0}
                        next={() => { }}
                        hasMore={false}
                        loader={''}
                    >
                        {
                            postData.data.map((item, index) => {
                                return <div style={{ marginLeft: 10 }} key={index}><ContentTile
                                    content={item}
                                /></div>
                            })
                        }
                    </InfiniteScroll>


                </div>
            </div>
        </Layout>
    )
}

export default LandingPage;

const postData = {
    title: "History",
    data: [
        {
            title: 'abc',
            description: 'ddddd',
            img: '',
            author: 'aaa',
            likes: 123,
            dislike: 12,
            watchCount: 1,
            videoUrl: 'https://www.youtube.com/watch?v=70Qi4Nk3aJc'
        },
        {
            title: 'abc',
            description: 'ddddd',
            img: '',
            author: 'aaa',
            likes: 123,
            dislike: 12,
            watchCount: 1,
            videoUrl: 'https://www.youtube.com/watch?v=70Qi4Nk3aJc'
        },
        {
            title: 'abc',
            description: 'ddddd',
            img: '',
            author: 'aaa',
            likes: 123,
            dislike: 12,
            watchCount: 1,
            videoUrl: 'https://www.youtube.com/watch?v=70Qi4Nk3aJc'
        }, {
            title: 'abc',
            description: 'ddddd',
            img: '',
            author: 'aaa',
            likes: 123,
            dislike: 12,
            watchCount: 1,
            videoUrl: 'https://www.youtube.com/watch?v=70Qi4Nk3aJc'
        },
        {
            title: 'abc',
            description: 'ddddd',
            img: '',
            author: 'aaa',
            likes: 123,
            dislike: 12,
            watchCount: 1,
            videoUrl: 'https://www.youtube.com/watch?v=70Qi4Nk3aJc'
        },
        {
            title: 'abc',
            description: 'ddddd',
            img: '',
            author: 'aaa',
            likes: 123,
            dislike: 12,
            watchCount: 1,
            videoUrl: 'https://www.youtube.com/watch?v=70Qi4Nk3aJc'
        }
    ]
}

const topicsData = {
    title: "Topics",
    data: [
        {
            title: 'dddd',
            description: 'dscsadsdc'
        },
        {
            title: 'dddd',
            description: 'dscsadsdc'
        },
        {
            title: 'dddd',
            description: 'dscsadsdc'
        },
        {
            title: 'dddd',
            description: 'dscsadsdc'
        },
        {
            title: 'dddd',
            description: 'dscsadsdc'
        }
    ]
}