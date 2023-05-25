import Image from "next/image";

import APP_STRING from "../../utils/constants";
import mypic from '../../asset/python.jpg';
import EditIcon from "../../asset/EditIcon";

function CourseTile(props: any) {
    let course = props.course;

    return (
        <div
            onClick={() => { props.onClick(course) }}
            className="p-2 m-2 d-flex flex-row justify-content-between cursor-pointer"
            style={{ border: '1px solid black', minWidth: 400, minHeight: 200 }}
        >
            <div className="d-flex flex-row">
                <div>
                    <Image
                        src={mypic}
                        alt="alt"
                        width="150px"
                        height="150px"
                    />
                </div>
                <div className="m-3">
                    <div style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {course.title}
                    </div>

                    <div style={{ fontSize: 16 }}>
                        {course.description}
                    </div>

                    <div>
                        {APP_STRING.PRICE}: {course.price == 0 ? APP_STRING.FREE : course.price}
                    </div>
                </div>
            </div>

           {props.showEdit && <div className="cursor-pointer" onClick={(e: any) => { props.handleEditClick('edit', e, course) }}>
                <EditIcon />
            </div>}

        </div>
    )
}

export default CourseTile;