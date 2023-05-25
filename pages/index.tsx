
import { useState, useEffect, useLayoutEffect } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';
import { connect } from "react-redux";
import { useRouter } from "next/router";

import Layout from "../layout/layout";
import actions from "../redux/actions";
import CategoryTile from "../components/Tiles/CategoryTile";
import APP_STRING from "../utils/constants";
import CourseTile from "../components/Tiles/CourseTile";

type courseDataType = {
    title: string;
    description: string;
    price: number;
    _id: string;
    categoryId: string;
}

type categoryDataType = {
    title: string;
    description: string;
    _id: string;
}

function LandingPage(props: any) {

    const router = useRouter();
    const [height, setHeight] = useState<number>(0);

    useLayoutEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        actions.getCategories();
        actions.getCourses();
    }, []);

    const handleCategoryClick = (id: string) => {
        router.push('/dashboard/category/' + id);
    }

    const viewCourseDetails = (id: string) => {
        router.push({ pathname: '/dashboard/courses/' + id });
    }

    return (
        <Layout>
            <div
                className="d-flex align-items-center flex-row pt-3 overflow-hidden flex-column"
                style={{ minHeight: height }}
            >
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
                            props.categoryRes.categories?.map((category: categoryDataType, index: any) => {
                                return <CategoryTile
                                        key={category._id}
                                        category={category}
                                        onClick={() => handleCategoryClick(category._id)}
                                        showEdit={false}
                                    />
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
                            props.courseRes?.courses?.map((item: courseDataType, index: number) => {
                                return <CourseTile
                                key={item._id}
                                    course={item}
                                    onClick={()=>viewCourseDetails(item._id)}
                                    showEdit={false}
                                />
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
