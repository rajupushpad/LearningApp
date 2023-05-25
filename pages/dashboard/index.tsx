
import { useState, useEffect, useLayoutEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { createPortal } from "react-dom";

import Layout from "../../layout/layout";
import CategoryTile from "../../components/Tiles/CategoryTile";
import CusButton from "../../components/CusButton";
import APP_STRING from "../../utils/constants";
import AddCategory from "../../components/AddEditNewEntity/AddCategory";
import ModalComponent from "../../components/Modal/ModalComponent";
import EmptyContainer from "../../components/EmptyContainer";
import actions from '../../redux/actions';

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

    useLayoutEffect(() => {
        setHeight(window.innerHeight);
    }, []);

    useEffect(() => {
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
        <Layout>
            <div className="p-4" style={{ minHeight: height }}>

                {props.userAuth.user?.token && <div className="d-flex justify-content-end">
                    <CusButton
                        name={APP_STRING.ADD_NEW_CATEGORY}
                        onClick={(e: any) => manageToShowAddEditCategory('add', e)}
                    />
                </div>}

                {props.categoryRes.categories?.length > 0 && <div className="box">
                    {
                        props.categoryRes.categories?.map((category: categoryDataType, index: number) => {
                            return <CategoryTile
                                category={category}
                                key={category._id}
                                onClick={() => handleCategoryClick(category._id)}
                                showEdit={true}
                                handleEditClick={manageToShowAddEditCategory}
                            />
                        })
                    }
                </div>}

                {props.categoryRes.categories?.length == 0 &&
                    <div style={{ marginTop: 50 }}>
                        <EmptyContainer message={APP_STRING.NO_CATEGORIES} />
                    </div>}

                {showAddCategory && createPortal(
                    <ModalComponent
                        mode={categoryActionMode}
                        onCloseClick={manageToShowAddEditCategory}
                        editedCatData={editedCatData}
                    >
                        <AddCategory />
                    </ModalComponent>, document.body)}

            </div>
        </Layout>
    )
}

const mapStateToProps = (state: any) => ({
    categoryRes: state.categoryRes?.categories || {},
    userAuth: state.userRes.userAuth
});

export default connect(mapStateToProps)(DashboardPage);