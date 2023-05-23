import DoneIcon from "../../asset/doneIcon";
import CusButton from "../CusButton";

function ProcessCompleteAlert(props:any) {
    return(
        <div className="d-flex justify-content-center w-100 flex-column align-items-center">
            <DoneIcon />
            
            <div>
                { props.message }
            </div>

            <CusButton 
                style={{ marginTop: 20, marginBottom: 20, width: 100 }} 
                name={props.actionBtnName} 
                onClick={props.onClick} 
            />
        </div>
    )
}

export default ProcessCompleteAlert;