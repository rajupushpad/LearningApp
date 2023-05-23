function VideoTile(props: any) {

    const video = props.video;
    return (
        <div
            onClick={(e:any) => { props.onClick(e, video) }}
            className="d-flex flex-row p-4"
            style={{ border: '1px solid gray', marginRight: 20 }}
        >
            <div>
                <div style={{ marginBottom: 10 }}>
                    <h5>{video.title}</h5>
                    <span>{video.description}</span>
                </div>
                <iframe width="420" height="300" src={video.url}></iframe>
            </div>
        </div>
    )
}

export default VideoTile;