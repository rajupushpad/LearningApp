function CusTxtBtn(props:any) {
    return(
        <div style={{ cursor: 'pointer', color: 'blue' }} className={props.className} onClick={props.onClick}>
            {props.text}
        </div>
    )
}

export default CusTxtBtn;