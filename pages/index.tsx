
import { useState, useEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from "react-redux";
import { useRouter } from "next/router";

import Layout from "../layout/layout";
import actions from "../redux/actions";
import CategoryTile from "../components/Tiles/CategoryTile";
import APP_STRING from "../utils/constants";
import CourseTile from "../components/Tiles/CourseTile";

function LandingPage(props: any) {

    const [height, setHeight] = useState(0);
    const router = useRouter();

    useEffect(() => {
        setHeight(window.innerHeight);
        actions.getCategories();
        actions.getCourses();
    }, [])

    const handleCategoryClick = (id: number) => {
        router.push('/dashboard/category/' + id);
    }

    const viewCourseDetails = (item: any) => {
        router.push({ pathname: '/dashboard/courses/' + item._id });
    }

    return (
        <Layout>
            <div className="d-flex align-items-center flex-row pt-3 overflow-hidden flex-column" style={{ minHeight: height }}>

                <div className="p-3 w-100 custom-scroll">
                    <div><h4>{APP_STRING.CATEGORIES}</h4></div>
                    <InfiniteScroll
                        className="w-100 d-flex flex-row"
                        dataLength={props.categoryRes && props.categoryRes?.categories?.length ? props.categoryRes.categories : 0}
                        next={() => { }}
                        hasMore={false}
                        loader={''}
                    >
                        {
                            props.categoryRes.categories?.map((category: any, index: any) => {
                                return <div style={{ marginLeft: 10 }} key={index}>
                                    <CategoryTile
                                        category={category}
                                        key={category.id}
                                        onClick={() => handleCategoryClick(category._id)}
                                        showEdit={false}
                                    /></div>
                            })
                        }
                    </InfiniteScroll>

                </div>

                <div className="p-3 w-100 custom-scroll">
                    <div><h4>{APP_STRING.COURSES}</h4></div>

                    <InfiniteScroll
                        className="w-100 d-flex flex-row"
                        dataLength={props.courseRes && props.courseRes?.courses?.length ? props.courseRes?.courses?.length : 0}
                        next={() => { }}
                        hasMore={false}
                        loader={''}
                    >
                        {
                            props.courseRes?.courses?.map((item: any, index: number) => {
                                return <div style={{ marginLeft: 10 }} key={index}><CourseTile
                                    course={item}
                                    onClick={viewCourseDetails}
                                    showEdit={false}
                                /></div>
                            })
                        }
                    </InfiniteScroll>

                </div>
            </div>
        </Layout>
    )
}

const mapStateToProps = (state: any) => ({
    categoryRes: state.categoryRes?.categories || {},
    courseRes: state.courseRes?.courses || {}
});

export default connect(mapStateToProps)(LandingPage);
