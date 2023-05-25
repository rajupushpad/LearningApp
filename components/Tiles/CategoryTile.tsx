import APP_STRING from "../../utils/constants";
import EditIcon from "../../asset/EditIcon";

function CategoryTile(props: any) {
    const category = props.category;
    return (
        <div onClick={() => props.onClick(category.id)}
            key={category.id}
            className="d-flex justify-content-center align-items-center p-2 m-2 flex-column text-center overflow-hidden cursor-pointer"
            style={{ border: "1px solid black", height: 200, minWidth: 175 }}
        >
            <div style={{ fontSize: 20, fontWeight: 'bold' }}>{category.title}</div>
            <div style={{ fontSize: 13 }}>{category.description}</div>
            {category.totalCources && <div>{APP_STRING.COURSES}: {category.totalCources}</div>}
            {category.totalCources && <div>{APP_STRING.STUDENT}: {category.totalCources}</div>}
            {props.showEdit && <div onClick={(e: any) => { props.handleEditClick('edit', e, category) }}>
                <EditIcon />
            </div>}
        </div>
    )
}

export default CategoryTile;