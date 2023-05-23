import Styles from "./component..module.scss";

function CusButton(props: any) {
    return(
        <div style={props.style}>
            <button 
                className={`w-100 p-1 ${Styles.cusButtonStyle} `}
                onClick={props.onClick}
                type={props.type}
                disabled={props.disabled}
            >
                {props.name}
            </button>
        </div>
    )
}

export default CusButton;