function InlineLoader(props: any) {
    return (
        <div className="spinner-border" role="status" style={props.style}>
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}

export default InlineLoader;