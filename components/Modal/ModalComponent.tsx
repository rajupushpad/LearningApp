import modalStyle from "./modalComponent.module.scss";
import React from "react";

function ModalComponent(props: any) {

    return (
        <div className={`${modalStyle.modal}`}>
            <div className={`${modalStyle.modalContent}`}>
                <div className="d-flex justify-content-end">
                    <div onClick={props.onCloseClick} className={`${modalStyle.close}`}>&times;</div>
                </div>
                {React.cloneElement(props.children, { onCloseClick: props.onCloseClick })}
            </div>
        </div>
    )
}

export default ModalComponent;