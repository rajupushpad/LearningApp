import { useEffect, useState } from "react";
import { connect } from "react-redux";

import APP_STRING from "../../utils/constants";
import CusButton from "../CusButton";
import InputField from "../InputField";
import ErrorLoaderContainer from "../ErrorLoaderContainer";
import actions from "../../redux/actions";
import ProcessCompleteAlert from "../ProcessCompleteAlert";

type categoryDataType = {
    title: string;
    description: string;
    _id?: number;
}

function AddCategory(props: any) {

    const [categoryData, setCategoryData] = useState<categoryDataType>({ title: '', description: '' });
    const [isLoading, setLoading] = useState<boolean>(false);
    const [isCategoryAdded, setIsCategoryAdded] = useState<boolean>(false);
    const [errorMsg, setErrorMessage] = useState<string>('');
    const [successMsg, setSuccessMsg] = useState<string>('');

    useEffect(() => {
        setCategoryData({
            ...categoryData,
            title: props.editedCatData?.title,
            description: props.editedCatData?.description,
            _id: props.editedCatData?._id
        });
    }, []);

    useEffect(() => {
        if (props.addCategory?.category?.title && isLoading) {
            setLoading(false);
            setIsCategoryAdded(true);
            setSuccessMsg(props.addCategory?.message);
            actions.getCategories();
        }
    }, [props.addCategory]);

    const addNewCategory = () => {
        setLoading(true);

        if (categoryData.title && categoryData.description) {
            if (props.mode == 'edit') {
                actions.updateCategory(categoryData);
            } else {
                actions.addNewCategory(categoryData);
            }
        } else {
            setErrorMessage(APP_STRING.PLEASE_FILL_ALL_THE_DETAILS);
            setLoading(false);
        }
    }

    const handleChangeInput = (e: any) => {
        setCategoryData({ ...categoryData, [e.target.name]: e.target.value });

        if (errorMsg) {
            setErrorMessage('');
        }
    }

    const closeAddCategoryPopup = () => {
        props.onCloseClick();
    }

    const viewAddCategory = () => {
        return (
            <>
                <h4>{props.mode == 'edit' ? APP_STRING.EDIT_CATEGORY : APP_STRING.ADD_NEW_CATEGORY}</h4>

                <InputField
                    type="text"
                    name="title"
                    title={APP_STRING.CATEGORY_NAME}
                    id="title"
                    value={categoryData.title}
                    placeholder={APP_STRING.PLACEHOLDER_CATEGORY_NAME}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />

                <InputField
                    type="text"
                    name="description"
                    title={APP_STRING.CATEGORY_DESCRIPTION}
                    id="description"
                    value={categoryData.description}
                    placeholder={APP_STRING.PLACEHOLDER_CATEGORY_DESCRIPTION}
                    style={{ marginBottom: 20 }}
                    onChange={handleChangeInput}
                    required={true}
                />


                <CusButton
                    name={props.mode == 'edit' ? APP_STRING.UPDATE_CATEGORY : APP_STRING.ADD_CATEGORY}
                    type="submit"
                    disabled={isLoading ? true : false}
                    onClick={addNewCategory}
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
            {!isCategoryAdded ? viewAddCategory()
                :
                <ProcessCompleteAlert
                    message={successMsg || APP_STRING.ADD_CATEGORY_SUCCESS}
                    actionBtnName="Ok"
                    onClick={closeAddCategoryPopup}
                />
            }
        </>
    )
}

const mapStateToProps = (state: any) => ({
    addCategory: state.categoryRes.addCategory
});


export default connect(mapStateToProps)(AddCategory);