
import { useState, useEffect, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";

import APP_STRING from "../../utils/constants";
import actions from '../../redux/actions';
import SuspenseLoader from "../../components/Loaders/SuspenseLoader";
import ErrorBoundary from "../../components/ErrorLoaderContainer/ErrorBoundary";

const CategoryTile = lazy(() => import('../../components/Tiles/CategoryTile'));
const CusButton = lazy(() => import('../../components/CusButton'));
const AddCategory = lazy(() => import('../../components/AddEditNewEntity/AddCategory'));
const ModalComponent = lazy(() => import('../../components/Modal/ModalComponent'));
const EmptyContainer = lazy(() => import('../../components/EmptyContainer'));

type categoryDataType = {
    title: string;
    description: string;
    _id: string;
}

let defaultCatData = { title: '', description: '', _id: '' };

function DashboardPage(props: any) {

    const router = useRouter();

    const [height, setHeight] = useState<number>(0);
    const [showAddCategory, setShowAddCategoty] = useState<boolean>(false);
    const [categoryActionMode, setCategoryActionMode] = useState<string>('add');
    const [editedCatData, setEditedCatData] = useState<categoryDataType>(defaultCatData)

    useEffect(() => {
        setHeight(window.innerHeight);
        actions.getCategories();
    }, []);

    const manageToShowAddEditCategory = (type: string, e: any, data?: any) => {
        setCategoryActionMode(type);
        if (type == 'edit') {
            setEditedCatData(data);
            e.stopPropagation();
        } else {
            setEditedCatData(defaultCatData);
        }
        setShowAddCategoty(!showAddCategory);
    }

    const handleCategoryClick = (id: string) => {
        router.push('/dashboard/category/' + id);
    }

    return (
        <div className="p-4" style={{ minHeight: height }}>

            {props.userAuth.user?.token && <div className="d-flex justify-content-end">
                <ErrorBoundary>
                    <Suspense fallback={<SuspenseLoader />}>
                        <CusButton
                            name={APP_STRING.ADD_NEW_CATEGORY}
                            onClick={(e: any) => manageToShowAddEditCategory('add', e)}
                        />
                    </Suspense>
                </ErrorBoundary>
            </div>}

            {props.categoryRes.categories?.length > 0 && <div className="box">
                {
                    props.categoryRes.categories?.map((category: categoryDataType, index: number) => {
                        return <ErrorBoundary key={category._id}>
                            <Suspense fallback={<SuspenseLoader />}>
                                <CategoryTile
                                    category={category}

                                    onClick={() => handleCategoryClick(category._id)}
                                    showEdit={true}
                                    handleEditClick={manageToShowAddEditCategory}
                                />
                            </Suspense>
                        </ErrorBoundary>
                    })
                }
            </div>}

            {props.categoryRes.categories?.length == 0 &&
                <div style={{ marginTop: 50 }}>
                    <ErrorBoundary>
                        <Suspense fallback={<SuspenseLoader />}>
                            <EmptyContainer message={APP_STRING.NO_CATEGORIES} />
                        </Suspense>
                    </ErrorBoundary>
                </div>}

            {showAddCategory && createPortal(
                <ErrorBoundary>
                    <Suspense fallback={<SuspenseLoader />}>
                        <ModalComponent
                            mode={categoryActionMode}
                            onCloseClick={manageToShowAddEditCategory}
                            editedCatData={editedCatData}
                        >
                            <AddCategory />
                        </ModalComponent>
                    </Suspense>
                </ErrorBoundary>, document.body)}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    categoryRes: state.categoryRes?.categories || {},
    userAuth: state.userRes.userAuth
});

export default connect(mapStateToProps)(DashboardPage);