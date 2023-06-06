
import {
    useState,
    useEffect,
    lazy,
    Suspense,
    useTransition
} from "react";

import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from "next/router";
import type { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

import APP_STRING, { APP_BACKEND_URL } from "../utils/constants";
import SuspenseLoader from "../components/Loaders/SuspenseLoader";
import ErrorBoundary from "../components/ErrorLoaderContainer/ErrorBoundary";

const CategoryTile = lazy(() => import('../components/Tiles/CategoryTile'));
const CourseTile = lazy(() => import('../components/Tiles/CourseTile'))

import { courseDataType, categoryDataType, categoryResType, courseResType, defaultCategoryRes } from "../utils/dataTypes";

const defaultCourseRes = {
    message: '',
    courses: []
}

function LandingPage(props: any) {

    const router = useRouter();
    const [height, setHeight] = useState<number>(0);
    const [isPending, startTransition] = useTransition();
    const [categoryRes, setCategories] = useState<categoryResType>(defaultCategoryRes);
    const [courseRes, setCourses] = useState<courseResType>(defaultCourseRes);

    useEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
        if (props.categoryRes && props.courseRes) {
            startTransition(() => {
                setCategories(props.categoryRes);
                setCourses(props.courseRes);
            });
        }
    }, [props.categoryRes, props.courseRes]);

    const handleCategoryClick = (id: string) => {
        router.push('/dashboard/category/' + id);
    }

    const viewCourseDetails = (id: string) => {
        router.push({ pathname: '/dashboard/courses/' + id });
    }

    const handleClick = (val:any) => {
        alert(val)
    }

    return (
        <div
            className="d-flex align-items-center flex-row pt-3 overflow-hidden flex-column"
            style={{ minHeight: height }}
        >
            <div className="p-3 w-100 custom-scroll">
                <div><h4>{APP_STRING.CATEGORIES}</h4></div>
                <InfiniteScroll
                    className="w-100 d-flex flex-row"
                    dataLength={categoryRes.categories?.length ? categoryRes.categories.length : 0}
                    next={() => { }}
                    hasMore={false}
                    loader={''}
                >
                    {
                        categoryRes.categories?.map((category: categoryDataType, index: any) => {
                            return <ErrorBoundary key={category._id}>
                                <Suspense fallback={<SuspenseLoader />} >
                                    <CategoryTile
                                        category={category}
                                        onClick={() => handleCategoryClick(category._id)}
                                        showEdit={false}
                                    />
                                </Suspense>
                            </ErrorBoundary>

                        })
                    }
                </InfiniteScroll>
            </div>

            <div className="p-3 w-100 custom-scroll">
                <div><h4>{APP_STRING.COURSES}</h4></div>
                <InfiniteScroll
                    className="w-100 d-flex flex-row"
                    dataLength={courseRes.courses?.length ? courseRes.courses?.length : 0}
                    next={() => { }}
                    hasMore={false}
                    loader={''}
                >
                    {
                        courseRes.courses?.map((item: courseDataType, index: number) => {
                            return <ErrorBoundary key={item._id}>
                                <Suspense fallback={<SuspenseLoader />}>
                                    <CourseTile
                                        course={item}
                                        onClick={() => viewCourseDetails(item._id)}
                                        showEdit={false}
                                    />
                                </Suspense>
                            </ErrorBoundary>
                        })
                    }
                </InfiniteScroll>
            </div>
        </div>
    )
}

export default LandingPage;

export const getStaticProps: GetStaticProps<{ categoryRes: any; courseRes: any }> = async () => {
    const categories = await fetch(APP_BACKEND_URL + '/api/category/all');
    const courses = await fetch(APP_BACKEND_URL + '/api/course/all');

    const categoryRes = await categories.json();
    const courseRes = await courses.json();

    return { props: { categoryRes, courseRes } };
};
