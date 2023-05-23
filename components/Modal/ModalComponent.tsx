import React from "react";

import modalStyle from "./modalComponent.module.scss";

function ModalComponent(props: any) {

    return (
        <div className={`${modalStyle.modal}`}>
            <div className={`${modalStyle.modalContent}`}>
                <div className="d-flex justify-content-end">
                    <div onClick={props.onCloseClick} className={`${modalStyle.close}`}>&times;</div>
                </div>
                {React.cloneElement(props.children, { ...props })}
            </div>
        </div>
    )
}

export default ModalComponent;