import InlineLoader from "../Loaders/InlineLoader"

function ErrorLoaderContainer(props:any) {
    return (
        <>
            {
                props.errorMsg && <div className="d-flex justify-content-center" style={{ marginTop: 20, marginBottom: 20, color: 'red' }}>{props.errorMsg}</div>
            }

            {
                props.isLoading && <div className="d-flex justify-content-center"><InlineLoader style={{ marginTop: 20, marginBottom: 20 }} /></div>
            }
        </>
    )
}

export default ErrorLoaderContainer;