import APP_STRING from "../utils/constants";

function ContentTile(props:any) {
    return (
        <div className="border d-flex justify-content-between p-4 flex-column">
            {props.content.videoUrl && <div className="d-flex">
                <iframe width="420" height="300" src="http://www.youtube.com/embed/N6nik5jX2pA"></iframe>
            </div>}

            <div className="ml-3">
                <div>{props.content?.title}</div>
                <div>{props.content?.description}</div>
            </div>

            <div className="d-flex justify-content-between">
                {props.content?.watchCount && <span>{APP_STRING.WATCH_COUNT}: {props.content?.watchCount}</span>}
                {props.content?.likes && <span>{APP_STRING.LIKES}: {props.content?.likes}</span>}
                {props.content?.dislike && <span>{APP_STRING.DISLIKE}: {props.content?.dislike}</span>}
            </div>
        </div>
    )
}

export default ContentTile;