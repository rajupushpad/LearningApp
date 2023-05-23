function EmptyContainer(props:any) {
    return(
        <div 
            className="d-flex justify-content-center flex-row"
            style={{ border: '1px solid gray', padding: 20 }}
        >
            {props.message}
        </div>
    )
}

export default EmptyContainer;